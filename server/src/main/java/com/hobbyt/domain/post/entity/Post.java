package com.hobbyt.domain.post.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.entity.Article;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post extends Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private Boolean isPublic = true;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private Member writer;

	public static Post of(String title, String content, String thumbnailImage, boolean isPublic) {
		Post post = new Post();
		post.updateTitle(title);
		post.updateContent(content);
		post.updateThumbnailImage(thumbnailImage);
		post.updateIsPublic(isPublic);

		return post;
	}

	public void setWriter(Member writer) {
		if (this.writer != null) {
			throw new RuntimeException("Writer Already Exist. Writer Not Changed");
		}

		this.writer = writer;
	}

	public void updateIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
}
