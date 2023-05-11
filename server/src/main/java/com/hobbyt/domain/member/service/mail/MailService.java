package com.hobbyt.domain.member.service.mail;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.member.service.code.CodeGenerator;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
	private final MailerSender mailerSender;
	private final HtmlTemplate htmlTemplate;
	private final CodeGenerator codeGenerator;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberService memberService;

	public String sendCodeEmail(final String email) {
		String code = codeGenerator.generate();
		Map<String, Object> contents = fillAuthCodeMailContents(code);
		String message = htmlTemplate.build("codeMail", contents);
		Email authCodeEmail = Email.of(email, "Hobbyt 인증 코드", message);

		mailerSender.sendMail(authCodeEmail);

		return code;
	}

	private Map<String, Object> fillAuthCodeMailContents(final String code) {
		Map<String, Object> contents = new HashMap<>();
		contents.put("code", code);
		return contents;
	}

	public void sendPasswordEmail(final String email) {
		Member member = memberService.findMemberByEmail(email);
		String accessToken = jwtTokenProvider.createAccessToken(email, member.getAuthority().toString());
		String targetUrl = "https://hobbyt.vercel.app/repassword?token=";
		String link = targetUrl + accessToken;

		Map<String, Object> contents = new HashMap<>();
		contents.put("link", link);

		String message = htmlTemplate.build("passwordMail", contents);

		Email passwordEmail = Email.of(email, "비밀번호 변경 메일", message);

		mailerSender.sendMail(passwordEmail);
	}
}
