package com.hobbyt.domain.member.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfileRequest {
	private String nickname;
	private String description;
	private MultipartFile profileImage;
	private MultipartFile headerImage;

}
