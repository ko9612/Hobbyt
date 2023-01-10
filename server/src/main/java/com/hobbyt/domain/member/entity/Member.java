package com.hobbyt.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String nickname;

	private String password;

	private String profileImage;
	private String description;

	private String phoneNumber;

	@Embedded
	private Address address;

	@Embedded
	private Account account;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Authority authority = Authority.ROLE_USER;    // 권한

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private MemberStatus status = MemberStatus.MEMBER;    // 회원 상태: 탈퇴,,,

	@Column(nullable = false)
	private boolean dmReceive = true;    // DM 수신여부

	@Builder
	public Member(Long id, String nickname, String email, String password, String profileImage) {
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.profileImage = profileImage;
	}

	public void withdraw() {
		status = MemberStatus.WITHDRAWAL;
	}

	public void update(String email, String nickname, String description, String phoneNumber,
		Address address, Account account) {

		this.email = email == null ? this.email : email;
		this.nickname = nickname == null ? this.nickname : nickname;
		// this.profileImage = profileImage == null ? this.profileImage : profileImage;
		this.description = description == null ? this.description : description;
		this.phoneNumber = phoneNumber == null ? this.phoneNumber : phoneNumber;
		this.address = address == null ? this.address : address;
		this.account = account == null ? this.account : account;

		/*if (email != null && !this.email.equals(email)) {
			this.email = email;
		}
		if (nickname != null && !this.nickname.equals(nickname)) {
			this.nickname = nickname;
		}
		if (profileImage != null && !this.profileImage.equals(profileImage)) {
			this.profileImage = profileImage;
		}
		if (description != null && !this.description.equals(description)) {
			this.description = description;
		}
		if (phoneNumber != null && !this.phoneNumber.equals(phoneNumber)) {
			this.phoneNumber = phoneNumber;
		}*/
	}
}
