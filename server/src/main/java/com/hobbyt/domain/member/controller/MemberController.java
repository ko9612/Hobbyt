package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static org.springframework.http.MediaType.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.security.member.MemberDetails;

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
		// MyInfoResponse myInfoResponse = MyInfoResponse.of(loginMember);
		MyInfoResponse myInfoResponse = memberService.getMyInfo(memberDetails.getEmail());

		return ResponseEntity.ok(myInfoResponse);
	}

	@GetMapping("/profile/{memberId}")
	public ResponseEntity getProfile(@Min(value = 1) @PathVariable Long memberId) {
		// ProfileResponse profileResponse = ProfileResponse.of(loginMember);
		ProfileResponse profileResponse = memberService.getProfile(memberId);

		return ResponseEntity.ok(profileResponse);
	}

	@PatchMapping(value = "/profile", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity updateProfile(@AuthenticationPrincipal MemberDetails memberDetails,
		@RequestPart(required = false) MultipartFile profileImage,
		@RequestPart(required = false) MultipartFile headerImage,
		@RequestPart @Validated ProfileRequest profileRequest) {

		memberService.updateProfile(memberDetails.getEmail(), profileRequest, profileImage, headerImage);

		return ResponseEntity.ok().build();
	}
}
