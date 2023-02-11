package com.hobbyt.domain.sale.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.file.service.FileService;
import com.hobbyt.domain.sale.dto.request.ProductDto;
import com.hobbyt.domain.sale.dto.request.UpdateSaleRequest;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.ProductRepository;
import com.hobbyt.global.exception.BusinessLogicException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ProductService {
	private final SaleService saleService;
	private final ProductRepository productRepository;
	private final FileService fileService;
	private final String path;

	public ProductService(SaleService saleService, ProductRepository productRepository,
		FileService fileService, @Value("${hostname}") String hostname) {
		this.saleService = saleService;
		this.productRepository = productRepository;
		this.fileService = fileService;
		this.path = hostname + "api/images/";
	}

	public void addProducts(Long saleId, List<ProductDto> productDtos) {
		Sale sale = saleService.findSaleById(saleId);
		List<Product> products = new ArrayList<>();
		for (ProductDto productDto : productDtos) {
			// String imageUrl = path + fileService.saveImage(productDto.getImage());
			String imageUrl = productDto.getImage().getOriginalFilename();

			Product product = Product.of(productDto.getName(), productDto.getPrice(),
				productDto.getStockQuantity(), imageUrl);
			sale.addProduct(product);
			// product.setSale(sale);
			products.add(product);
		}

		productRepository.saveAll(products);
	}

	public void updateProducts(Long saleId, List<UpdateSaleRequest.ProductDto> productDtos) {
		Map<Long, Boolean> foundProductsIdAndCheckOrder = productRepository.getProductsIdBySaleId(saleId);
		Sale sale = saleService.findSaleById(saleId);

		for (UpdateSaleRequest.ProductDto productDto : productDtos) {
			Long id = productDto.getId();
			if (id == null) {    // 추가 등록된 상품
				// 이미지 저장
				// String imageUrl = path + fileService.saveImage(productDto.getImage());
				String imageUrl = productDto.getImage().getOriginalFilename();

				Product product = Product.of(productDto.getName(), productDto.getPrice(),
					productDto.getStockQuantity(), imageUrl);
				sale.addProduct(product);
				productRepository.save(product);
				continue;
			}
			if (foundProductsIdAndCheckOrder.containsKey(id)) {    // 기존 등록된 상품 변경
				Product found = findProductById(id);
				// TODO 현재는 이미지 저장이지만 추후 이미지 수정으로 변경
				// String imageUrl = path + fileService.saveImage(productDto.getImage());
				String imageUrl = productDto.getImage().getOriginalFilename();

				Product product = Product.of(productDto.getName(), productDto.getPrice(),
					productDto.getStockQuantity(), imageUrl);

				found.update(product);
				foundProductsIdAndCheckOrder.remove(id);
			}
		}

		for (Long id : foundProductsIdAndCheckOrder.keySet()) {
			if (foundProductsIdAndCheckOrder.get(id)) {    // 주문된적 있는 상품
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
