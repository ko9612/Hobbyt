package com.hobbyt.domain.privatehome.dto;

import lombok.Getter;

public class PrivateHomeServiceDto {
	@Getter
	public static class Get {
		private int offset;
		private int limit;

		public Get(PrivateHomeRequest.Blog params) {
			this.offset = params.getOffset();
			this.limit = params.getLimit();
		}
	}
}
