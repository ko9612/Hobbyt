package com.hobbyt.domain.sale.repository;

import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.mypage.dto.PageDto;

public interface CustomProductRepository {
	public Map<Long, Boolean> getProductsIdBySaleId(Long saleId);

	public PageDto getOrderedProductsByMemberEmail(String email, Pageable pageable);
}
