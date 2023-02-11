package com.hobbyt.global.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
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
