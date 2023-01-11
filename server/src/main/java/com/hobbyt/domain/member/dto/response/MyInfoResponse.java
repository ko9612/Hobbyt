package com.hobbyt.domain.member.dto.response;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyInfoResponse {
	private String email;
	private String nickname;
	private String profileImage;
	private String description;
	private String phoneNumber;
	private AddressDto address;
	private AccountDto account;

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
	}

	@Getter
	@NoArgsConstructor
	public static class AccountDto {
		private String bank;
		private String number;

		private AccountDto(Account account) {
			this.bank = account.getBank();
			this.number = account.getNumber();
		}
	}

	@Builder
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
			.address(member.getAddress())
			.account(member.getAccount())
			.build();
	}
}
