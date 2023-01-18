package com.hobbyt.domain.post.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPostComment.*;
import static com.hobbyt.domain.post.entity.QPostTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.post.dto.PostResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Transactional(readOnly = true)
@Slf4j
public class CustomPostRepositoryImpl implements CustomPostRepository {
	private final JPAQueryFactory queryFactory;

	public CustomPostRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<PostResponse.CommentBox> getPostCommentsByPostId(Long postId) {
		return queryFactory
			.select(Projections.fields(PostResponse.CommentBox.class,
				postComment.id,
				postComment.content,
				postComment.createdAt,
				member.id.as("writerId"),
				member.nickname,
				member.profileImage
			))
			.from(postComment)
			.join(postComment.writer, member)
			.where(postComment.post.id.eq(postId))
			.fetch();
	}

	@Override
	public List<String> getTagsByPostId(Long postId) {
		// return new ArrayList<>();
		return queryFactory
			.select(tag.content)
			.from(postTag)
			.join(postTag.tag, tag)
			.where(postTag.post.id.eq(postId))
			.fetch();
	}
}
