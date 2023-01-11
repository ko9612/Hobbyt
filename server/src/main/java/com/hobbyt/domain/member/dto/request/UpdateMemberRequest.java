package com.hobbyt.domain.member.dto.request;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMemberRequest {
	private String nickname;
	// TODO 프로필 이미지 처리
	// private MultipartFile profileImage;
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

		public Address toEntity() {
			return new Address(zipcode, street, detail);
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

		public Account toEntity() {
			return new Account(bank, number);
		}
	}

	@Builder
	private UpdateMemberRequest(String nickname, String profileImage, String description,
		String phoneNumber, Account account, Address address) {

		this.nickname = nickname;
		// this.profileImage = profileImage;
		this.description = description;
		this.phoneNumber = phoneNumber;
		this.account = new AccountDto(account);
		this.address = new AddressDto(address);
	}

	public static UpdateMemberRequest of(Member member) {
		return UpdateMemberRequest.builder()
			.nickname(member.getNickname())
			// .profileImage(member.getProfileImage())
			.description(member.getDescription())
			.phoneNumber(member.getPhoneNumber())
			.account(member.getAccount())
			.address(member.getAddress())
			.build();
	}
}
