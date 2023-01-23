package com.hobbyt.domain.privatehome.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PrivateHomeRequest {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Get {
		private int offset;
		private int limit;
	}
}