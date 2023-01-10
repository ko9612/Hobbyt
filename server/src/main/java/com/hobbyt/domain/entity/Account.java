package com.hobbyt.domain.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Account {
	@Column(name = "account_bank")
	private String bank;
	@Column(name = "account_number")
	private String number;
}
