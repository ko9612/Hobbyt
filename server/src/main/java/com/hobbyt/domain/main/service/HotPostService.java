package com.hobbyt.domain.main.service;

import org.springframework.stereotype.Service;

import com.hobbyt.domain.main.repository.HotPostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotPostService {
	private HotPostRepository hotPostRepository;
}
