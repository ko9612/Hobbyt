package com.hobbyt.domain.search.service;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;

public interface SearchService {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);
}
