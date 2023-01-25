package com.hobbyt.domain.sale.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.entity.SaleLike;
import com.hobbyt.domain.sale.repository.SaleLikeRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleLikeService {
	private final MemberService memberService;
	private final SaleService saleService;
	private final SaleLikeRepository saleLikeRepository;

	public void createSaleLike(String email, Long saleId) {
		Member member = memberService.findMemberByEmail(email);
		Sale sale = saleService.findSaleById(saleId);

		Optional<SaleLike> saleLike = saleLikeRepository.findByMemberAndSale(member, sale);
		if (saleLike.isPresent()) {
			saleLikeRepository.delete(saleLike.get());
			sale.updateLikeCount(-1);
			return;
		}

		saleLikeRepository.save(SaleLike.of(member, sale));
		sale.updateLikeCount(+1);
	}
}
