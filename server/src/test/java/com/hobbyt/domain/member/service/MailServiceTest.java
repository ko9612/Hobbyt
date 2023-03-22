package com.hobbyt.domain.member.service;

// @ExtendWith(MockitoExtension.class)
class MailServiceTest {
	/*@Mock
	private JavaMailSender mailSender;

	@InjectMocks
	private MailSender mailSender;

	private Email email;

	@BeforeEach
	void setup() {
		email = Email.of("test@google.com", "테스트 메일", "테스트 메일");
	}

	@DisplayName("메일 전송")
	@Test
	void sendMail() {
		//given
		//when
		mailSender.sendMail(email);

		//then
		then(mailSender).should(times(1)).send(any(MimeMessagePreparator.class));
	}

	@DisplayName("MailException 예외: 메일 전송 실패")
	@Test
	void sendMailException() {
		//given
		// MailException.class의 경우 예외 발생
		willThrow(new MailSendException("Test message"))
			.given(mailSender)
			.send(any(MimeMessagePreparator.class));

		//then
		assertThatThrownBy(() -> mailSender.sendMail(email))
			.isInstanceOf(BusinessLogicException.class);
		then(mailSender).should(times(1)).send(any(MimeMessagePreparator.class));
	}*/
}
