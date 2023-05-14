// 로그인 form
import tw from "tailwind-styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
// import { EventSourcePolyfill } from "event-source-polyfill";
// import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
// import { CompatClient, Stomp } from "@stomp/stompjs";
import { emailRegex, passwordRegex } from "../../../util/Regex";
import SubmitButton from "../../Button/SubmitButton";
import {
  EmailState,
  LoginState,
  UserIdState,
  NicknameState,
  UserProfileState,
  // UserProfileState,
} from "../../../state/UserState";
import { postSignin } from "../../../api/signApi";
import MsgModal from "../../Modal/MsgModal";
import { SigninInputs } from "../../../type/userTypes";
// import { getSSE } from "../../../api/noticeApi";
import { getBlogProfile } from "../../../api/profileApi";
// import { NoticeState } from "../../../state/Socket";
import NoticeModal from "../../Modal/NoticeModal";

export const Input = tw.div`
  my-6
`;

export const LoginInput = tw.input`
w-full px-4 py-2 text-gray-700 placeholder-gray-400 input
bg-white border border-slate-300 rounded-lg focus:border-MainColor focus:outline-none focus:ring focus:ring-MainColor/40 duration-200
`;

export const ErrMsg = tw.p`
  text-sm text-MainColor p-1
`;

export default function SigninForm() {
  const router = useRouter();
  const [, setLogin] = useRecoilState<boolean | null>(LoginState);
  const setEmail = useSetRecoilState<string | undefined>(EmailState);
  const [, setUserId] = useRecoilState<number>(UserIdState);
  const setNickname = useSetRecoilState<string | undefined>(NicknameState);
  const setNavProfileImg = useSetRecoilState(UserProfileState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  // 알림 왔는 지 안 왔는지 상태 저장
  // const [notice, setNotice] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputs>();

  const onSubmit = async (data: SigninInputs) => {
    const signinData = {
      email: data.email,
      password: data.password,
    };

    const signinSubmit = await postSignin(signinData);

    if ((signinSubmit as any).status === 200) {
      const userData = (signinSubmit as any).data;
      const accessToken = (signinSubmit as any).headers.authorization;
      const refreshToken = (signinSubmit as any).headers.refreshtoken;
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("refresh", refreshToken);

      // NavBar의 Profile 이미지 때문에 로그인 후 1번 get 요청
      const profileData = await getBlogProfile(userData.memberId);

      if (accessToken && refreshToken) {
        setLogin(true);
        setEmail(data.email);
        setUserId(userData.memberId);
        setNickname(userData.nickname);
        setNavProfileImg((profileData as any).data.profileImage);
        router.replace("/");
      }
    } else {
      if ((signinSubmit as any).status === 404) {
        setErrMsg("등록되지 않은 회원입니다.");
      } else if ((signinSubmit as any).status === 400) {
        setErrMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrMsg("서버에러. 관리자에게 문의해주세요.");
      }
      setShowModal(true);
    }
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    next: string,
  ) => {
    const key = e.key || e.keyCode;
    if (key === "Enter" || key === 13) {
      if (next !== "signinSubmit") {
        e.preventDefault();
        document.getElementById(next)?.focus();
      }
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input>
          <LoginInput
            type="email"
            id="email"
            placeholder="이메일"
            onKeyDown={e => handleEnter(e, "password")}
            {...register("email", {
              required: true,
              pattern: {
                value: emailRegex,
                message: "이메일 형식이 올바르지 않습니다",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <ErrMsg>이메일을 입력해주세요.</ErrMsg>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <ErrMsg>{errors.email.message}</ErrMsg>
          )}
        </Input>
        <Input className="mb-10">
          <LoginInput
            type="password"
            id="password"
            placeholder="비밀번호"
            onKeyPress={e => handleEnter(e, "loginSubmitBut")}
            {...register("password", {
              required: true,
              pattern: {
                value: passwordRegex,
                message:
                  "8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.",
              },
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <ErrMsg>비밀번호를 입력해주세요.</ErrMsg>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <ErrMsg>{errors.password.message}</ErrMsg>
          )}
        </Input>
        <SubmitButton id="loginSubmitBut" onClick={handleSubmit(onSubmit)}>
          로그인
        </SubmitButton>
      </form>
    </>
  );
}
