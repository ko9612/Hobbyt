package com.hobbyt.domain.sale.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.sale.dto.response.SaleResponse;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.SaleRepository;
import com.hobbyt.domain.tag.repository.TagRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class SaleService {
	private final MemberService memberService;
	private final SaleRepository saleRepository;
	private final TagRepository tagRepository;

	public Long post(final String email, Sale sale) {
		Member member = memberService.findMemberByEmail(email);
		sale.setWriter(member);

		return saleRepository.save(sale).getId();
	}

	public Sale updateSale(Long id, Sale updateSale) {
		Sale sale = findSaleById(id);
		sale.update(updateSale);
		return sale;
	}

	public Sale findSaleById(Long id) {
		return saleRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(SALE_NOT_FOUND));
	}

	public Sale delete(Long id) {
		Sale sale = findSaleById(id);
		sale.delete();
		return sale;
	}

	@Transactional
	public SaleResponse getSaleDetails(Long saleId) {
		Sale sale = saleRepository.findSaleForUpdateById(saleId)
			.orElseThrow(() -> new BusinessLogicException(SALE_NOT_FOUND));

		List<Product> products = sale.getProducts()
			.stream()
			.filter(product -> !product.isDeleted())
			.collect(Collectors.toList());

		Member writer = sale.getWriter();

		List<String> tags = tagRepository.getTagsBySaleId(saleId);

		sale.increaseViewCount();

		return SaleResponse.of(sale, products, writer, tags);
	}

	public Sale findSaleWithProduct(Long id) {
		return saleRepository.findSaleFetchJoinProductBySaleId(id)
			.orElseThrow(() -> new BusinessLogicException(SALE_NOT_FOUND));
	}
}
