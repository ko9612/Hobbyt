package com.hobbyt.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;

public interface MemberRepository extends JpaRepository<Member, Long>, CustomMemberRepository {
	Optional<Member> findByEmail(String email);

	Optional<Member> findByEmailAndStatusNot(String email, MemberStatus status);

	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);

	// boolean existsByEmailAndStatusNot(String email, MemberStatus status);
}
