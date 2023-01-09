package com.hobbyt.util;

import com.hobbyt.domain.member.entity.Authority;

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
	public static final String EMAIL = "test@gmail.com";
	public static final String PASSWORD = "1234";
	public static final Authority USER_AUTHORITY = Authority.ROLE_USER;
	public static final Authority ADMIN_AUTHORITY = Authority.ROLE_ADMIN;
}
