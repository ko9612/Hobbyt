package com.hobbyt.util;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.domain.entity.Recipient;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.dto.response.ProfileResponse;
import com.hobbyt.domain.member.entity.Authority;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TestUtil {
	// Token
	public static final String ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdHkiOiJST0xFX1VTRVIiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NzMyNDc5NDEsImV4cCI6MTY3MzQyOTc0MX0.N_TofZp0H_3uo_7m4FJTjMHwxZ1FItVTetV-fWksFDA";
	public static final String REFRESH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY3MzI0Nzk0MSwiZXhwIjo2MjE1Mzg1Mjc0MX0.IdpUwnpfusZcCD0ZkiafFzsiovr1puoNxgCYzsh2XSY";
	public static final String REISSUED_ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdHkiOiJST0xFX1VTRVIiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NzMyNDc5OTYsImV4cCI6MTY3MzQyOTc5Nn0.UN88RuEwd70MLPAOBugn1uRfPQIzztdSkDbC4CmgUK4";
	public static final String REISSUED_REFRESH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY3MzI0Nzk5NiwiZXhwIjo2MjE1Mzg1Mjc5Nn0.bO2HCrRtbRgdFkkQXsARpvEkhscDOLAOAtlhUYXZwOU";
	public static final Long TIMEOUT = 1000L;

	// Member
	public static final Long MEMBER_ID = 1L;
	public static final String NICKNAME = "test";
	public static final String EMAIL = "test@gmail.com";
	public static final String PASSWORD = "1234";
	public static final String NEW_PASSWORD = "12345678";
	public static final String ENCODED_PASSWORD = "{bcrypt}$2a$10$r3VAdb9nKwIUZ.1CYMO8D.iZjzqFE69mVP./xuNRMtvmxPH.KGyTO";
	public static final Authority USER_AUTHORITY = Authority.ROLE_USER;
	public static final Authority ADMIN_AUTHORITY = Authority.ROLE_ADMIN;
	public static final String PROFILE_IMAGE = "default image";
	public static final String DESCRIPTION = "안녕하세요~~~";
	public static final String PHONE_NUMBER = "010-1234-5678";
	public static final String ZIPCODE = "우편번호";
	public static final String STREET = "도로명 주소";
	public static final String DETAIL = "상세주소";
	public static final String BANK = "OO은행";
	public static final String ACCOUNT_NUMBER = "000-000000-00-000";
	public static final String NAME = "홍길동";

	public static Member dummyMember(Long id, String nickname, String email, String password) {
		return Member.builder().id(id).nickname(nickname).email(email).password(password).build();
	}

	public static Member dummyMember(Long id, String nickname, String email, String password, String description,
		String phoneNumber) {

		return Member.builder()
			.id(id)
			.nickname(nickname)
			.email(email)
			.password(password)
			.description(description)
			.phoneNumber(phoneNumber)
			.build();
	}

	public static MemberDetails dummyMemberDetails(Long id, String nickname, String email, String password) {
		return MemberDetails.of(dummyMember(id, nickname, email, password));
	}

	public static UpdateMyInfoRequest dummyUpdateMyInfoRequest(String phoneNumber, String recipientName,
		String recipientPhoneNumber, String zipcode, String street, String detail, String accountHolder, String bank,
		String accountNumber) {

		return UpdateMyInfoRequest.builder()
			.phoneNumber(phoneNumber)
			.recipient(new Recipient(recipientName, recipientPhoneNumber, new Address(zipcode, street, detail)))
			.account(new Account(accountHolder, bank, accountNumber))
			.build();
	}

	public static MyInfoResponse dummyMyInfoResponse(String phoneNumber, String recipientName,
		String recipientPhoneNumber, String zipcode, String street, String detail, String accountHolder, String bank,
		String accountNumber) {

		return MyInfoResponse.builder()
			.phoneNumber(phoneNumber)
			.recipient(new Recipient(recipientName, recipientPhoneNumber, new Address(zipcode, street, detail)))
			.account(new Account(accountHolder, bank, accountNumber))
			.build();
	}

	public static MyInfoResponse dummyMyInfoResponse(String phoneNumber) {

		return MyInfoResponse.builder()
			.phoneNumber(phoneNumber)
			.build();
	}

	public static UpdatePassword dummyUpdatePassword(String oldPassword, String newPassword, String checkPassword) {
		return new UpdatePassword(oldPassword, newPassword, checkPassword);
	}

	public static ProfileResponse dummyProfileResponse(String nickname, String description) {
		return ProfileResponse.builder().nickname(nickname).description(description).build();
	}
}
