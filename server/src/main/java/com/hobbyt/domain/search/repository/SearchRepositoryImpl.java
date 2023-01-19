package com.hobbyt.domain.search.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;

@Repository
@Transactional(readOnly = true)
public class SearchRepositoryImpl implements SearchRepository {
	@Override
	public SearchPostResponse searchPostsByKeyword(SearchRequest params) {
		return null;
	}
}
