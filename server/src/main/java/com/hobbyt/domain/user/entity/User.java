package com.hobbyt.domain.user.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Address;
import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String nickname;
	private String profileImage;
	private String description;

	@Embedded
	private Address address;

	@Embedded
	private Account account;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Authority authority;    // 권한

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserStatus status;    // 회원 상태: 탈퇴,,,

	@Column(nullable = false)
	private boolean emailVerified;    // 회원가입시 이메일 인증여부

	@Column(nullable = false)
	private boolean dmReceive;    // DM 수신여부
}
