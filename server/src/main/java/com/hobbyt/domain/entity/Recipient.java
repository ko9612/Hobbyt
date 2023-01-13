package com.hobbyt.domain.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class Recipient {
	// 수령자명
	@Column(name = "recipient_name")
	private String name;

	// 수령자 연락처
	@Column(name = "recipient_phone_number")
	private String phoneNumber;

	@Embedded
	private Address address;
}
