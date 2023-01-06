package com.hobbyt.global.security.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthConstants {
	public static final String AUTH_HEADER = "Authorization";
	public static final String TOKEN_TYPE = "Bearer";
	public static final String REFRESH_TOKEN = "RefreshToken";
	public static final String BLACK_LIST = "BlackList";
}
