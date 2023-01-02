package com.hobbyt.post.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.hobbyt.global.entity.Article;

public class Post extends Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
}
