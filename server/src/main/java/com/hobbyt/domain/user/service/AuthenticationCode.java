package com.hobbyt.domain.user.service;

import java.util.Random;

import lombok.Getter;

@Getter
public class AuthenticationCode {
	private static final int CODE_COUNT = 8;
	private static final int NUMBER_OF_CASES = 3;

	private final String code;

	public AuthenticationCode() {
		this.code = createCode();
	}

	private String createCode() {
		StringBuffer code = new StringBuffer();
		Random random = new Random();

		int index = 0;
		while (index < CODE_COUNT) {
			switch (random.nextInt(NUMBER_OF_CASES)) {
				case 0:    // a~z (ex. 1+97=98 => (char)98 = 'b')
					code.append((char)((random.nextInt(26)) + 97));
					break;
				case 1:    // A ~ Z
					code.append((char)((random.nextInt(26)) + 65));
					break;
				case 2:    // 0 ~ 9
					code.append(random.nextInt(10));
					break;
			}
		}

		return code.toString();
	}
}
