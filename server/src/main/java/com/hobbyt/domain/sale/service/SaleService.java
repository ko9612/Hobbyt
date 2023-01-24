package com.hobbyt.domain.sale.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.SaleRepository;
import com.hobbyt.global.error.exception.SaleNotExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {
	private final MemberService memberService;
	private final SaleRepository saleRepository;

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

	private Sale findSaleById(Long id) {
		return saleRepository.findById(id).orElseThrow(SaleNotExistException::new);
	}

	public Sale delete(Long id) {
		Sale sale = findSaleById(id);
		sale.delete();
		return sale;
	}
}
