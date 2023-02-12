package com.hobbyt.domain.sale.repository;

import java.util.Optional;

import com.hobbyt.domain.sale.entity.Sale;

public interface CustomSaleRepository {
	Long findSaleIdByOrderId(Long orderId);

	Optional<Sale> findSaleAndProductsBySaleId(Long saleId);
}
