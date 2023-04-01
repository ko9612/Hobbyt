package com.hobbyt.domain.sale.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.tag.entity.Tag;
import com.hobbyt.domain.tag.service.TagService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WriteSaleService {
	private final SaleService saleService;
	private final ProductService productService;
	private final TagService tagService;
	private final SaleTagService saleTagService;

	public Long post(String email, Sale sale, List<Product> products, List<String> tagContents) {
		Long saleId = saleService.post(email, sale);
		productService.addProducts(saleId, products);
		List<Tag> tags = tagService.addTags(tagContents);
		saleTagService.addTagsToSale(sale, tags);

		return saleId;
	}
}
