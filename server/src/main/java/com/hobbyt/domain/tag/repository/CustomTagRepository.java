package com.hobbyt.domain.tag.repository;

import java.util.List;

public interface CustomTagRepository {
	public List<String> getTagsBySaleId(Long saleId);
}
