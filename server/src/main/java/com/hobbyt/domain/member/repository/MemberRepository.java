package com.hobbyt.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
import com.hobbyt.domain.member.entity.Provider;

public interface MemberRepository extends JpaRepository<Member, Long>, CustomMemberRepository {
	Optional<Member> findByEmail(String email);

	Optional<Member> findByEmailAndProvider(String email, Provider provider);

	Optional<Member> findByEmailAndStatusNot(String email, MemberStatus status);

	Optional<Member> findByEmailAndStatus(String email, MemberStatus status);

	boolean existsByEmail(String email);

	boolean existsByEmailAndStatus(String email, MemberStatus status);

	boolean existsByNickname(String nickname);

	boolean existsByNicknameAndStatus(String nickname, MemberStatus status);

	// boolean existsByEmailAndStatusNot(String email, MemberStatus status);
}
