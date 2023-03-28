package com.hobbyt.global.security.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.Objects;
import java.util.UUID;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
import com.hobbyt.domain.member.entity.Provider;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.error.exception.OAuth2AuthenticationProcessingException;
import com.hobbyt.global.security.member.MemberDetails;
import com.hobbyt.global.security.oauth2.GoogleUserInfo;
import com.hobbyt.global.security.oauth2.KakaoUserInfo;
import com.hobbyt.global.security.oauth2.NaverUserInfo;
import com.hobbyt.global.security.oauth2.OAuth2UserInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2DetailsService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final MemberRepository memberRepository;
	private final String path = "/api/images/";
	private final String defaultProfileImage = "a30a68de-0bab-45c0-93ec-1802de8c62ed.jpg";
	private final String defaultHeaderImage = "e048f178-9a96-4f59-a6e9-8991abb700d7.jpg";

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();

		OAuth2User oAuth2User = delegate.loadUser(oAuth2UserRequest); // OAuth2서버에서 받아온 유저정보를 넣어준다.
		OAuth2UserInfo oAuth2UserInfo = null;

		String registrationId = oAuth2UserRequest.getClientRegistration()
			.getRegistrationId(); // registrationId -> 기업을 구분한다.

		log.info("============ attribute: {}", oAuth2User.getAttributes());
		log.info("============ userNameAttributeName: {}",
			oAuth2UserRequest.getClientRegistration()
				.getProviderDetails()
				.getUserInfoEndpoint()
				.getUserNameAttributeName());
		log.info("============ registrationId: {}", registrationId);

		if (registrationId.equals("google")) {
			oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
		} else if (registrationId.equals("kakao")) {
			oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
		} else if (registrationId.equals("naver")) {
			oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
		}

		String email = oAuth2UserInfo.getEmail();
		String name = oAuth2UserInfo.getName();
		Provider provider = oAuth2UserInfo.getProvider();
		String providerId = oAuth2UserInfo.getProviderId();

		// TODO 같은 이메일 다른 플랫폼으로 접속하는 경우 처리
		// TODO 회원탈퇴 후 다시 접속하는 경우 처리
		// 첫 로그인이면 회원가입, 아니면 지나게가 될 것.
		if (!memberRepository.existsByEmail(email)) {
			saveMember(email, name, provider, providerId);
		}

		Member member = findMemberByEmailAndNotWithdrawal(email);

		checkMemberProvider(registrationId, member.getProvider());

		return MemberDetails.of(member.getEmail(), member.getAuthority().toString(), oAuth2User.getAttributes());
	}

	private void checkMemberProvider(String currentProvider, Provider provider) {
		if (Objects.isNull(provider) || !isSameProvider(currentProvider, provider)) {
			throw new OAuth2AuthenticationProcessingException(
				"current provider is " + currentProvider + ". your provider is " + provider);
		}
	}

	private boolean isSameProvider(String currentProvider, Provider provider) {
		return provider.equals(Provider.valueOf(currentProvider));
	}

	private Member findMemberByEmailAndNotWithdrawal(String email) {
		return memberRepository.findByEmailAndStatusNot(email, MemberStatus.WITHDRAWAL)
			.orElseThrow(() -> new BusinessLogicException((MEMBER_NOT_FOUND)));
	}

	private void saveMember(String email, String nickname, Provider provider, String providerId) {
		String profileImage = path + defaultProfileImage;    // 기본 프로필 이미지
		String headerImage = path + defaultHeaderImage;    // 기본 헤더 이미지

		if (memberRepository.existsByNickname(nickname)) {
			nickname = UUID.randomUUID().toString();
		}

		Member member = Member.builder().email(email)
			.nickname(nickname)
			.provider(provider)
			.providerId(providerId)
			.profileImage(profileImage)
			.headerImage(headerImage)
			.build();

		memberRepository.save(member);
	}
}