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
	@Column(name = "today_views")
	private int today;
	@Column(name = "total_views")
	private int total;
}
