package com.hobbyt.domain.search.service;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;
import com.hobbyt.domain.search.dto.SearchSaleResponse;

public interface SearchService {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);

	SearchSaleResponse searchSales(SearchRequest params);
}
