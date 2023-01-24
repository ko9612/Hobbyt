package com.hobbyt.domain.sale.controller;

import static org.springframework.http.MediaType.*;

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

import com.hobbyt.domain.entity.Period;
import com.hobbyt.domain.sale.dto.request.SaleRequest;
import com.hobbyt.domain.sale.dto.request.UpdateSaleRequest;
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
	@PostMapping(consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity postSale(@AuthenticationPrincipal MemberDetails loginMember,
		@RequestPart List<MultipartFile> productImages,
		@Validated @RequestPart SaleRequest request) {

		if (checkSalePeriod(request.isAlwaysOnSale(), request.getPeriod())) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		if (productsAndImageCountIsNotSame(productImages.size(), request.getProductsSize())) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		Sale sale = saleService.post(loginMember.getEmail(), request.toSale());
		// TODO 이부분에서 이미지 처리, 파라미터에 List<MultipartFile> productImages 넣기
		productService.addProducts(sale, request.toProducts());
		List<Tag> tags = tagService.addTags(request.getTags());
		saleTagService.addTagsToSale(sale, tags);

		return ResponseEntity.status(HttpStatus.CREATED).body(sale.getId());
	}

	private boolean productsAndImageCountIsNotSame(int imageSize, int productSize) {
		return imageSize != productSize;
	}

	private boolean checkSalePeriod(boolean isAlwaysOnSale, Period period) {
		return (isAlwaysOnSale && period != null) || (!isAlwaysOnSale && period == null);
	}

	@GetMapping("/{id}")
	public ResponseEntity getSaleDetails(@Min(value = 1) @PathVariable Long id) {

		return ResponseEntity.ok().build();
	}

	// TODO 이미지 처리
	@PatchMapping(value = "/{id}", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity updateSale(@Min(value = 1) @PathVariable Long id,
		@RequestPart(required = false) List<MultipartFile> productImages,
		@Validated @RequestPart UpdateSaleRequest request) {

		if (checkSalePeriod(request.isAlwaysOnSale(), request.getPeriod())) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		if (productsAndImageCountIsNotSame(productImages.size(), request.getProductsSize())) {
			// 예외처리?
			return ResponseEntity.badRequest().build();
		}

		// Sale 수정
		Sale updatedSale = saleService.updateSale(id, request.toSale());
		// Product 수정
		// 이미지 처리후 넣은 갑의 경로 반환
		// TODO request.toProducts(이미지 경로 List) 로 변경
		productService.updateProducts(updatedSale, request.toProducts());
		// Tag 수정
		List<Tag> tags = tagService.addTags(request.getTags());
		saleTagService.updateTagsToSale(updatedSale, tags);
		return ResponseEntity.ok(updatedSale.getId());
	}

	// TODO 이미지 처리
	@DeleteMapping("/{id}")
	public ResponseEntity deleteSale(@Min(value = 1) @PathVariable Long id) {
		// Sale 의 deleted 를 true로 변경
		// Product의 deleted를 true로 변경?

		return ResponseEntity.ok().build();
	}
}
