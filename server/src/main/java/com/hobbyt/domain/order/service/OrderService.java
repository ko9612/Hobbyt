package com.hobbyt.domain.order.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.order.dto.OrderRequest;
import com.hobbyt.domain.order.dto.ProductDto;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderItem;
import com.hobbyt.domain.order.entity.OrderStatus;
import com.hobbyt.domain.order.entity.Payments;
import com.hobbyt.domain.order.repository.OrderRepository;
import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.service.ProductService;
import com.hobbyt.domain.sale.service.SaleService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	private final SaleService saleService;
	private final ProductService productService;
	private final MemberService memberService;
	private final OrderRepository orderRepository;

	@Transactional(readOnly = true)
	public int getTotalPrice(OrderRequest request) {
		int totalPrice = 0;
		Sale sale = saleService.findSaleWithProduct(request.getSaleId());
		// Sale sale = saleService.findSaleById(saleId);
		Delivery delivery = sale.getDelivery();
		totalPrice += delivery.getDeliveryPrice();
		List<ProductDto> products = request.getProducts();

		for (ProductDto product : request.getProducts()) {
			Product found = productService.findProductById(product.getId());
			totalPrice += found.getPrice() * product.getCount();
		}

		return totalPrice;
	}

	public Long orderByImport(String loginEmail, OrderRequest request, int amount) {
		Member member = memberService.findMemberByEmail(loginEmail);
		Order order = request.toOrder();
		Payments payments = new Payments(request.getImpUid(), amount, 0);

		Map<Product, Integer> orderedProducts = new HashMap<>();
		request.getProducts()
			.forEach(
				product -> orderedProducts.put(productService.findProductById(product.getId()), product.getCount()));

		order.setMember(member);
		order.updateOrderStatus(OrderStatus.ORDER);
		order.setPayments(payments);

		orderedProducts.forEach(
			(product, count) -> order.addOrderItem(OrderItem.of(product, product.getPrice(), count)));

		orderRepository.save(order);

		return order.getId();
	}
}
