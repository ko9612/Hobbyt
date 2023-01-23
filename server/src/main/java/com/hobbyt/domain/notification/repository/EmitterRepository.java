package com.hobbyt.domain.notification.repository;

import java.util.Optional;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {
	SseEmitter save(Long memberId, SseEmitter emitter);

	Optional<SseEmitter> get(Long memberId);

	void deleteByMemberId(Long memberId);
}
