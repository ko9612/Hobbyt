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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.sale.dto.request.SaleRequest;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.service.ProductService;
import com.hobbyt.domain.sale.service.SaleService;
import com.hobbyt.domain.sale.service.SaleTagService;
import com.hobbyt.domain.tag.entity.Tag;
import com.hobbyt.domain.tag.service.TagService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
	private final SaleService saleService;
	private final ProductService productService;
	private final TagService tagService;
	private final SaleTagService saleTagService;

	@GetMapping
	public ResponseEntity getAllSales() {

		return ResponseEntity.ok().build();
	}

	// TODO 이미지 처리
	@PostMapping
	public ResponseEntity postSale(@AuthenticationPrincipal MemberDetails loginMember,
		@RequestPart List<MultipartFile> productImages,
		@Validated @RequestPart SaleRequest saleRequest) {

		if (checkSalePeriod(saleRequest)) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		if (productsAndImageCountIsNotSame(productImages, saleRequest)) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		Sale sale = saleService.post(loginMember.getEmail(), saleRequest.toSale());
		// TODO 이부분에서 이미지 처리, 파라미터에 List<MultipartFile> productImages 넣기
		productService.addProducts(sale, saleRequest.toProducts());
		List<Tag> tags = tagService.addTags(saleRequest.getTags());
		saleTagService.addTagsToSale(sale, tags);

		return ResponseEntity.status(HttpStatus.CREATED).body(sale.getId());
	}

	private boolean productsAndImageCountIsNotSame(List<MultipartFile> productImages, SaleRequest saleRequest) {
		return productImages.size() != saleRequest.getProductsSize();
	}

	private boolean checkSalePeriod(SaleRequest saleRequest) {
		return (saleRequest.isAlwaysOnSale() && saleRequest.getPeriod() != null) || (!saleRequest.isAlwaysOnSale()
			&& saleRequest.getPeriod() == null);
	}

	@GetMapping("/{id}")
	public ResponseEntity getSaleDetails(@Min(value = 1) @PathVariable Long id) {

		return ResponseEntity.ok().build();
	}

	// TODO 이미지 처리
	@PatchMapping("/{id}")
	public ResponseEntity updateSale(@Min(value = 1) @PathVariable Long id) {

		return ResponseEntity.ok().build();
	}

	// TODO 이미지 처리
	@DeleteMapping("/{id}")
	public ResponseEntity deleteSale(@Min(value = 1) @PathVariable Long id) {

		return ResponseEntity.ok().build();
	}
}
