package com.hobbyt.domain.sale.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.ProductRepository;
import com.hobbyt.global.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
	private final SaleService saleService;
	private final ProductRepository productRepository;

	public void addProducts(Sale sale, List<Product> products) {
		for (Product product : products) {
			sale.addProduct(product);
			product.updateImageUrl("이미지 링크");
		}
		productRepository.saveAll(products);
	}

	public void updateProducts(Long saleId, List<Product> products) {
		Map<Long, Boolean> foundProductsIdAndCheckOrder = productRepository.getProductsIdBySaleId(saleId);
		Sale sale = saleService.findSaleById(saleId);

		for (Product product : products) {
			Long id = product.getId();
			if (id == null) {
				product.updateImageUrl("이미지 링크");
				sale.addProduct(product);
				productRepository.save(product);
				continue;
			}
			if (foundProductsIdAndCheckOrder.containsKey(id)) {
				Product found = findProductById(id);
				found.update(product);
				product.updateImageUrl("이미지 링크");
				foundProductsIdAndCheckOrder.remove(id);
			}
		}

		for (Long id : foundProductsIdAndCheckOrder.keySet()) {
			if (foundProductsIdAndCheckOrder.get(id)) {    // 주문된 상품
				Product found = findProductById(id);
				found.delete();
				foundProductsIdAndCheckOrder.remove(id);
			}
		}

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
