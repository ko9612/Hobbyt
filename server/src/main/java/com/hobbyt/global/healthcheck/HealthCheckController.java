package com.hobbyt.global.healthcheck;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {
	// 서비스 연결상태 확인을 위한 api
	@GetMapping("/healthcheck")
	public ResponseEntity<String> healthcheck() {
		return ResponseEntity.ok("Service is health");
	}
}
