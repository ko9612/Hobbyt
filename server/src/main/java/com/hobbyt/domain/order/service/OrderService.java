package com.hobbyt.domain.order.service;

import static com.hobbyt.domain.notification.entity.NotificationType.*;
import static com.hobbyt.domain.order.entity.OrderStatus.*;

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
import com.hobbyt.domain.notification.entity.NotificationType;
import com.hobbyt.domain.order.dto.OrderImportRequest;
import com.hobbyt.domain.order.dto.OrderInfo;
import com.hobbyt.domain.order.dto.ProductDto;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderItem;
import com.hobbyt.domain.order.entity.Payments;
import com.hobbyt.domain.order.repository.OrderRepository;
import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.service.ProductService;
import com.hobbyt.domain.sale.service.SaleService;
import com.hobbyt.global.error.exception.OrderNotExistException;
import com.hobbyt.global.error.exception.PaymentException;

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
	public int getTotalPrice(Long saleId, List<ProductDto> products) {
		int totalPrice = 0;
		Sale sale = saleService.findSaleWithProduct(saleId);
		// Sale sale = saleService.findSaleById(saleId);
		Delivery delivery = sale.getDelivery();
		totalPrice += delivery.getDeliveryPrice();

		for (ProductDto product : products) {
			Product found = productService.findProductById(product.getId());
			totalPrice += found.getPrice() * product.getCount();
		}

		return totalPrice;
	}

	public Long orderByImport(String loginEmail, OrderImportRequest request, int amount) {
		OrderInfo orderInfo = request.getOrderInfo();

		Order order = order(loginEmail, orderInfo);

		Payments payments = new Payments(request.getImpUid(), amount, 0);

		order.setPayments(payments);
		order.updateOrderStatus(PAYMENT_VERIFICATION);

		return order.getId();
	}

	public Order order(String loginEmail, OrderInfo orderInfo) {
		Order order = orderInfo.toOrder();
		Member purchaser = memberService.findMemberByEmail(loginEmail);

		addOrderedProducts(orderInfo.getProducts(), order);
		order.setMember(purchaser);
		order.updateOrderStatus(ORDER);

		publishNotification(orderInfo.getSaleId(), purchaser, SALE_ORDER);

		orderRepository.save(order);
		return order;
	}

	private void publishNotification(Long saleId, Member sender, NotificationType type) {
		Sale sale = saleService.findSaleById(saleId);
		eventPublisher.publishEvent(NotificationEvent.builder()
			.receiver(sale.getWriter())
			.sender(sender.getNickname())
			.articleId(sale.getId())
			.title(sale.getTitle())
			.type(type)
			.build());
	}

	private void addOrderedProducts(List<ProductDto> products, Order order) {
		/*products.forEach(product -> order.addOrderItem(OrderItem.of(productService.findProductById(product.getId()),
			productService.findProductById(product.getId()).getPrice(), product.getCount())));*/

		Map<Product, Integer> orderedProducts = new HashMap<>();
		products.forEach(
			product -> orderedProducts.put(productService.findProductById(product.getId()), product.getCount()));

		orderedProducts.forEach(
			(product, count) -> order.addOrderItem(OrderItem.of(product, product.getPrice(), count)));
	}

	public void cancel(Long orderId, Long saleId) throws IOException {
		Order order = findOrderByOrderId(orderId);

		order.cancel();

		if (isIamportPayments(order)) {    // 아임포트 이용한 계산인 경우 아임포트 환불처리
			// 환불처리
			String token = paymentService.getToken();
			Payments payments = order.getPayments();
			paymentService.paymentCancel(token, payments.getImpUid(), payments.getAmount(), "주문취소");
		}

		publishNotification(saleId, order.getMember(), ORDER_CANCEL);
	}

	private boolean isIamportPayments(Order order) {
		return !order.isBankTransfer();
	}

	public Order findOrderByOrderId(Long orderId) {
		return orderRepository.findById(orderId).orElseThrow(OrderNotExistException::new);
	}

	public Long compareTotalPrice(OrderImportRequest request, String email) throws IOException {

		String token = paymentService.getToken();
		int amount = paymentService.paymentInfo(request.getImpUid(), token);
		OrderInfo orderInfo = request.getOrderInfo();
		try {
			int totalPrice = getTotalPrice(orderInfo.getSaleId(), orderInfo.getProducts());
			if (amount != totalPrice) {
				throw new PaymentException();
			}

			Long orderId = orderByImport(email, request, amount);
			return orderId;
		} catch (Exception ex) {
			paymentService.paymentCancel(token, request.getImpUid(), amount, "결제 금액 오류");
			throw new PaymentException("결제 오류");
		}
	}
}
