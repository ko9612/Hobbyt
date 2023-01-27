package com.hobbyt.domain.search.repository;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;
import com.hobbyt.domain.search.dto.SearchSaleResponse;

public interface SearchRepository {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);

	SearchSaleResponse searchSalesByKeyword(SearchRequest params);
}
