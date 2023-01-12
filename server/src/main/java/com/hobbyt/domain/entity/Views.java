package com.hobbyt.domain.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class Views {
	@Column(name = "today_views", nullable = false)
	private int today = 0;
	@Column(name = "total_views", nullable = false)
	private int total = 0;
}
