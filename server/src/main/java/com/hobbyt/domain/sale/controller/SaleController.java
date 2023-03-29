package com.hobbyt.domain.sale.controller;

import java.util.List;

import javax.validation.constraints.Min;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.sale.dto.request.SaleRequest;
import com.hobbyt.domain.sale.dto.request.UpdateSaleRequest;
import com.hobbyt.domain.sale.dto.response.SaleResponse;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.service.ProductService;
import com.hobbyt.domain.sale.service.SaleLikeService;
import com.hobbyt.domain.sale.service.SaleService;
import com.hobbyt.domain.sale.service.SaleTagService;
import com.hobbyt.domain.tag.entity.Tag;
import com.hobbyt.domain.tag.service.TagService;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.error.exception.ExceptionCode;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
	private final SaleService saleService;
	private final SaleLikeService saleLikeService;
	private final ProductService productService;
	private final TagService tagService;
	private final SaleTagService saleTagService;

	@GetMapping("/{saleId}")
	public ResponseEntity getSaleDetails(@Min(value = 1) @PathVariable Long saleId,
		@AuthenticationPrincipal MemberDetails loginMember) {

		SaleResponse response = saleService.getSaleDetails(saleId);

		if (loginMember != null) {
			response.setIsLiked(saleLikeService.getIsLikedByEmail(loginMember.getEmail(), saleId));
		}

		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity postSale(@AuthenticationPrincipal MemberDetails loginMember,
		@Validated @RequestBody SaleRequest request) {

		checkSalePeriod(request.getIsAlwaysOnSale(), request.isPeriodNull());

		Sale sale = saleService.post(loginMember.getEmail(), request.toSale(), request.getThumbnailImage());
		productService.addProducts(sale.getId(), request.getProducts());
		List<Tag> tags = tagService.addTags(request.getTags());
		saleTagService.addTagsToSale(sale, tags);

		return ResponseEntity.status(HttpStatus.CREATED).body(sale.getId());
	}

	private void checkSalePeriod(boolean isAlwaysOnSale, boolean isPeriodNull) {
		if ((isAlwaysOnSale && !isPeriodNull) || (!isAlwaysOnSale && isPeriodNull)) {
			throw new BusinessLogicException(ExceptionCode.WRONG_PERIOD);
		}
	}

	@PatchMapping("/{saleId}")
	public ResponseEntity updateSale(@Min(value = 1) @PathVariable Long saleId,
		@Validated @RequestBody UpdateSaleRequest request) {

		checkSalePeriod(request.getIsAlwaysOnSale(), request.isPeriodNull());

		Sale updatedSale = saleService.updateSale(saleId, request.toSale());
		productService.updateProducts(updatedSale.getId(), request.getProducts());
		List<Tag> tags = tagService.addTags(request.getTags());
		saleTagService.updateTagsToSale(updatedSale, tags);
		return ResponseEntity.ok(updatedSale.getId());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteSale(@Min(value = 1) @PathVariable Long id) {
		Sale deletedSale = saleService.delete(id);
		productService.delete(deletedSale);

		return ResponseEntity.noContent().build();
	}
}
