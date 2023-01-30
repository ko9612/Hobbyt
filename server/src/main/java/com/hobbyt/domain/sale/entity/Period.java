package com.hobbyt.domain.sale.entity;

import java.time.LocalDate;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Embeddable
public class Period {
	private LocalDate startedAt;
	private LocalDate endAt;
}
