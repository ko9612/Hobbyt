package com.hobbyt.global.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.hobbyt.global.security.member.MemberDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	public static final String CLAIM_EMAIL = "email";
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

	// redis 데이터 유효시간 지정을 위해 사용
	public Long calculateExpiration(String jws) {
		Date expiration = getClaims(jws).getBody().getExpiration();

		long now = new Date().getTime();

		return expiration.getTime() - now;
	}

	public String accessTokenAssembly(Map<String, Object> claims, String subject, Date expiration) {
		Key key = getKeyFromBase64EncodedKey(secretKey);

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setClaims(claims)
			.setSubject(subject)
			.setIssuedAt(Calendar.getInstance().getTime())
			.setExpiration(expiration)
			.signWith(key)
			.compact();
	}

	public String createAccessToken(String email, String authority) {
		Map<String, Object> claims = createClaims(email, authority);
		Date expiration = getTokenExpiration(accessTokenExpirationMinutes);

		String accessToken = accessTokenAssembly(claims, email, expiration);

		return accessToken;
	}

	private Map<String, Object> createClaims(String email, String authority) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CLAIM_EMAIL, email);
		claims.put(CLAIM_AUTHORITY, authority);

		return claims;
	}

	public String refreshTokenAssembly(String subject, Date expiration) {
		Key key = getKeyFromBase64EncodedKey(secretKey);

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setSubject(subject)
			.setIssuedAt(Calendar.getInstance().getTime())
			.setExpiration(expiration)
			.signWith(key)
			.compact();
	}

	public String createRefreshToken(String email) {
		String subject = email;
		Date expiration = getTokenExpiration(refreshTokenExpirationMinutes);

		String refreshToken = refreshTokenAssembly(subject, expiration);

		return refreshToken;
	}

	public UserDetails parseToken(String jws) {
		Claims body = getClaims(jws).getBody();

		String email = body.getSubject();
		String authority = body.get(CLAIM_AUTHORITY, String.class);

		return new MemberDetails(email, authority);
	}

	public Jws<Claims> getClaims(String jws) {
		Key key = getKeyFromBase64EncodedKey(secretKey);

		Jws<Claims> claimsJws = Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(jws);
		return claimsJws;
	}

	public String parseEmail(String jws) {
		return getClaims(jws).getBody().getSubject();
	}

	public boolean validate(String jws) {
		try {
			getClaims(jws);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			log.error("잘못된 Jwt 서명입니다.");
		} catch (ExpiredJwtException e) {
			log.error("만료된 Jwt 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			log.error("지원하지 않는 Jwt 토큰입니다.");
		} catch (IllegalArgumentException e) {
			log.error("잘못된 Jwt 토큰입니다.");
		}
		return false;
	}
}
