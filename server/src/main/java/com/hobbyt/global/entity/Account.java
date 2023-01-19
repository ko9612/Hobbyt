package com.hobbyt.global.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
public class Account {
	// 예금주
	@Column(name = "account_holder")
	private String holder;
	@Column(name = "account_bank")
	private String bank;
	@Column(name = "account_number")
	private String number;
}
