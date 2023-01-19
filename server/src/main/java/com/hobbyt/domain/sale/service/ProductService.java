package com.hobbyt.domain.sale.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
	private final ProductRepository productRepository;

	public void addProducts(Sale sale, List<Product> products) {
		// List<Product> products = saleRequest.toProducts(sale);
		for (Product product : products) {
			sale.addProduct(product);
			product.updateImageUrl("이미지 링크");
		}
		productRepository.saveAll(products);
	}
}
