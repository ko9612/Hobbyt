package com.hobbyt.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Views {
	@Column(name = "today_views", nullable = false)
	private int today = 0;
	@Column(name = "total_views", nullable = false)
	private int total = 0;

	public void increaseViewCount() {
		this.today++;
		this.total++;
	}
}
