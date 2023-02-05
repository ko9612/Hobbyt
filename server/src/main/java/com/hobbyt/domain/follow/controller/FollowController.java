package com.hobbyt.domain.follow.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.follow.service.FollowService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FollowController {
	private final FollowService followService;

	@PostMapping("/members/{memberId}/follow")
	public ResponseEntity following(@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 1) @PathVariable Long memberId) {

		followService.following(loginMember.getEmail(), memberId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/following")
	public ResponseEntity follow(@AuthenticationPrincipal MemberDetails loginMember) {

		return ResponseEntity.ok().build();
	}
}
