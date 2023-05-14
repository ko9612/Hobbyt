package com.hobbyt.domain.member.dto.request;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMyInfoRequest {
	private String phoneNumber;
	private RecipientDto recipient;
	private AccountDto account;

	@Getter
	@NoArgsConstructor
	public static class RecipientDto {
		private AddressDto address;
		private String name;
		private String phoneNumber;

		private RecipientDto(Recipient recipient) {
			this.address = new AddressDto(recipient.getAddress());
			this.name = recipient.getName();
			this.phoneNumber = recipient.getPhoneNumber();
		}

		public Recipient toEntity() {
			return new Recipient(name, phoneNumber, address.toEntity());
		}
	}

	@Getter
	@NoArgsConstructor
	public static class AddressDto {
		private String zipcode;
		private String street;
		private String detail;

		private AddressDto(Address address) {
			this.zipcode = address.getZipcode();
			this.street = address.getStreet();
			this.detail = address.getDetail();
		}

		public Address toEntity() {
			return new Address(zipcode, street, detail);
		}
	}

	@Getter
	@NoArgsConstructor
	public static class AccountDto {
		private String holder;
		private String bank;
		private String number;

		private AccountDto(Account account) {
			this.holder = account.getHolder();
			this.bank = account.getBank();
			this.number = account.getNumber();
		}

		public Account toEntity() {
			return new Account(holder, bank, number);
		}
	}

	@Builder
	private UpdateMyInfoRequest(String phoneNumber, Recipient recipient, Account account) {
		this.phoneNumber = phoneNumber;
		this.account = new AccountDto(account);
		this.recipient = new RecipientDto(recipient);
	}

	public static UpdateMyInfoRequest of(Member member) {
		return UpdateMyInfoRequest.builder()
			.phoneNumber(member.getPhoneNumber())
			.recipient(member.getRecipient())
			.account(member.getAccount())
			.build();
	}
}
