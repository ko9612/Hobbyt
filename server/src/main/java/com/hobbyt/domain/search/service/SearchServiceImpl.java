package com.hobbyt.domain.search.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;
import com.hobbyt.domain.search.dto.SearchSaleResponse;
import com.hobbyt.domain.search.repository.SearchRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
	private final SearchRepository searchRepository;

	@Override
	public SearchPostResponse searchPostsByKeyword(SearchRequest params) {
		return searchRepository.searchPostsByKeyword(params);
	}

	@Override
	public SearchSaleResponse searchSales(SearchRequest params) {
		return searchRepository.searchSalesByKeyword(params);
	}
}
