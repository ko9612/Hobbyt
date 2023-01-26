package com.hobbyt.domain.privatehome.dto;

import lombok.Getter;

public class PrivateHomeServiceDto {
	@Getter
	public static class Get {
		private long offset;
		private int limit;

		public Get(PrivateHomeRequest params) {
			this.offset = params.getOffset();
			this.limit = params.getLimit();
		}
	}
}
