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

import com.hobbyt.domain.member.dto.LoginDto;
import com.hobbyt.domain.member.dto.response.LoginInfo;
import com.hobbyt.domain.member.dto.response.LoginResponse;
import com.hobbyt.domain.member.service.AuthService;
import com.hobbyt.global.security.dto.LoginRequest;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@GetMapping("/loginInfo")
	public ResponseEntity getLoginInfo(@AuthenticationPrincipal MemberDetails loginMember) {
		LoginInfo response = authService.getLoginInfo(loginMember.getEmail());

		return ResponseEntity.ok(response);
	}

	@PostMapping("/login")
	public ResponseEntity login(@Validated @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

		LoginDto loginDto = authService.login(loginRequest);

		response.setHeader(AUTH_HEADER, loginDto.getAccessToken());
		response.setHeader(REFRESH_TOKEN_HEADER, loginDto.getRefreshToken());
		LoginResponse loginResponse = new LoginResponse(loginDto.getId(), loginDto.getNickname());
		return ResponseEntity.ok(loginResponse);
	}

	@PostMapping("/reissue")
	public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = request.getHeader(REFRESH_TOKEN_HEADER);

		String reissuedAccessToken = authService.reissueAccessToken(refreshToken);

		response.setHeader(AUTH_HEADER, reissuedAccessToken);

		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
		String accessToken = request.getHeader(AUTH_HEADER).substring(7);

		authService.logout(accessToken);

		return new ResponseEntity(HttpStatus.OK);
	}
}
