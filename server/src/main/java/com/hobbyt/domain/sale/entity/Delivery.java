package com.hobbyt.domain.sale.entity;

import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Delivery {
	private String deliveryTime;
	private String deliveryCompany;
	private String deliveryPrice;
}