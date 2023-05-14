package com.hobbyt.domain.privatehome.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.dto.request.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.request.ProfileRequest;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.response.ProfileResponse;
import com.hobbyt.domain.privatehome.service.PrivateHomeService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/{memberId}/private")
@RequiredArgsConstructor
@Validated
public class PrivateHomeController {
	private final PrivateHomeService privateHomeService;
	private final MemberService memberService;

	@GetMapping("/profile")
	public ResponseEntity getProfile(@Min(value = 1) @PathVariable Long memberId,
		@AuthenticationPrincipal MemberDetails loginMember) {

		if (loginMember == null) {
			Member member = memberService.findMemberById(memberId);
			return ResponseEntity.ok(ProfileResponse.of(member));
		}

		ProfileResponse profileResponse = privateHomeService.getProfile(memberId, loginMember.getEmail());
		return ResponseEntity.ok(profileResponse);
	}

	@PatchMapping("/profile")
	public ResponseEntity updateProfile(@AuthenticationPrincipal MemberDetails memberDetails,
		@Validated @RequestBody ProfileRequest profileRequest) {

		privateHomeService.updateProfile(memberDetails.getEmail(), profileRequest);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts")
	public ResponseEntity<PrivateHomePostResponse> getPostList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params) {

		PrivateHomePostResponse response = privateHomeService.getBlogListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/comments")
	public ResponseEntity<PrivateHomeCommentResponse> getCommentList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params) {

		PrivateHomeCommentResponse response = privateHomeService
			.getCommentListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/post-likes")
	public ResponseEntity<PrivateHomePostLikeResponse> getPostLikeList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params) {
		PrivateHomePostLikeResponse response = privateHomeService
			.getPostLikeListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/sales")
	public ResponseEntity getSales(@Min(value = 1) @PathVariable Long memberId, PrivateHomeRequest params) {
		PrivateHomeSaleResponse response = privateHomeService.getSales(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/sale-likes")
	public ResponseEntity getSaleLikeList(@Min(value = 1) @PathVariable Long memberId,
		@ModelAttribute PrivateHomeRequest params) {

		PrivateHomeSaleLikeResponse response = privateHomeService
			.getSaleLikeListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}
}
