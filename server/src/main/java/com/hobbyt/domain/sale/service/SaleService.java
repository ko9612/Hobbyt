package com.hobbyt.domain.sale.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.service.PrivateHomeService;
import com.hobbyt.domain.sale.dto.response.SaleResponse;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.repository.SaleRepository;
import com.hobbyt.domain.tag.repository.TagRepository;
import com.hobbyt.global.exception.BusinessLogicException;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SaleService {
	private final MemberService memberService;
	private final SaleRepository saleRepository;
	private final TagRepository tagRepository;
	private final PrivateHomeService privateHomeService;

	public Sale post(final String email, Sale sale, String thumbnailImage) {
		Member member = memberService.findMemberByEmail(email);
		sale.setWriter(member);

		if (thumbnailImage == null) {
			sale.updateThumbnailImage("기본 이미지");
		} else {
			sale.updateThumbnailImage(thumbnailImage);
		}

		return saleRepository.save(sale);
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
	public SaleResponse getSaleDetails(Long saleId, MemberDetails loginMember) {

		Sale sale = findSaleWithWriterAndProduct(saleId);

		if (loginMember != null) {
			Member writer = sale.getWriter();
			privateHomeService.countVisitor(writer.getId(), loginMember.getEmail());
		}

		List<Product> products = sale.getProducts();

		List<String> tags = tagRepository.getTagsBySaleId(saleId);

		sale.increaseViewCount();

		return SaleResponse.of(sale, products, tags);
	}

	private Sale findSaleWithWriterAndProduct(Long saleId) {
		return saleRepository.findSaleAndProductsBySaleId(saleId)
			.orElseThrow(() -> new BusinessLogicException(SALE_NOT_FOUND));
	}

	public Sale findSaleWithProduct(Long id) {
		return saleRepository.findSaleFetchJoinProductBySaleId(id)
			.orElseThrow(() -> new BusinessLogicException(SALE_NOT_FOUND));
	}
}
