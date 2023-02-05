package com.hobbyt.domain.order.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payments {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@Column(unique = true)
	private String impUid;

	// 아임포트 환불시 checksum 에 활용
	private int amount;    // 총 결제금액
	private int cancelAmount;    // 환불된 총 금액

	public Payments(String impUid, int amount, int cancelAmount) {
		this.impUid = impUid;
		this.amount = amount;
		this.cancelAmount = cancelAmount;
	}
}
