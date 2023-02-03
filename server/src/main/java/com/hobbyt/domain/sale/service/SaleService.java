package com.hobbyt.domain.sale.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.sale.dto.response.SaleResponse;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.SaleRepository;
import com.hobbyt.domain.tag.repository.TagRepository;
import com.hobbyt.global.error.exception.SaleNotExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {
	private final MemberService memberService;
	private final SaleRepository saleRepository;
	private final TagRepository tagRepository;

	public Sale post(final String email, Sale sale) {
		Member member = memberService.findMemberByEmail(email);
		sale.setWriter(member);

		return saleRepository.save(sale);
	}

	public Sale updateSale(Long id, Sale updateSale) {
		Sale sale = findSaleById(id);
		sale.update(updateSale);
		return sale;
	}

	public Sale findSaleById(Long id) {
		return saleRepository.findById(id).orElseThrow(SaleNotExistException::new);
	}

	public Sale delete(Long id) {
		Sale sale = findSaleById(id);
		sale.delete();
		return sale;
	}

	@Transactional
	public SaleResponse getSaleDetails(Long saleId) {

		// Sale 조회 >> Sale, Product fetch join
		Sale sale = findSaleWithWriterAndProduct(saleId);

		List<Product> products = sale.getProducts();

		// Tag 조회
		List<String> tags = tagRepository.getTagsBySaleId(saleId);

		sale.increaseViewCount();

		// TODO 이런식으로 화면단의 SaleResponse 가 Service 계층까지 들어오는게 맞을지 고민
		return SaleResponse.of(sale, products, tags);
	}

	private Sale findSaleWithWriterAndProduct(Long id) {
		return saleRepository.findSaleFetchJoinWriterAndProductBySaleId(id).orElseThrow(SaleNotExistException::new);
	}

	public Sale findSaleWithProduct(Long id) {
		return saleRepository.findSaleFetchJoinProductBySaleId(id).orElseThrow(SaleNotExistException::new);
	}
}
