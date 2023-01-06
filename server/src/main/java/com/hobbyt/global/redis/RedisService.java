package com.hobbyt.global.redis;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisRefreshTokenTemplate;
	private final RedisTemplate<String, String> redisBlackListTemplate;

	public void setRefreshToken(final String key, final String value, final Long expiration) {
		ValueOperations<String, String> valueOperations = redisRefreshTokenTemplate.opsForValue();
		valueOperations.set(key, value, expiration, TimeUnit.MILLISECONDS);
	}

	public String getRefreshToken(final String key) {
		ValueOperations<String, String> valueOperations = redisRefreshTokenTemplate.opsForValue();
		return valueOperations.get(key);
	}

	public void setBlackListValues(final String key, final String value, final Long expiration) {
		ValueOperations<String, String> valueOperations = redisBlackListTemplate.opsForValue();
		valueOperations.set(key, value, expiration, TimeUnit.MILLISECONDS);
	}
}
