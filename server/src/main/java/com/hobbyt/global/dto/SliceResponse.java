package com.hobbyt.global.dto;

import java.util.List;

import org.springframework.data.domain.Slice;

import lombok.Getter;

@Getter
public class SliceResponse<T> {
	private List<T> contents;
	private Boolean hasNext;

	public static SliceResponse<?> of(Slice<?> items) {
		return new SliceResponse<>(items);
	}

	private SliceResponse(Slice<T> items) {
		this.contents = items.getContent();
		this.hasNext = items.hasNext();
	}
}
