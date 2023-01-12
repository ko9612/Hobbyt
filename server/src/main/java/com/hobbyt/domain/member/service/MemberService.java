package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Recipient;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.dto.response.ProfileResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.MemberExistException;
import com.hobbyt.global.error.exception.MemberNotExistException;
import com.hobbyt.global.error.exception.PasswordException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;

	@Transactional
	public Long createUser(SignupRequest signupRequest) {
		checkUserExist(signupRequest.getEmail());
		String profileImage = "S3 default image";    // S3의 기본 프로필 이미지
		Member member = signupRequest.toEntity(passwordEncoder, profileImage);

		return memberRepository.save(member).getId();
	}

	private void checkUserExist(String email) {
		if (memberRepository.existsByEmail(email)) {
			throw new MemberExistException();
		}
	}

	@Transactional
	public void withdraw(final String accessToken, final String email) {
		Long expiration = jwtTokenProvider.calculateExpiration(accessToken);

		redisService.deleteValue(email);

		if (expiration > 0) {
			redisService.setValue(accessToken, BLACK_LIST, expiration);
		}

		Member member = findMemberByEmail(email);
		member.withdraw();
	}

	private Member findMemberByEmail(final String email) {
		return memberRepository.findByEmail(email).orElseThrow(MemberNotExistException::new);
	}

	@Transactional
	public void updateMyInfo(String email, UpdateMyInfoRequest updateMyInfoRequest) {
		Member member = findMemberByEmail(email);

		Recipient recipient = updateMyInfoRequest.getRecipient().toEntity();
		Account account = updateMyInfoRequest.getAccount().toEntity();

		member.updateMemberInfo(updateMyInfoRequest.getPhoneNumber(), recipient, account);
	}

	@Transactional
	public void updatePassword(String email, UpdatePassword updatePassword) {
		Member member = findMemberByEmail(email);

		if (isOldPasswordEqualsNewPassword(updatePassword) || !isNewPasswordEqualsCheckPassword(updatePassword)) {
			throw new PasswordException();
		}

		member.updatePassword(passwordEncoder.encode(updatePassword.getNewPassword()));
	}

	private boolean isOldPasswordEqualsNewPassword(UpdatePassword updatePassword) {
		return updatePassword.getOldPassword().equals(updatePassword.getNewPassword());
	}

	private boolean isNewPasswordEqualsCheckPassword(UpdatePassword updatePassword) {
		return updatePassword.getNewPassword().equals(updatePassword.getCheckPassword());
	}

	public MyInfoResponse getMyInfo(final String email) {
		Member member = findMemberByEmail(email);

		MyInfoResponse myInfoResponse = MyInfoResponse.of(member);

		return myInfoResponse;
	}

	public ProfileResponse getProfile(final String email) {
		Member member = findMemberByEmail(email);

		return ProfileResponse.of(member);
	}
}
