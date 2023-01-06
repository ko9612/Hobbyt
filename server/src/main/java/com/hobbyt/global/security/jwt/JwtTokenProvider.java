package com.hobbyt.global.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hobbyt.domain.member.entity.Authority;

import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	private static final String CLAIM_EMAIL = "email";
	private static final String CLAIM_AUTHORITY = "authority";

	@Value("${jwt.secret-key}")
	private String secretKey;

	@Value("${jwt.access-token-expiration-minutes}")
	private int accessTokenExpirationMinutes;

	@Value("${jwt.refresh-token-expiration-minutes}")
	private int refreshTokenExpirationMinutes;

	//secretKey 암호화
	@PostConstruct
	protected void init() {
		secretKey = Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
	}

	//secretKey 복호화
	private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
		byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
		Key key = Keys.hmacShaKeyFor(keyBytes);

		return key;
	}

	//만료시간 구하는 메서드
	public Date getTokenExpiration(int expirationMinutes) {
		Calendar now = Calendar.getInstance();
		now.add(Calendar.MINUTE, expirationMinutes);
		Date expiration = now.getTime();

		return expiration;
	}

	public String accessTokenAssembly(Map<String, Object> claims, String subject, Date expiration) {
		Key key = getKeyFromBase64EncodedKey(secretKey);

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setClaims(claims)
			.setSubject(subject)
			.setIssuedAt(Calendar.getInstance().getTime())
			.setExpiration(expiration)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String createAccessToken(String email, Authority authority) {
		Map<String, Object> claims = createClaims(email, authority);
		Date expiration = getTokenExpiration(accessTokenExpirationMinutes);

		String accessToken = accessTokenAssembly(claims, email, expiration);

		return accessToken;
	}

	private Map<String, Object> createClaims(String email, Authority authority) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CLAIM_EMAIL, email);
		claims.put(CLAIM_AUTHORITY, authority.toString());

		return claims;
	}

	public String refreshTokenAssembly(String subject, Date expiration) {
		Key key = getKeyFromBase64EncodedKey(secretKey);

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setSubject(subject)
			.setIssuedAt(Calendar.getInstance().getTime())
			.setExpiration(expiration)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String createRefreshToken(String email) {
		String subject = email;
		Date expiration = getTokenExpiration(refreshTokenExpirationMinutes);

		String refreshToken = refreshTokenAssembly(subject, expiration);

		return refreshToken;
	}
}
