package com.hobbyt.domain.member.repository;

import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);

	Optional<Member> findByEmailAndStatusNot(String email, MemberStatus status);

	Optional<Member> findByEmailAndStatus(String email, MemberStatus status);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	Optional<Member> findMemberForUpdateById(Long id);

	boolean existsByEmail(String email);

	boolean existsByEmailAndStatus(String email, MemberStatus status);

	boolean existsByNickname(String nickname);

	boolean existsByNicknameAndStatus(String nickname, MemberStatus status);
}
