package com.hobbyt.domain.member.dto.response;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyInfoResponse {
	private String phoneNumber;
	private RecipientDto recipient;
	private AccountDto account;

	@Getter
	public static class RecipientDto {
		private AddressDto address;
		private String name;
		private String phoneNumber;

		private RecipientDto() {
			this.address = new AddressDto();
		}

		private RecipientDto(Recipient recipient) {
			this.address = recipient.getAddress() == null ? new AddressDto() : new AddressDto(recipient.getAddress());
			this.name = recipient.getName();
			this.phoneNumber = recipient.getPhoneNumber();
		}

		public Recipient toEntity() {
			return new Recipient(name, phoneNumber, address.toEntity());
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
	}

	/*@Getter
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
	}*/

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
	private MyInfoResponse(String phoneNumber, Recipient recipient, Account account) {
		this.phoneNumber = phoneNumber;
		this.recipient = recipient == null ? new RecipientDto() : new RecipientDto(recipient);
		this.account = account == null ? new AccountDto() : new AccountDto(account);
	}

	public static MyInfoResponse of(Member member) {
		return MyInfoResponse.builder()
			.phoneNumber(member.getPhoneNumber())
			.recipient(member.getRecipient())
			.account(member.getAccount())
			.build();
	}

	/*@Builder
	private MyInfoResponse(String email, String nickname, String profileImage, String description,
		String phoneNumber, Address address, Account account) {
		this.email = email;
		this.nickname = nickname;
		this.profileImage = profileImage;
		this.description = description;
		this.phoneNumber = phoneNumber;
		this.address = address == null ? new AddressDto() : new AddressDto(address);
		this.account = account == null ? new AccountDto() : new AccountDto(account);
	}

	public static MyInfoResponse of(Member member) {
		return MyInfoResponse.builder()
			.email(member.getEmail())
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.description(member.getDescription())
			.phoneNumber(member.getPhoneNumber())
			// .address(member.getAddress())
			.account(member.getAccount())
			.build();
	}*/
}
