package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMemberRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.UpdateMemberResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.MemberExistException;
import com.hobbyt.global.error.exception.MemberNotExistException;
import com.hobbyt.global.error.exception.PasswordException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

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
	public UpdateMemberResponse update(MemberDetails memberDetails, UpdateMemberRequest updateMemberRequest) {
		String email = memberDetails.getUsername();
		Member member = findMemberByEmail(email);

		Account account = updateMemberRequest.getAccount().toEntity();
		Address address = updateMemberRequest.getAddress().toEntity();

		member.update(updateMemberRequest.getEmail(), updateMemberRequest.getNickname(),
			updateMemberRequest.getDescription(),
			updateMemberRequest.getPhoneNumber(), address, account);

		return UpdateMemberResponse.of(member);
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
}
