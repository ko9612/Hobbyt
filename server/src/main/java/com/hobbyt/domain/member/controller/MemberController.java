package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.member.service.query.MemberQueryService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final MemberQueryService memberQueryService;

	@PostMapping("/signup")
	public ResponseEntity signup(@Validated @RequestBody SignupRequest signupRequest) {
		Long id = memberService.createMember(signupRequest);

		return new ResponseEntity(id, HttpStatus.CREATED);
	}

	@DeleteMapping("/myPage/delete")
	public ResponseEntity withdraw(@AuthenticationPrincipal MemberDetails memberDetails, HttpServletRequest request,
		HttpServletResponse response) {

		String accessToken = request.getHeader(AUTH_HEADER).substring(7);

		memberService.withdraw(accessToken, memberDetails.getEmail());

		return ResponseEntity.ok().build();
	}

	@PatchMapping("/myPage")
	public ResponseEntity update(@AuthenticationPrincipal MemberDetails memberDetails,
		@Validated @RequestBody UpdateMyInfoRequest updateMyInfoRequest) {

		memberService.updateMyInfo(memberDetails.getEmail(), updateMyInfoRequest);

		return ResponseEntity.ok().build();
	}

	@PatchMapping("/myPage/password")
	public ResponseEntity updatePassword(@AuthenticationPrincipal MemberDetails memberDetails,
		@Validated @RequestBody UpdatePassword updatePassword) {

		memberService.updatePassword(memberDetails.getEmail(), updatePassword);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/myPage/info")
	public ResponseEntity myInfoDetails(@AuthenticationPrincipal MemberDetails memberDetails) {
		MyInfoResponse myInfoResponse = memberQueryService.getMyInfo(memberDetails.getEmail());

		return ResponseEntity.ok(myInfoResponse);
	}
}
