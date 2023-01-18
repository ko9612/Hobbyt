package com.hobbyt.domain.privatehome.dto;

import lombok.Getter;

public class PrivateHomeServiceDto {
	@Getter
	public static class Blog {
		private int offset;
		private int limit;

		public Blog(PrivateHomeRequest.Blog params) {
			this.offset = params.getOffset();
			this.limit = params.getLimit();
		}
	}
}
