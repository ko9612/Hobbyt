package com.hobbyt.global.redis;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplate;

	public void setValue(final String key, final String value, final Long expiration) {
		if (expiration > 0) {
			ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
			valueOperations.set(key, value, expiration, TimeUnit.MILLISECONDS);
		}
	}

	public String getValue(final String key) {
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		return valueOperations.get(key);
	}

	public boolean isBlackList(final String key) {
		return redisTemplate.hasKey(key);
	}

	public void deleteValue(final String key) {
		redisTemplate.delete(key);
	}
}
