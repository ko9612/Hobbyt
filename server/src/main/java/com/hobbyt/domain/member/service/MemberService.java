package com.hobbyt.domain.member.service;

import static com.hobbyt.global.exception.ExceptionCode.*;
import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.follow.repository.FollowRepository;
import com.hobbyt.domain.member.dto.request.ProfileRequest;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.dto.response.ProfileResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.exception.BusinessLogicException;
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
	private final FollowRepository followRepository;

	@Transactional
	public Long createUser(SignupRequest signupRequest) {
		checkUserExist(signupRequest.getEmail());
		String profileImage = "S3 default profile image";    // S3의 기본 프로필 이미지
		String headerImage = "S3 default header image";    // S3의 기본 헤더 이미지
		// 기본 이미지 저장 s3Service 이용해서 이미지 저장
		Member member = signupRequest.toEntity(passwordEncoder, profileImage, headerImage);

		return memberRepository.save(member).getId();
	}

	private void checkUserExist(String email) {
		if (memberRepository.existsByEmail(email)) {
			throw new BusinessLogicException(MEMBER_EMAIL_DUPLICATED);
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

	public Member findMemberByEmail(final String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessLogicException((MEMBER_NOT_FOUND)));
	}

	public Long findMemberIdByEmail(String email) {
		return findMemberByEmail(email).getId();
	}

	@Transactional
	public void updateMyInfo(final String email, final UpdateMyInfoRequest updateMyInfoRequest) {
		Member member = findMemberByEmail(email);

		Recipient recipient = updateMyInfoRequest.getRecipient().toEntity();
		Account account = updateMyInfoRequest.getAccount().toEntity();

		member.updateMemberInfo(updateMyInfoRequest.getPhoneNumber(), recipient, account);
	}

	@Transactional
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

	// TODO 단순히 Member -> DTO 로 변환해주는 메소드인데 굳이 Service 내부에서 할필요가?
	public MyInfoResponse getMyInfo(final String email) {
		Member member = findMemberByEmail(email);

		return MyInfoResponse.of(member);
	}

	public ProfileResponse getProfile(final Long targetMemberId, MemberDetails loginMember) {
		Member targetMember = findMemberById(targetMemberId);
		ProfileResponse profileResponse = ProfileResponse.of(targetMember);

		if (loginMember != null) {
			String email = loginMember.getEmail();
			Member myInfo = findMemberByEmail(email);
			profileResponse.setIsFollowing(isFollowing(targetMemberId, myInfo));
		}

		return profileResponse;
	}

	private Boolean isFollowing(Long targetMemberId, Member myInfo) {
		if (targetMemberId != myInfo.getId()) {
			List<Long> myFollowingId = followRepository.findFollowingIdByMember(myInfo);
			return myFollowingId.contains(targetMemberId);
		}

		return null;
	}

	public Member findMemberById(Long id) {
		return memberRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
	}

	@Transactional
	public void updateProfile(final String email, final ProfileRequest profileRequest,
		final MultipartFile profileImage, final MultipartFile headerImage) {

		Member member = findMemberByEmail(email);

		// TODO S3 에서 기존의 이미지를 새로 업로드한 이미지로 변경
		// S3 내부에서 이미지 null 체크
		// String path = s3Service.updateImage(List.of(member.getProfileImage(), member.getHeaderImage()), List.of(profileImage, headerImage));

		member.updateProfile(profileRequest.getNickname(), profileRequest.getDescription());
	}
}
