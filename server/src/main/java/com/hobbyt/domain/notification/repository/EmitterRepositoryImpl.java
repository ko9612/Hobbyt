package com.hobbyt.domain.notification.repository;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class EmitterRepositoryImpl implements EmitterRepository {
	private final ConcurrentHashMap<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

	@Override
	public SseEmitter save(Long memberId, SseEmitter emitter) {
		emitterMap.put(memberId, emitter);

		return emitter;
	}

	@Override
	public Optional<SseEmitter> get(Long memberId) {
		return Optional.ofNullable(emitterMap.get(memberId));
	}

	@Override
	public void deleteByMemberId(Long memberId) {
		emitterMap.remove(memberId);
	}
}
