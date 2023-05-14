package com.hobbyt.domain.tag.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.tag.entity.Tag;
import com.hobbyt.domain.tag.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
	private final TagRepository tagRepository;

	public List<Tag> addTags(List<String> tags) {
		return tagRepository.saveAll(
			tags.stream()
				.map(this::createOrFindIfExit)
				.collect(Collectors.toList())
		);
	}

	private Tag createOrFindIfExit(String tag) {
		Optional<Tag> found = tagRepository.findByContent(tag);
		return found.orElseGet(
			() -> Tag.from(tag));
	}
}
