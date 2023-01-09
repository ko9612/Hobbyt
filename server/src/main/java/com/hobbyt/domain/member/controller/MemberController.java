package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	// test용 api
	@GetMapping("/check")
	public ResponseEntity check() {
		System.out.println("========== check ok ==========");
		return new ResponseEntity("check ok", HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity signup(@Validated @RequestBody SignupRequest signupRequest) {
		Long id = memberService.createUser(signupRequest);
		return new ResponseEntity(id, HttpStatus.CREATED);
	}

	@PostMapping("/myPage/delete")
	public ResponseEntity withdraw(@AuthenticationPrincipal MemberDetails memberDetails, HttpServletRequest request,
		HttpServletResponse response) {

		String accessToken = request.getHeader(AUTH_HEADER).substring(7);

		memberService.withdraw(accessToken, memberDetails.getUsername());

		return new ResponseEntity(HttpStatus.OK);
	}
}
