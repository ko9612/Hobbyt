package com.hobbyt.domain.search.service;

import com.hobbyt.domain.search.dto.request.SearchRequest;
import com.hobbyt.domain.search.dto.response.SearchPostResponse;
import com.hobbyt.domain.search.dto.response.SearchSaleResponse;

public interface SearchService {
	SearchPostResponse searchPostsByKeyword(SearchRequest params);

	SearchSaleResponse searchSales(SearchRequest params);
}
