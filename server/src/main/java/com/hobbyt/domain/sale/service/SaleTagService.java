package com.hobbyt.domain.sale.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.entity.SaleTag;
import com.hobbyt.domain.sale.repository.SaleTagRepository;
import com.hobbyt.domain.tag.entity.Tag;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SaleTagService {
	private final SaleTagRepository saleTagRepository;

	public void addTagsToSale(Sale sale, List<Tag> tags) {
		tags.forEach(tag -> createSaleTag(sale, tag));
	}

	private void createSaleTag(Sale sale, Tag tag) {
		saleTagRepository.save(SaleTag.of(sale, tag));
	}
}
