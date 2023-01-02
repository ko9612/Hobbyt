package com.hobbyt.domain.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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

	@Column(nullable = false)
	private LocalDateTime startedAt;
	@Column(nullable = false)
	private LocalDateTime endAt;
	@Column(nullable = false)
	private String accountBank;
	@Column(nullable = false)
	private String accountNumber;
}
