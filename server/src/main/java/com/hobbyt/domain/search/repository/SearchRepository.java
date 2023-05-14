package com.hobbyt.domain.search.repository;

import com.hobbyt.domain.search.dto.request.SearchRequest;
import com.hobbyt.domain.search.dto.response.SearchPostResponse;
import com.hobbyt.domain.search.dto.response.SearchSaleResponse;

public interface SearchRepository {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);

	SearchSaleResponse searchSalesByKeyword(SearchRequest params);
}
