package com.hobbyt.domain.search.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class SearchRepositoryImpl implements SearchRepository {
}
