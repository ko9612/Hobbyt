package com.hobbyt.domain.sale.repository;

import java.util.Map;

public interface CustomProductRepository {
	public Map<Long, Boolean> getProductsIdBySaleId(Long saleId);

}
