package com.hobbyt.domain.member.service;

import static com.hobbyt.domain.member.entity.MemberStatus.*;
import static com.hobbyt.global.exception.ExceptionCode.*;
import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.file.service.FileService;
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

@Service
@Transactional(readOnly = true)
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;
	private final FollowRepository followRepository;
	private final FileService fileService;
	private final String path;

	public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
		JwtTokenProvider jwtTokenProvider, RedisService redisService, FollowRepository followRepository,
		FileService fileService, @Value("${hostname}") String hostname) {

		this.memberRepository = memberRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
		this.redisService = redisService;
		this.followRepository = followRepository;
		this.fileService = fileService;
		this.path = hostname + "api/images/";
	}

	@Transactional
	public Long createUser(SignupRequest signupRequest) {
		checkEmailDuplicated(signupRequest.getEmail());
		checkNicknameDuplicated(signupRequest.getNickname());

		String profileImage = path + "default profile image";    // 기본 프로필 이미지
		String headerImage = path + "default header image";    // 기본 헤더 이미지
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
	public void updateProfile(final String email, final ProfileRequest profileRequest) {

		Member member = findMemberByEmail(email);
		MultipartFile profileImage = profileRequest.getProfileImage();
		MultipartFile headerImage = profileRequest.getHeaderImage();
		String profileImageUrl = path + fileService.saveImage(profileImage);
		String headerImageUrl = path + fileService.saveImage(headerImage);

		member.updateProfile(profileRequest.getNickname(), profileRequest.getDescription(),
			profileImageUrl, headerImageUrl);
	}
}
