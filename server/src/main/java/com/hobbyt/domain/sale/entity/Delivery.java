package com.hobbyt.domain.sale.entity;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class Delivery {
	private int deliveryTime;
	private String deliveryCompany;
	private int deliveryPrice;
}
