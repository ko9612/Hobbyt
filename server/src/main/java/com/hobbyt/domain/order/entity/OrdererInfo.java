package com.hobbyt.domain.order.entity;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class OrdererInfo {
	private String name;
	private String phoneNumber;
	private String email;
}
