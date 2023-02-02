package com.hobbyt.domain.order.service;

import static com.hobbyt.domain.notification.entity.NotificationType.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.notification.dto.NotificationEvent;
import com.hobbyt.domain.order.dto.OrderImportRequest;
import com.hobbyt.domain.order.dto.OrderInfo;
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
import com.hobbyt.global.error.exception.ImpossibleCancelException;
import com.hobbyt.global.error.exception.OrderNotExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	private final SaleService saleService;
	private final ProductService productService;
	private final MemberService memberService;
	private final OrderRepository orderRepository;
	private final ApplicationEventPublisher eventPublisher;
	private final PaymentService paymentService;

	@Transactional(readOnly = true)
	public int getTotalPrice(OrderInfo orderInfo) {
		int totalPrice = 0;
		Sale sale = saleService.findSaleWithProduct(orderInfo.getSaleId());
		// Sale sale = saleService.findSaleById(saleId);
		Delivery delivery = sale.getDelivery();
		totalPrice += delivery.getDeliveryPrice();
		List<ProductDto> products = orderInfo.getProducts();

		for (ProductDto product : orderInfo.getProducts()) {
			Product found = productService.findProductById(product.getId());
			totalPrice += found.getPrice() * product.getCount();
		}

		return totalPrice;
	}

	/*public Long orderByImport(String loginEmail, OrderRequest request, int amount) {
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
	}*/

	public Long orderByImport(String loginEmail, OrderImportRequest request, int amount) {
		OrderInfo orderInfo = request.getOrderInfo();

		Order order = order(loginEmail, orderInfo);

		Payments payments = new Payments(request.getImpUid(), amount, 0);

		order.setPayments(payments);

		return order.getId();
	}

	public Order order(String loginEmail, OrderInfo orderInfo) {
		Order order = orderInfo.toOrder();
		Member member = memberService.findMemberByEmail(loginEmail);
		List<ProductDto> products = orderInfo.getProducts();
		Map<Product, Integer> orderedProducts = new HashMap<>();
		products.forEach(
			product -> orderedProducts.put(productService.findProductById(product.getId()), product.getCount()));

		order.setMember(member);
		order.updateOrderStatus(OrderStatus.ORDER);

		orderedProducts.forEach(
			(product, count) -> order.addOrderItem(OrderItem.of(product, product.getPrice(), count)));

		Sale sale = saleService.findSaleById(orderInfo.getSaleId());
		eventPublisher.publishEvent(NotificationEvent.builder()
			.receiver(sale.getWriter())
			.sender(member.getNickname())
			.articleId(sale.getId())
			.title(sale.getTitle())
			.type(POST_COMMENT)
			.build());

		orderRepository.save(order);
		return order;
	}

	public void cancel(Long orderId, Long saleId) throws IOException {
		// if 주문상태가 배송준비중, 배송완료 : 주문취소 실패

		// if 결제수단 == CARD : 환불처리

		// 주문취소 알람
		// 주문상태 변경

		Order order = findOrderByOrderId(orderId);
		Sale sale = saleService.findSaleById(saleId);
		String token = paymentService.getToken();

		if (!order.isPossibleToCancel()) {
			// 주문취소 실패 예외
			throw new ImpossibleCancelException("주문을 취소할 수 없는 상태입니다.");
		}

		if (!order.isBankTransfer()) {
			// 환불처리
			Payments payments = order.getPayments();
			paymentService.paymentCancel(token, payments.getImpUid(), payments.getAmount(), "주문취소");
		}

		// 주문취소 알람
		// 주문상태 변경
		eventPublisher.publishEvent(NotificationEvent.builder()
			.receiver(sale.getWriter())
			.sender(order.getMember().getNickname())
			.articleId(sale.getId())
			.title(sale.getTitle())
			.type(CANCEL)
			.build()
		);
		order.updateOrderStatus(OrderStatus.CANCEL);
	}

	private Order findOrderByOrderId(Long orderId) {
		return orderRepository.findById(orderId).orElseThrow(OrderNotExistException::new);
	}

	/*
	public Long orderByImport(String loginEmail, OrderImportRequest request, int amount) {
		OrderInfo orderInfo = request.getOrderInfo();
		Order order = orderInfo.toOrder();

		order(loginEmail, order, orderInfo.getProducts());

		Payments payments = new Payments(request.getImpUid(), amount, 0);

		order.setPayments(payments);

		return order.getId();
	}

	public Order order(String loginEmail, Order order, List<ProductDto> products) {
		Member member = memberService.findMemberByEmail(loginEmail);
		Map<Product, Integer> orderedProducts = new HashMap<>();
		products.forEach(
			product -> orderedProducts.put(productService.findProductById(product.getId()), product.getCount()));

		order.setMember(member);
		order.updateOrderStatus(OrderStatus.ORDER);

		orderedProducts.forEach(
			(product, count) -> order.addOrderItem(OrderItem.of(product, product.getPrice(), count)));

		orderRepository.save(order);
		return order;
	}*/
}
