package com.hobbyt.domain.file.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;

import com.hobbyt.domain.file.dto.ThumbnailSizeDto;
import com.hobbyt.global.exception.BusinessLogicException;

@Service
public class FileService {
	private final String rootPath;
	private final String imageDir;
	private final String IMAGE_PATH;
	private final String EXTENSION_SEPARATOR;
	private final Tika tika;

	public FileService(@Value("${file.root}") String rootPath, @Value("${file.image}") String imageDir) {
		this.rootPath = rootPath;
		this.imageDir = imageDir;
		IMAGE_PATH = this.rootPath + this.imageDir;
		EXTENSION_SEPARATOR = ".";
		tika = new Tika();
	}

	public Resource getImageResource(String fileName) {
		Resource resource = new FileSystemResource(IMAGE_PATH + fileName);

		if (!resource.exists()) {
			throw new BusinessLogicException(FILE_NOT_FOUND);
		}

		return resource;
	}

	public String getImageContentType(String fileName) {
		Path path = Paths.get(IMAGE_PATH + fileName);

		try {
			return Files.probeContentType(path);
		} catch (IOException e) {
			throw new BusinessLogicException(FILE_DOWNLOAD_FAILED);
		}
	}

	public String saveImage(MultipartFile image) {
		try {
			verifyFile(image);
			checkIsImage(image);

			String imageName = getFileName(image);
			String savedPath = IMAGE_PATH + imageName;

			image.transferTo(new File(savedPath));

			return imageName;

		} catch (IOException e) {
			throw new BusinessLogicException(FILE_UPLOAD_FAILED);
		}
	}

	public String saveThumbnail(MultipartFile image, ThumbnailSizeDto size) {
		try {
			String fileName = saveImage(image);
			String savedPath = IMAGE_PATH + fileName;

			Thumbnails.of(new File(savedPath))
				.size(size.getWidth(), size.getHeight())
				.toFiles(Rename.NO_CHANGE);

			return fileName;

		} catch (IOException e) {
			throw new BusinessLogicException(FILE_UPLOAD_FAILED);
		}
	}

	private String getFileName(MultipartFile file) {
		String cleanedOriginal = StringUtils.cleanPath(file.getOriginalFilename());
		String extension = cleanedOriginal.substring(cleanedOriginal.lastIndexOf(EXTENSION_SEPARATOR) + 1);

		String uuid = UUID.randomUUID().toString();

		return uuid + EXTENSION_SEPARATOR + extension;
	}

	private void verifyFile(MultipartFile file) {
		if (file.getSize() < 0) {
			throw new BusinessLogicException(FILE_EMPTY_UPLOADED);
		}
	}

	private void checkIsImage(MultipartFile file) throws IOException {
		if (!tika.detect(file.getInputStream()).startsWith("image")) {
			throw new BusinessLogicException(FILE_NOT_IMAGE_UPLOADED);
		}
	}
}
