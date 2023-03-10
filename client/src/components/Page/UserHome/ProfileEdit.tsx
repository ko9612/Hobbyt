// 프로필 수정 페이지

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DefalutButton } from "../../Button/DefalutButton";
import { patchBlogProfile } from "../../../api/profileApi";
import {
  ProfileImageState,
  HeaderImageState,
} from "../../../state/ProfileState";
import { NicknameState, UserProfileState } from "../../../state/UserState";

const ProfileContainer = tw.div`w-[40rem] m-auto`;
const ProfileContent = tw.div`mb-20`;
const ImageEdit = tw.div`flex items-center mt-14`;

export default function ProfileEdit() {
  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState);
  const [headerImage, setHeaderImage] = useRecoilState(HeaderImageState);
  // 닉네임의 기본 값을 현재 닉네임으로 둔다.
  const [nickName, setNickName] = useRecoilState(NicknameState);
  // const setNavNickName = useSetRecoilState(NicknameState);
  const setNavProfileImg = useSetRecoilState(UserProfileState);
  const [description, setDescription] = useState("");
  // 자기소개 글자수 카운팅
  const [count, setCount] = useState("");

  // 헤더 이미지 변경 함수
  const handleChangeHeaderImage = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const newHeader: any = reader.result;
      setHeaderImage(newHeader);
    };
  };

  // 프로필 이미지 변경 함수
  const handleChangeProfileImage = async (e: any) => {
    console.log(e.target.files);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const newProfile: any = reader.result;
      setProfileImage(newProfile);
    };
  };

  // 닉네임 변경 함수
  const hadleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setNickName(data);
  };

  // 자기소개 변경 함수
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = e.target.value;
    setDescription(data);
    setCount(data);
  };

  // api 요청 함수
  const onSubmitClick = async () => {
    // const data = {
    //   nickname: nickName,
    //   description,
    // };

    const formData = new FormData();
    formData.append("headerImage", headerImage);
    formData.append("profileImage", profileImage);
    formData.append(
      "nickname",
      new Blob([JSON.stringify(nickName)] as any, { type: "application/json" }),
    );
    formData.append(
      "description",
      new Blob([JSON.stringify(description)] as any, {
        type: "application/json",
      }),
    );

    console.log(formData);

    try {
      const req = await patchBlogProfile(formData);
      setNickName(nickName);
      setNavProfileImg(profileImage);
      // const res = req.data;
      console.log(`req`, req);
    } catch (err: unknown) {
      console.log(`err`, err);
    }
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <h1 className="mt-10 text-2xl font-bold">프로필 수정</h1>
        <ImageEdit>
          <h3 className="text-xl font-semibold mr-7">헤더 이미지 수정</h3>
          <input
            type="file"
            className="p-2 mt-2 bg-gray-200 rounded-lg w-60"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChangeHeaderImage}
          />
        </ImageEdit>
        <ImageEdit>
          <h3 className="mr-4 text-xl font-semibold">프로필 이미지 수정</h3>
          <input
            type="file"
            className="p-2 mt-2 bg-gray-200 rounded-lg w-60"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChangeProfileImage}
          />
        </ImageEdit>
        <h3 className="text-xl font-semibold mt-14">닉네임</h3>
        <p className="text-gray-400">
          &#42; 닉네임은 최대 6글자까지 가능합니다.
        </p>
        <input
          type="text"
          className="p-2 mt-2 bg-gray-200 rounded-lg w-80"
          placeholder="닉네임"
          value={nickName}
          onChange={hadleChangeName}
          maxLength={6}
        />
        <h3 className="mt-10 text-xl font-semibold">자기소개</h3>
        <p className="text-gray-400">
          &#42; 현재 글자수{count.length} | 최대 글자수 50
        </p>
        <textarea
          cols={50}
          rows={2}
          className="p-2 mt-2 bg-gray-200 rounded-lg w-80"
          value={description}
          onChange={handleChangeDescription}
          maxLength={50}
        />
      </ProfileContent>
      <DefalutButton id="d" onClick={() => onSubmitClick()}>
        저장
      </DefalutButton>
    </ProfileContainer>
  );
}
