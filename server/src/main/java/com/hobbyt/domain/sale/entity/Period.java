package com.hobbyt.domain.sale.entity;

import java.time.LocalDate;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Period {
	private LocalDate startedAt;
	private LocalDate endAt;
}
