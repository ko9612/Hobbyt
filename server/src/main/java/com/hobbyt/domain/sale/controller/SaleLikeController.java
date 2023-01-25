package com.hobbyt.domain.sale.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.sale.service.SaleLikeService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales/{saleId}/like")
public class SaleLikeController {
	private final SaleLikeService saleLikeService;

	@PostMapping
	public ResponseEntity likeSale(@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 1) @PathVariable Long saleId) {

		saleLikeService.createSaleLike(loginMember.getEmail(), saleId);

		return ResponseEntity.ok().build();
	}
}
