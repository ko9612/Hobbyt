// 프로필 수정 페이지
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

import SubmitButton from "../../Button/SubmitButton";
import { getBlogLoginProfile, patchBlogProfile } from "../../../api/profileApi";
import {
  ProfileImageState,
  HeaderImageState,
} from "../../../state/ProfileState";
import { NicknameState, UserProfileState } from "../../../state/UserState";
import { postImageUpload } from "../../../api/blogApi";
import MsgModal from "../../Modal/MsgModal";
import { imageErrorHandler } from "../../../util/ErrorHandler";

const ProfileContainer = tw.div`md:w-[40rem] m-auto mb-10`;
const ProfileContent = tw.div`mb-20`;
const ImageEdit = tw.div`flex items-center mt-14`;

export default function ProfileEdit() {
  const router = useRouter();
  const homeId = Number(router.query.userId);

  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState);
  const [headerImage, setHeaderImage] = useRecoilState(HeaderImageState);

  // 닉네임, 자기소개의 기본 값을 현재 값으로 둔다.
  const [defaultNickName, setDefaultNickName] = useRecoilState(NicknameState);
  const [nickname, setNickname] = useState(defaultNickName);
  const setNavProfileImg = useSetRecoilState(UserProfileState);
  const [description, setDescription] = useState("");

  // 개인홈 프로필 조회 api 요청 함수
  const request = async () => {
    // 로그인한 유저용 프로필 조회
    // 블로그 주인 userID api 함수로 보내줘야함
    const res = await getBlogLoginProfile(homeId);
    setDescription((res as any).data.description);
  };

  useEffect(() => {
    if (router.isReady) {
      request();
    }
  }, [router.isReady]);

  // 자기소개 글자수 카운팅
  const [count, setCount] = useState(description);
  console.log("description.length", description.length);

  // 헤더 이미지 변경 함수
  const handleChangeHeaderImage = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const data = await postImageUpload(formData);
    if ((data as any).status === 200) {
      setHeaderImage((data as any).data.slice(26));
    } else {
      imageErrorHandler({
        data,
        inputName: "headerImage",
        setErrMsg,
        setShowMsgModal,
      });
    }
  };

  // 프로필 이미지 변경 함수
  const handleChangeProfileImage = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const data = await postImageUpload(formData);
    if ((data as any).status === 200) {
      setProfileImage((data as any).data.slice(26));
    } else {
      imageErrorHandler({
        data,
        inputName: "profileImage",
        setErrMsg,
        setShowMsgModal,
      });
    }
  };

  // 닉네임 변경 함수
  const hadleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value.replace(/\s/gi, ""));
  };

  // 자기소개 변경 함수
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = e.target.value;

    if (data !== undefined) {
      setDescription(data);
      setCount(data);
    } else if (data === "") {
      setDescription("");
      setCount("");
    }
  };

  // 수정 api 요청 함수
  const onSubmitClick = async () => {
    const data = {
      headerImage,
      profileImage,
      nickname,
      description,
    };

    try {
      const req = await patchBlogProfile(homeId, data);
      if ((req as any).status === 200) {
        setDefaultNickName(nickname);
        setNavProfileImg(profileImage);
        router.reload();
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <ProfileContainer>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      <ProfileContent>
        <h1 className="mt-10 text-2xl font-bold">프로필 수정</h1>
        <ImageEdit>
          <h3 className="text-base font-semibold md:text-xl mr-7">
            헤더 이미지 수정
          </h3>
          <input
            type="file"
            id="headerImage"
            className="p-2 mt-2 bg-gray-200 rounded-lg w-60"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChangeHeaderImage}
          />
        </ImageEdit>
        <ImageEdit>
          <h3 className="mr-4 text-base font-semibold md:text-xl">
            프로필 이미지 수정
          </h3>
          <input
            type="file"
            id="profileImage"
            className="p-2 mt-2 bg-gray-200 rounded-lg w-60"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChangeProfileImage}
          />
        </ImageEdit>
        <h3 className="text-base font-semibold md:text-xl mt-14">닉네임</h3>
        <p className="text-sm text-gray-400 md:text-base">
          &#42; 닉네임은 최대 6글자까지 가능합니다.
        </p>
        <input
          type="text"
          className="p-2 mt-2 bg-gray-200 rounded-lg w-80"
          placeholder="닉네임"
          value={nickname}
          onChange={hadleChangeName}
          maxLength={6}
        />
        <h3 className="mt-10 text-base font-semibold md:text-xl">자기소개</h3>
        <p className="text-sm text-gray-400 md:text-base">
          &#42; 현재 글자수{count.length} | 최대 글자수 50
        </p>
        <textarea
          cols={50}
          rows={2}
          className="w-full p-4 mt-2 bg-gray-200 rounded-lg"
          value={description}
          onChange={handleChangeDescription}
          maxLength={50}
        />
      </ProfileContent>
      <SubmitButton id="d" onClick={() => onSubmitClick()}>
        저장
      </SubmitButton>
    </ProfileContainer>
  );
}
