package com.hobbyt.domain.member.dto.response;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMemberResponse {
	private String nickname;
	// TODO 프로필 이미지 처리
	// private String profileImage;
	private String description;
	private String phoneNumber;
	private AddressDto address;
	private AccountDto account;

	// TODO Embeddable 클래스 이용은 힘든지?, 공통으로 AddressDto, AccountDto 클래스를 외부에 만들지
	@Getter
	@NoArgsConstructor
	private static class AddressDto {
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
	private static class AccountDto {
		private String bank;
		private String number;

		private AccountDto(Account account) {
			this.bank = account.getBank();
			this.number = account.getNumber();
		}
	}

	@Builder
	private UpdateMemberResponse(String nickname, String profileImage, String description,
		String phoneNumber, Account account, Address address) {

		this.nickname = nickname;
		// this.profileImage = profileImage;
		this.description = description;
		this.phoneNumber = phoneNumber;
		this.address = address == null ? new AddressDto() : new AddressDto(address);
		this.account = account == null ? new AccountDto() : new AccountDto(account);
	}

	public static UpdateMemberResponse of(Member member) {
		return UpdateMemberResponse.builder()
			.nickname(member.getNickname())
			// .profileImage(member.getProfileImage())
			.description(member.getDescription())
			.phoneNumber(member.getPhoneNumber())
			.account(member.getAccount())
			.address(member.getAddress())
			.build();
	}
}
