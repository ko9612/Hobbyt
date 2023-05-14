package com.hobbyt.global.security.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.Objects;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
import com.hobbyt.domain.member.entity.Provider;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.member.service.DefaultImage;
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
@Transactional
@RequiredArgsConstructor
public class OAuth2DetailsService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private static final String pattern = "\\S{1,6}";
	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();

		OAuth2User oAuth2User = delegate.loadUser(oAuth2UserRequest); // OAuth2서버에서 받아온 유저정보를 넣어준다.
		OAuth2UserInfo oAuth2UserInfo = null;

		// registrationId -> 기업을 구분한다.
		String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();

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

		if (!memberRepository.existsByEmail(email)) {
			saveMember(email, name, provider, providerId);
		}

		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new OAuth2AuthenticationProcessingException("MEMBER_NOT_FOUND"));

		if (member.getStatus().equals(MemberStatus.WITHDRAWAL)) {
			member.rejoinSocial(provider, providerId);
		}

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
		while (isWrongNickname(nickname)) {
			String uuid = UUID.randomUUID().toString();
			nickname = uuid.substring(6);
		}

		Member member = Member.builder().email(email)
			.nickname(nickname)
			.provider(provider)
			.providerId(providerId)
			.profileImage(DefaultImage.profile.getValue())
			.headerImage(DefaultImage.header.getValue())
			.build();

		memberRepository.save(member);
	}

	private boolean isWrongNickname(String nickname) {
		return !Pattern.matches(pattern, nickname) || memberRepository.existsByNickname(nickname);
	}
}