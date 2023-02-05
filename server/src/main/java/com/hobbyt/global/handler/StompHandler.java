package com.hobbyt.global.handler;

import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
	private JwtTokenProvider jwtTokenProvider;
}
