package com.hobbyt.domain.sale.repository;

import java.util.Map;

import com.hobbyt.domain.sale.entity.SaleTag;
import com.hobbyt.domain.tag.entity.Tag;

public interface CustomSaleTagRepository {
	Map<Tag, SaleTag> getTagSaleTagMapBySaleId(Long saleId);
}
