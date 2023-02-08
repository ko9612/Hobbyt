package com.hobbyt.domain.file.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.file.dto.ThumbnailSizeDto;
import com.hobbyt.domain.file.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
	private final FileService fileService;

	@GetMapping("/{fileName}")
	public ResponseEntity<Resource> downloadImage(@PathVariable String fileName) {
		Resource resource = fileService.getImageResource(fileName);

		String headerKey = "Content-Type";
		String headerValue = fileService.getImageContentType(fileName);

		return ResponseEntity.ok()
			.header(headerKey, headerValue)
			.body(resource);
	}

	@PostMapping
	public ResponseEntity<String> uploadImage(MultipartFile image) {
		String imageName = fileService.saveImage(image);

		return ResponseEntity.ok(imageName);
	}

	@PostMapping("/thumbnails")
	public ResponseEntity<String> uploadThumbnail(
		@RequestPart(name = "image") MultipartFile image, @RequestPart ThumbnailSizeDto size) {
		String imageName = fileService.saveThumbnail(image, size);

		return ResponseEntity.ok(imageName);
	}
}
