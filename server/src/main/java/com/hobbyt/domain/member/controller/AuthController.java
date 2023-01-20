package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.dto.LoginResponse;
import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.service.AuthService;
import com.hobbyt.domain.member.service.MailContentBuilder;
import com.hobbyt.domain.member.service.MailService;
import com.hobbyt.global.security.dto.LoginRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	private final MailContentBuilder mailContentBuilder;
	private final MailService mailService;

	@PostMapping("/code")
	public ResponseEntity mailConfirm(@Validated @RequestBody EmailRequest emailRequest) {
		String code = authService.sendAuthenticationCodeEmail(emailRequest);
		// String code = AuthenticationCode.createCode().getCode();
		// NotificationEmail notificationEmail = mailContentBuilder.createAuthCodeMail(code, emailRequest.getEmail());
		// mailService.sendMail(notificationEmail);

		return new ResponseEntity(code, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity login(@Validated @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

		LoginResponse loginResponse = authService.login(loginRequest);

		response.setHeader(AUTH_HEADER, TOKEN_TYPE + " " + loginResponse.getAccessToken());
		response.setHeader(REFRESH_TOKEN_HEADER, loginResponse.getRefreshToken());
		return ResponseEntity.ok(loginResponse.getId());
	}

	@PostMapping("/reissue")
	public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
		String accessToken = request.getHeader(AUTH_HEADER).substring(7);
		String refreshToken = request.getHeader(REFRESH_TOKEN_HEADER);

		String reissuedAccessToken = authService.reissueAccessToken(accessToken, refreshToken);
		String reissuedRefreshToken = authService.reissueRefreshToken(refreshToken);

		response.setHeader(AUTH_HEADER, TOKEN_TYPE + " " + reissuedAccessToken);
		response.setHeader(REFRESH_TOKEN_HEADER, reissuedRefreshToken);

		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
		String accessToken = request.getHeader(AUTH_HEADER).substring(7);

		authService.logout(accessToken);

		return new ResponseEntity(HttpStatus.OK);
	}
}
