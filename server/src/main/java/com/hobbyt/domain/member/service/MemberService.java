package com.hobbyt.domain.member.service;

import static com.hobbyt.domain.member.entity.MemberStatus.*;
import static com.hobbyt.global.error.exception.ExceptionCode.*;
import static com.hobbyt.global.security.constants.AuthConstants.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;

	public Long createMember(SignupRequest signupRequest) {
		checkEmailDuplicated(signupRequest.getEmail());
		checkNicknameDuplicated(signupRequest.getNickname());

		String profileImage = DefaultImage.profile.getValue();    // 기본 프로필 이미지
		String headerImage = DefaultImage.header.getValue();    // 기본 헤더 이미지
		createOrRejoin(signupRequest, profileImage, headerImage);

		return findMemberByEmail(signupRequest.getEmail()).getId();
	}

	private void createOrRejoin(SignupRequest signupRequest, String profileImage, String headerImage) {
		memberRepository.findByEmailAndStatus(signupRequest.getEmail(), WITHDRAWAL).ifPresentOrElse(
			member -> {
				member.rejoin(passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getNickname());
			},
			() -> {
				Member member = signupRequest.toEntity(passwordEncoder, profileImage, headerImage);
				memberRepository.save(member);
			}
		);
	}

	private void checkNicknameDuplicated(String nickname) {
		if (memberRepository.existsByNicknameAndStatus(nickname, MEMBER)) {
			throw new BusinessLogicException(MEMBER_NICKNAME_DUPLICATED);
		}
	}

	private void checkEmailDuplicated(String email) {
		if (memberRepository.existsByEmailAndStatus(email, MEMBER)) {
			throw new BusinessLogicException(MEMBER_EMAIL_DUPLICATED);
		}
	}

	public void withdraw(final String accessToken, final String email) {
		Long expiration = jwtTokenProvider.calculateExpiration(accessToken);

		redisService.deleteValue(email);

		if (expiration > 0) {
			redisService.setValue(accessToken, BLACK_LIST, expiration);
		}

		Member member = findMemberByEmail(email);
		member.withdraw();
	}

	public void updateMyInfo(final String email, final UpdateMyInfoRequest updateMyInfoRequest) {
		Member member = findMemberByEmail(email);

		Recipient recipient = updateMyInfoRequest.getRecipient().toEntity();
		Account account = updateMyInfoRequest.getAccount().toEntity();

		member.updateMemberInfo(updateMyInfoRequest.getPhoneNumber(), recipient, account);
	}

	public void updatePassword(final String email, final UpdatePassword updatePassword) {
		Member member = findMemberByEmail(email);

		checkUpdatePassword(updatePassword, member.getPassword());

		member.updatePassword(passwordEncoder.encode(updatePassword.getNewPassword()));
	}

	private void checkUpdatePassword(UpdatePassword updatePassword, String memberPassword) {
		if (isOldPasswordEqualsNewPassword(updatePassword)
			|| !isNewPasswordEqualsCheckPassword(updatePassword)
			|| !isCorrectPassword(updatePassword.getOldPassword(), memberPassword)) {
			throw new BusinessLogicException(AUTH_INVALID_PASSWORD);
		}
	}

	private boolean isCorrectPassword(String password, String memberPassword) {
		return passwordEncoder.matches(password, memberPassword);
	}

	private boolean isOldPasswordEqualsNewPassword(UpdatePassword updatePassword) {
		return updatePassword.getOldPassword().equals(updatePassword.getNewPassword());
	}

	private boolean isNewPasswordEqualsCheckPassword(UpdatePassword updatePassword) {
		return updatePassword.getNewPassword().equals(updatePassword.getCheckPassword());
	}

	public Member findMemberByEmail(final String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessLogicException((MEMBER_NOT_FOUND)));
	}

	public Member findMemberById(Long id) {
		return memberRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
	}
}
