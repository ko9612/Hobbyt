package com.hobbyt.domain.sale.entity;

import java.time.LocalDateTime;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Embeddable
public class Period {
	private LocalDateTime startedAt;
	private LocalDateTime endAt;
}
