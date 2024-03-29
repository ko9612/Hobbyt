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
import com.hobbyt.domain.order.dto.request.OrderImportRequest;
import com.hobbyt.domain.order.dto.request.OrderInfo;
import com.hobbyt.domain.order.dto.request.ProductDto;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderItem;
import com.hobbyt.domain.order.entity.Payments;
import com.hobbyt.domain.order.repository.OrderRepository;
import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.SaleRepository;
import com.hobbyt.domain.sale.service.ProductService;
import com.hobbyt.domain.sale.service.SaleService;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.error.exception.ExceptionCode;
import com.hobbyt.global.error.exception.PaymentException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	private final SaleService saleService;
	private final ProductService productService;
	private final MemberService memberService;
	private final PaymentService paymentService;
	private final OrderRepository orderRepository;
	private final SaleRepository saleRepository;
	private final ApplicationEventPublisher eventPublisher;

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

		Payments payments = new Payments(request.getImpUid(), amount);

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

		orderRepository.save(order);

		publishNotification(orderInfo.getSaleId(), order.getId(), purchaser.getNickname(), SALE_ORDER);
		return order;
	}

	private void publishNotification(Long saleId, Long orderId, String sender, NotificationType type) {
		Sale sale = saleService.findSaleById(saleId);
		eventPublisher.publishEvent(NotificationEvent.builder()
			.receiver(sale.getWriter())
			.sender(sender)
			.redirectId(orderId)
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

	public void cancel(Long orderId) throws IOException {
		Order order = findOrderByOrderId(orderId);
		Member purchaser = order.getMember();
		Long saleId = saleRepository.findSaleIdByOrderId(order.getId());

		order.cancel();

		if (order.isPossibleStatusToCancel()) {
			order.updateOrderStatus(CANCEL);
		}

		if (order.isPossibleStatusToRefund()) {
			canceledOrderRefund(order);
		}

		publishNotification(saleId, order.getId(), purchaser.getNickname(), ORDER_CANCEL);
	}

	private void canceledOrderRefund(Order order) throws IOException {
		order.updateOrderStatus(PREPARE_REFUND);

		if (isIamportPayments(order)) {    // 아임포트 이용한 계산인 경우 아임포트 환불처리
			String token = paymentService.getToken();
			Payments payments = order.getPayments();
			payments.cancel(payments.getAmount());
			paymentService.paymentCancel(token, payments.getImpUid(), payments.getAmount(), "주문취소");
			order.updateOrderStatus(FINISH_REFUND);
		}
	}

	private boolean isIamportPayments(Order order) {
		return !order.isBankTransfer();
	}

	public Order findOrderByOrderId(Long orderId) {
		return orderRepository.findById(orderId)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
	}

	public Long compareTotalPrice(OrderImportRequest request, String email) throws IOException {

		String token = paymentService.getToken();
		int amount = paymentService.paymentInfo(request.getImpUid(), token);
		OrderInfo orderInfo = request.getOrderInfo();
		try {
			int totalPrice = getTotalPrice(orderInfo.getSaleId(), orderInfo.getProducts());

			log.info("amount: {}", amount);
			log.info("totalPrice: {}", totalPrice);

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
