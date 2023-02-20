package com.hobbyt.global.security.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

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
import com.hobbyt.global.exception.BusinessLogicException;
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

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();

		OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth2서버에서 받아온 유저정보를 넣어준다.
		OAuth2UserInfo oAuth2UserInfo = null;

		String registrationId = userRequest.getClientRegistration().getRegistrationId(); // registrationId -> 기업을 구분한다.

		log.info("============ attribute: {}", oAuth2User.getAttributes());
		log.info("============ userNameAttributeName: {}",
			userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName());
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

		return MemberDetails.of(member.getEmail(), member.getAuthority().toString(), oAuth2User.getAttributes());
	}

	private Member findMemberByEmailAndNotWithdrawal(String email) {
		// memberRepository.findByEmail(email).orElseThrow(MemberNotExistException::new);

		return memberRepository.findByEmailAndStatusNot(email, MemberStatus.WITHDRAWAL)
			.orElseThrow(() -> new BusinessLogicException((MEMBER_NOT_FOUND)));
	}

	private void saveMember(String email, String nickname, Provider provider, String providerId) {
		if (memberRepository.existsByNickname(nickname)) {
			nickname = UUID.randomUUID().toString();
		}

		Member member = Member.builder().email(email)
			.nickname(nickname)
			// .password(UUID.randomUUID().toString())
			.provider(provider)
			.providerId(providerId)
			.profileImage("default profileImage")
			.headerImage("default headerImage")
			.build();

		memberRepository.save(member);
	}
}