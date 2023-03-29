package com.hobbyt.domain.member.service.code;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class AuthenticationCodeGenerator implements CodeGenerator {
	private static final int CODE_COUNT = 8;
	private static final int NUMBER_OF_CASES = 3;
	private static final int LOWER_CASE = 0;
	private static final int UPPER_CASE = 1;
	private static final int NUMBER = 2;

	@Override
	public String generate() {
		StringBuffer code = new StringBuffer();
		Random random = new Random();
		int index = 0;
		while (index++ < CODE_COUNT) {
			addNextCode(code, random);
		}
		return code.toString();
	}

	private void addNextCode(final StringBuffer code, final Random random) {
		switch (random.nextInt(NUMBER_OF_CASES)) {
			case LOWER_CASE:    // a~z (ex. 1+97=98 => (char)98 = 'b')
				code.append((char)((random.nextInt(26)) + 97));
				break;
			case UPPER_CASE:    // A ~ Z
				code.append((char)((random.nextInt(26)) + 65));
				break;
			case NUMBER:    // 0 ~ 9
				code.append(random.nextInt(10));
				break;
		}
	}
}
