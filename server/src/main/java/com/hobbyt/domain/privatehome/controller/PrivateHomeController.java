package com.hobbyt.domain.privatehome.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.privatehome.service.PrivateHomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/{id}/private")
@RequiredArgsConstructor
@Validated
public class PrivateHomeController {
	private final PrivateHomeService privateHomeService;
}
