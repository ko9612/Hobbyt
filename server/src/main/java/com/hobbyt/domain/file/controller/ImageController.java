package com.hobbyt.domain.file.controller;

import org.springframework.beans.factory.annotation.Value;
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

@RestController
@RequestMapping("/api/images")
public class ImageController {
	private final FileService fileService;
	private final String path;

	public ImageController(FileService fileService, @Value("${hostname}") String hostname) {
		this.fileService = fileService;
		this.path = hostname + "api/images/";
	}

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
		String uri = path + fileService.saveImage(image);

		return ResponseEntity.ok(uri);
	}

	@PostMapping("/thumbnails")
	public ResponseEntity<String> uploadThumbnail(
		@RequestPart MultipartFile image, @RequestPart ThumbnailSizeDto size) {
		String imageName = fileService.saveThumbnail(image, size);

		return ResponseEntity.ok(imageName);
	}
}
