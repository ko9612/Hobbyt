// 로그인 form
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../../../util/Regex";
import SubmitButton from "../../Button/SubmitButton";
import {
  EmailState,
  PasswordState,
  LoginState,
  UserIdState,
} from "../../../state/UserState";
import { postSignin } from "../../../api/signApi";
import MsgModal from "../../Modal/MsgModal";
import { SigninInputs } from "../../../type/userTypes";
import LoginRefresh from "../../../util/LoginRefresh";

export const Input = tw.div`
  my-6
`;

export const LoginInput = tw.input`
w-full px-4 py-2 text-gray-700 placeholder-gray-400
bg-white border border-slate-300 rounded-lg focus:border-MainColor focus:outline-none focus:ring focus:ring-MainColor/40 duration-200
`;

export const ErrMsg = tw.p`
  text-sm text-MainColor p-1
`;

export default function SigninForm() {
  const router = useRouter();
  const setLogin = useSetRecoilState<boolean | null>(LoginState);
  const setEmail = useSetRecoilState<string | undefined>(EmailState);
  const setPassword = useSetRecoilState<string | undefined>(PasswordState);
  // const setUserId = useSetRecoilState<number | undefined>(UserIdState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

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
    console.log(`signinSubmit`, signinSubmit);
    if ((signinSubmit as any).status === 200) {
      const accessToken = (signinSubmit as any).headers.authorization;
      const refreshToken = (signinSubmit as any).headers.refreshtoken;
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("refresh", refreshToken);
      if (accessToken && refreshToken) {
        setLogin(true);
        setEmail(data.email);
        setPassword(data.password);
        // setUserId(data.)
        // 20분 후, 로그인 연장
        setTimeout(LoginRefresh, 60000 * 20);
        router.replace("/");
      }
    } else {
      setErrMsg("이메일 또는 비밀번호를 다시 확인해주세요.");
      setShowModal(true);
    }
    // 나중에 에러 처리
    // switch ((signinSubmit as any).status) {
    //   case 200:
    //   case 400:
    //   default:
    // }
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
        <SubmitButton id="loginSubmitBut">로그인</SubmitButton>
      </form>
    </>
  );
}
