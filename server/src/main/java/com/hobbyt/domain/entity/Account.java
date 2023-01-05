package com.hobbyt.domain.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Account {
	@Column(name = "account_bank")
	private String bank;
	@Column(name = "account_number")
	private String number;
}
