package com.hobbyt.domain.search.repository;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;

public interface SearchRepository {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);
}
