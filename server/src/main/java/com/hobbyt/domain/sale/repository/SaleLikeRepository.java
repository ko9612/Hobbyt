package com.hobbyt.domain.sale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.domain.sale.entity.SaleLike;

public interface SaleLikeRepository extends JpaRepository<SaleLike, Long> {
	Optional<SaleLike> findByMemberAndSale(Member member, Sale sale);

	boolean existsByMemberAndSale(Member member, Sale sale);
}
