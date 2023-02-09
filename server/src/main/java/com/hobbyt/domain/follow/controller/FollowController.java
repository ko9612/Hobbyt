package com.hobbyt.domain.follow.controller;

import javax.validation.constraints.Min;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.follow.service.FollowService;
import com.hobbyt.global.dto.SliceResponse;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/{memberId}")
public class FollowController {
	private final FollowService followService;

	@PostMapping("/follow")
	public ResponseEntity follow(@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 1) @PathVariable Long memberId) {

		followService.following(loginMember.getEmail(), memberId);

		return ResponseEntity.ok().build();
	}

	// 현재 회원이 친구로 추가한 사람 조회
	@GetMapping("/following")
	public ResponseEntity getFollowing(@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 1) @PathVariable Long memberId, Pageable pageable) {

		log.info("loginMember: {}", loginMember);

		SliceResponse response = followService.getFollowing(loginMember, memberId, pageable);

		return ResponseEntity.ok(response);
	}

	// 현재 회원을 친구로 추가한 사람 조회
	@GetMapping("/follower")
	public ResponseEntity getFollower(@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 1) @PathVariable Long memberId, Pageable pageable) {

		log.info("loginMember: {}", loginMember);

		SliceResponse response = followService.getFollower(loginMember, memberId, pageable);

		return ResponseEntity.ok(response);
	}
}
