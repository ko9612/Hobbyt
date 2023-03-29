package com.hobbyt.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.service.mail.MailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MailController {
	private final MailService mailService;

	@PostMapping("/auth/code")
	public ResponseEntity mailConfirm(@Validated @RequestBody EmailRequest emailRequest) {

		String code = mailService.sendAuthenticationCodeEmail(emailRequest.getEmail());

		return new ResponseEntity(code, HttpStatus.CREATED);
	}
}
