package com.hobbyt.domain.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.domain.user.entity.User;
import com.hobbyt.global.entity.Article;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sale extends Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private User writer;

	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String refundPolicy;

	@Embedded
	@Column(nullable = false)
	private Period period;

	@Column(nullable = false)
	private Account account;
}
