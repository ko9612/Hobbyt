package com.hobbyt.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import com.hobbyt.global.entity.Address;

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
