package com.hobbyt.domain.post.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostComment.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.post.dto.PostResponse;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
@Transactional(readOnly = true)
public class CustomPostRepositoryImpl implements CustomPostRepository {
	private final JPAQueryFactory queryFactory;

	public CustomPostRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public PostResponse getPostDetailById(Long id) {
		Tuple result = getPostReponseWriterBoxTuple(id);
		List<PostResponse.CommentBox> comments = getCommentBoxes(id);

		PostResponse postResponse = result.get(0, PostResponse.class);
		PostResponse.WriterBox writer = result.get(1, PostResponse.WriterBox.class);

		postResponse.setWriter(writer);
		postResponse.setComments(comments);

		return postResponse;
	}

	private Tuple getPostReponseWriterBoxTuple(Long id) {

		return queryFactory
			.select(
				Projections.bean(PostResponse.class,
					post.id,
					post.title,
					post.thumbnailImage,
					post.viewCount,
					post.likeCount,
					post.isPublic,
					post.createdAt
				),
				Projections.fields(PostResponse.WriterBox.class,
					member.id.as("writerId"),
					member.email,
					member.nickname,
					member.profileImage,
					member.createdAt.as("signedUpAt"),
					member.followerCount.as("followings"),
					member.followerCount.as("followers")
				))
			.from(post)
			.join(post.writer, member)
			.where(post.id.eq(id))
			.fetchFirst();
	}

	private List<PostResponse.CommentBox> getCommentBoxes(Long id) {
		return queryFactory
			.select(
				Projections.fields(PostResponse.CommentBox.class,
					postComment.content,
					member.id.as("writerId"),
					member.nickname,
					member.profileImage,
					post.createdAt
				))
			.from(postComment)
			.join(postComment.writer, member)
			.where(postComment.post.id.eq(id))
			.fetch();
	}
}
