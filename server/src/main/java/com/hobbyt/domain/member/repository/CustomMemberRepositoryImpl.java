package com.hobbyt.domain.member.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class CustomMemberRepositoryImpl implements CustomMemberRepository {
}
