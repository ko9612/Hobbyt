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
public class Address {
	private String zipcode;
	@Column(name = "street_address")
	private String street;
	@Column(name = "detail_address")
	private String detail;
}
