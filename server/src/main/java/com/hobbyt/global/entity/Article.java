package com.hobbyt.global.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import lombok.Getter;

@MappedSuperclass
@Getter
public abstract class Article extends BaseEntity {
	@Column(nullable = false)
	private String title;
	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String content;
	@Column
	private String thumbnailImage;
	@Column(nullable = false)
	private long viewCount;
	@Column(nullable = false)
	private long likeCount;
}
