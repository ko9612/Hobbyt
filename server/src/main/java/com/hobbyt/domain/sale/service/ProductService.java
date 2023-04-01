package com.hobbyt.domain.sale.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.ProductRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
	private final SaleService saleService;
	private final ProductRepository productRepository;

	public void addProducts(Long saleId, List<Product> products) {
		Sale sale = saleService.findSaleById(saleId);

		products.forEach(product -> sale.addProduct(product));

		productRepository.saveAll(products);
	}

	public void updateProducts(Long saleId, List<Product> products) {
		Map<Long, Boolean> foundProductsIdAndCheckOrder = productRepository.getProductsIdBySaleId(saleId);
		Sale sale = saleService.findSaleById(saleId);

		for (Product product : products) {
			Long id = product.getId();
			if (id == null) {    // 추가 등록된 상품
				sale.addProduct(product);
				productRepository.save(product);
				continue;
			}
			if (foundProductsIdAndCheckOrder.containsKey(id)) {    // 기존 등록된 상품 변경
				Product found = findProductById(id);
				found.update(product);
				foundProductsIdAndCheckOrder.remove(id);
			}
		}

		List<Long> removed = new ArrayList<>();
		for (Long id : foundProductsIdAndCheckOrder.keySet()) {
			if (foundProductsIdAndCheckOrder.get(id)) {    // 주문된적 있는 상품
				Product found = findProductById(id);
				found.delete();
				removed.add(id);
			}
		}
		removed.forEach(productId -> foundProductsIdAndCheckOrder.remove(productId));
		productRepository.deleteAllByIdInBatch(foundProductsIdAndCheckOrder.keySet());
	}

	public Product findProductById(Long id) {
		return productRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));
	}

	public void delete(Sale deletedSale) {
		Map<Long, Boolean> foundProductsIdAndCheckOrder = productRepository.getProductsIdBySaleId(deletedSale.getId());

		for (Long id : foundProductsIdAndCheckOrder.keySet()) {
			// 해당 상품이 주문된적 있는 경우
			if (foundProductsIdAndCheckOrder.get(id)) {
				Product product = findProductById(id);
				product.delete();
				foundProductsIdAndCheckOrder.remove(id);
			}
		}

		productRepository.deleteAllByIdInBatch(foundProductsIdAndCheckOrder.keySet());
	}
}
