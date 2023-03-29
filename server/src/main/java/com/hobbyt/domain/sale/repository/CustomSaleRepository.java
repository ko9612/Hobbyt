package com.hobbyt.domain.sale.repository;

public interface CustomSaleRepository {
	Long findSaleIdByOrderId(Long orderId);

	// Optional<Sale> findSaleAndProductsBySaleId(Long saleId);
}
