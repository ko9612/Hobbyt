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
	private long viewCount = 0;
	@Column(nullable = false)
	private long likeCount = 0;

	public void updateTitle(String title) {
		this.title = title;
	}

	public void updateContent(String content) {
		this.content = content;
	}

	public void updateLikeCount(int count) {
		if (likeCount + count < 0) {
			return;
		}

		likeCount += count;
	}

	public void increaseViewCount() {
		viewCount++;
	}

}
