package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static org.springframework.http.MediaType.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.member.dto.request.ProfileRequest;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.dto.response.ProfileResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.annotation.AuthMember;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	// test용 api >> 나중에 제거
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

	@DeleteMapping("/myPage/delete")
	public ResponseEntity withdraw(@AuthMember Member loginMember, HttpServletRequest request,
		HttpServletResponse response) {

		String accessToken = request.getHeader(AUTH_HEADER).substring(7);

		memberService.withdraw(accessToken, loginMember.getId());

		return ResponseEntity.ok().build();
	}

	@PatchMapping("/myPage")
	public ResponseEntity update(@AuthMember Member loginMember,
		@Validated @RequestBody UpdateMyInfoRequest updateMyInfoRequest) {

		memberService.updateMyInfo(loginMember.getId(), updateMyInfoRequest);

		return ResponseEntity.ok().build();
	}

	@PatchMapping("/myPage/password")
	public ResponseEntity updatePassword(@AuthMember Member loginMember,
		@Validated @RequestBody UpdatePassword updatePassword) {

		memberService.updatePassword(loginMember.getId(), updatePassword);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/myPage/info")
	public ResponseEntity myInfoDetails(@AuthMember Member loginMember) {
		// MyInfoResponse myInfoResponse = MyInfoResponse.of(loginMember);
		MyInfoResponse myInfoResponse = memberService.getMyInfo(loginMember);

		return ResponseEntity.ok(myInfoResponse);
	}

	@GetMapping("/profile")
	public ResponseEntity getProfile(@AuthMember Member loginMember) {
		// ProfileResponse profileResponse = ProfileResponse.of(loginMember);
		ProfileResponse profileResponse = memberService.getProfile(loginMember);
		
		return ResponseEntity.ok(profileResponse);
	}

	@PatchMapping(value = "/profile", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity updateProfile(@AuthMember Member loginMember,
		@RequestPart(required = false) MultipartFile profileImage,
		@RequestPart(required = false) MultipartFile headerImage,
		@Validated ProfileRequest profileRequest) {

		memberService.updateProfile(loginMember.getId(), profileRequest, profileImage, headerImage);

		return ResponseEntity.ok().build();
	}
}
