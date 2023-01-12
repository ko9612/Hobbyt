package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.dto.response.ProfileResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.MemberExistException;
import com.hobbyt.global.error.exception.PasswordException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
	@Mock
	private MemberRepository memberRepository;
	@Mock
	private PasswordEncoder passwordEncoder;
	@Mock
	private JwtTokenProvider jwtTokenProvider;
	@Mock
	private RedisService redisService;
	@InjectMocks
	private MemberService memberService;

	@DisplayName("정상 회원가입")
	@Test
	public void create_user() {
		//given
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		given(memberRepository.existsByEmail(anyString())).willReturn(false);
		given(memberRepository.save(any(Member.class))).willReturn(member);

		//when
		Long id = memberService.createUser(signupRequest);

		//then
		// TODO argThat 부분 모든 값 비교하게끔?
		assertThat(id).isEqualTo(member.getId());
		then(memberRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(EMAIL)));
		then(memberRepository).should(times(1))
			.save(argThat(user -> user.getEmail().equals(EMAIL)));
	}

	@DisplayName("UserExistException 예외: 중복 회원 존재")
	@Test
	public void validate_duplication_by_email() {
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		willThrow(MemberExistException.class).given(memberRepository).existsByEmail(anyString());

		assertThatThrownBy(() -> memberService.createUser(signupRequest))
			.isInstanceOf(MemberExistException.class);

		then(memberRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(EMAIL)));
	}

	@DisplayName("회원 탈퇴")
	@Test
	void withdraw() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));

		memberService.withdraw(ACCESS_TOKEN, EMAIL);

		assertThat(member.getStatus()).isEqualTo(MemberStatus.WITHDRAWAL);
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1)).deleteValue(argThat(key -> key.equals(EMAIL)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(BLACK_LIST)),
				argThat(timeout -> timeout == TIMEOUT));
		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
	}

	@DisplayName("회원정보 변경")
	@Test
	void update() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		UpdateMyInfoRequest updateMyInfoRequest = dummyUpdateMyInfoRequest(PHONE_NUMBER, NAME, PHONE_NUMBER, ZIPCODE,
			STREET, DETAIL, NAME, BANK, ACCOUNT_NUMBER);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));

		memberService.updateMyInfo(EMAIL, updateMyInfoRequest);

		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
	}

	@DisplayName("정상 비밀번호 변경")
	@Test
	void update_password() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		given(memberRepository.findByEmail(EMAIL)).willReturn(Optional.of(member));
		UpdatePassword updatePassword = dummyUpdatePassword(PASSWORD, NEW_PASSWORD, NEW_PASSWORD);
		given(passwordEncoder.encode(anyString())).willReturn(ENCODED_PASSWORD);

		memberService.updatePassword(EMAIL, updatePassword);

		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
		assertThat(member.getPassword()).isEqualTo(ENCODED_PASSWORD);
	}

	@DisplayName("PasswordException 예외: 이전 pw와 새로운 pw가 같은 경우, 새로운 pw와 체크용 pw가 다른경우")
	@ParameterizedTest(name = "{index} => old: {0}, new: {1}, check: {2}")
	@CsvSource(value = {"1234:1234:1234", "1234:12345:123456"}, delimiter = ':')
	void exception_update_password(String oldPassword, String newPassword, String checkPassword) {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		given(memberRepository.findByEmail(EMAIL)).willReturn(Optional.of(member));
		UpdatePassword updatePassword = dummyUpdatePassword(oldPassword, newPassword, checkPassword);

		assertThatThrownBy(() -> memberService.updatePassword(EMAIL, updatePassword))
			.isInstanceOf(PasswordException.class);
		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
	}

	@DisplayName("내 정보 관리의 내용 조회")
	@Test
	void get_my_info_Details() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD, DESCRIPTION, PHONE_NUMBER);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));
		MyInfoResponse myInfoResponse = dummyMyInfoResponse(PHONE_NUMBER);

		MyInfoResponse result = memberService.getMyInfo(EMAIL);

		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
		assertThat(result).usingRecursiveComparison().isEqualTo(myInfoResponse);
	}

	@DisplayName("프로필 조회")
	@Test
	void get_profile() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD, DESCRIPTION, PHONE_NUMBER);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));
		ProfileResponse profileResponse = dummyProfileResponse(NICKNAME, DESCRIPTION);

		ProfileResponse result = memberService.getProfile(EMAIL);

		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
		assertThat(result).usingRecursiveComparison().isEqualTo(profileResponse);
	}
}