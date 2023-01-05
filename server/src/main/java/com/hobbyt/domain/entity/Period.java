package com.hobbyt.domain.entity;

import java.time.LocalDateTime;

import javax.persistence.Embeddable;

@Embeddable
public class Period {
	private LocalDateTime startedAt;
	private LocalDateTime endAt;
}
