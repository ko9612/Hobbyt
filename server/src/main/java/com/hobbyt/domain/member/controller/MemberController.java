package com.hobbyt.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.service.MemberService;

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
}
