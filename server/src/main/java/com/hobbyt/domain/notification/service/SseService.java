package com.hobbyt.domain.notification.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.notification.dto.NotificationResponse;
import com.hobbyt.domain.notification.entity.Notification;
import com.hobbyt.domain.notification.repository.EmitterRepository;
import com.hobbyt.global.exception.SseConnectException;

@Service
public class SseService {
	private final MemberService memberService;
	private final EmitterRepository emitterRepository;
	private final Long DEFAULT_TIMEOUT;
	private final String DEFAULT_EVENT_NAME;

	public SseService(MemberService memberService,
		EmitterRepository emitterRepository,
		@Value("${SSE_DEFAULT_TIMEOUT}") Long DEFAULT_TIMEOUT,
		@Value("${SSE_DEFAULT_EVENT_NAME}") String DEFAULT_EVENT_NAME) {
		this.memberService = memberService;
		this.emitterRepository = emitterRepository;
		this.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
		this.DEFAULT_EVENT_NAME = DEFAULT_EVENT_NAME;
	}

	public void send(Long memberId, Notification notification) {
		emitterRepository.get(memberId).ifPresent(
			emitter -> {
				try {
					emitter.send(
						SseEmitter.event()
							.id(notification.getId().toString())
							.name(DEFAULT_EVENT_NAME)
							.data(NotificationResponse.Alarm.from(notification))
					);

				} catch (IOException exception) {
					throw new SseConnectException("Connection is Failed");
				}
			}
		);
	}

	public SseEmitter connect(String email) {
		SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
		Long memberId = memberService.findMemberIdByEmail(email);
		emitterRepository.save(memberId, emitter);

		emitter.onCompletion(() -> close(memberId));
		emitter.onTimeout(() -> close(memberId));

		try {
			emitter.send(
				SseEmitter.event()
					.name(DEFAULT_EVENT_NAME)
					.data("Connection is successful!"));

		} catch (IOException exception) {
			throw new SseConnectException("Connection is failed");
		}

		return emitter;
	}

	public void close(Long memberId) {
		emitterRepository.deleteByMemberId(memberId);
	}

}
