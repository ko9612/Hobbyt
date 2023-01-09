package com.hobbyt.domain.healthcheck;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {
	// 서비스 연결상태 확인을 위한 api
	@GetMapping("/healthcheck")
	public ResponseEntity healthcheck() {
		return new ResponseEntity("service is health", HttpStatus.OK);
	}
}
