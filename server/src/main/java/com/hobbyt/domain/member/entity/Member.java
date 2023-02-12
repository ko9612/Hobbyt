package com.hobbyt.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.hobbyt.global.entity.Account;
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
	private String headerImage;
	private String description;

	private String phoneNumber;

	// 팔로워 수
	@Column(nullable = false)
	private int followerCount;

	// 팔로잉 수
	@Column(nullable = false)
	private int followingCount;

	@Embedded
	private Recipient recipient;

	@Embedded
	private Account account;

	@Embedded
	private Views views;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Authority authority = Authority.ROLE_USER;    // 권한

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private MemberStatus status = MemberStatus.MEMBER;    // 회원 상태: 탈퇴,,,

	@Column(nullable = false)
	private boolean dmReceive = true;    // DM 수신여부

	@Enumerated(EnumType.STRING)
	private Provider provider;

	private String providerId;

	@Builder
	public Member(Long id, String nickname, String email, String password, String profileImage, String headerImage,
		String description, String phoneNumber, Provider provider, String providerId) {

		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.profileImage = profileImage;
		this.headerImage = headerImage;
		this.description = description;
		this.phoneNumber = phoneNumber;
		this.provider = provider;
		this.providerId = providerId;

		this.followerCount = 0;
		this.followingCount = 0;
		this.views = new Views(0, 0);
	}

	public void withdraw() {
		status = MemberStatus.WITHDRAWAL;
	}

	public void rejoin(String password, String nickname) {
		this.password = password;
		this.nickname = nickname;
		status = MemberStatus.MEMBER;
	}

	public void updateMemberInfo(String phoneNumber, Recipient recipient, Account account) {

		this.phoneNumber = phoneNumber == null ? this.phoneNumber : phoneNumber;
		this.recipient = recipient == null ? this.recipient : recipient;
		// this.address = address == null ? this.address : address;
		this.account = account == null ? this.account : account;

		/*if (email != null && !email.equals(this.email)) {
			this.email = email;
		}
		if (nickname != null && !nickname.equals(this.nickname)) {
			this.nickname = nickname;
		}
		if (profileImage != null && !profileImage.equals(this.profileImage)) {
			this.profileImage = profileImage;
		}
		if (description != null && !description.equals(this.description)) {
			this.description = description;
		}
		if (phoneNumber != null && !phoneNumber.equals(this.phoneNumber)) {
			this.phoneNumber = phoneNumber;
		}
		if (account != null && !account.equals(this.account)) {
			this.account = account;
		}
		if (address != null && !address.equals(this.address)) {
			this.address = address;
		}*/
	}

	public void updatePassword(String password) {
		this.password = password == null ? this.password : password;
	}

	public void followerUp() {
		this.followerCount++;
	}

	public void followerDown() {
		this.followerCount--;
	}

	public void followingUp() {
		this.followingCount++;
	}

	public void followingDown() {
		this.followingCount--;
	}

	public void updateProfile(String nickname, String description, String profileImage, String headerImage) {
		this.nickname = nickname == null ? this.nickname : nickname;
		this.description = description == null ? this.description : description;
		this.profileImage = profileImage == null ? this.profileImage : profileImage;
		this.headerImage = headerImage == null ? this.headerImage : headerImage;
	}
}
