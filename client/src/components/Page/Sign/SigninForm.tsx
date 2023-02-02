// 로그인 form
import tw from "tailwind-styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { EventSourcePolyfill } from "event-source-polyfill";
import { emailRegex, passwordRegex } from "../../../util/Regex";
import SubmitButton from "../../Button/SubmitButton";
import {
  EmailState,
  LoginState,
  UserIdState,
  NicknameState,
  // UserProfileState,
} from "../../../state/UserState";
import { postSignin } from "../../../api/signApi";
import MsgModal from "../../Modal/MsgModal";
import { SigninInputs } from "../../../type/userTypes";
import LoginRefresh from "../../../util/LoginRefresh";
import { getSSE } from "../../../api/noticeApi";
import { getBlogProfile } from "../../../api/profileApi";

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
  const [isLogin, setLogin] = useRecoilState<boolean | null>(LoginState);
  const setEmail = useSetRecoilState<string | undefined>(EmailState);
  const setUserId = useSetRecoilState<number>(UserIdState);
  const setNickname = useSetRecoilState<string | undefined>(NicknameState);
  // const setNavProfileImg = useSetRecoilState(UserProfileState);
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
      const userData = (signinSubmit as any).data;
      const accessToken = (signinSubmit as any).headers.authorization;
      const refreshToken = (signinSubmit as any).headers.refreshtoken;
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("refresh", refreshToken);

      // NavBar의 Profile 이미지 때문에 로그인 후 1번 get 요청
      const profileData = await getBlogProfile(userData.memberId);
      console.log(`profileData`, profileData);
      setUserId(signinSubmit.data.memberId);

      if (accessToken && refreshToken) {
        setLogin(true);
        setEmail(data.email);
        setUserId(userData.memberId);
        setNickname(userData.nickname);
        // 이미지 처리 후, 밑의 주석 풀기
        // setNavProfileImg((profileData as any).data.profileImage);
        setTimeout(LoginRefresh, 60000 * 20);
        router.replace("/");
      }
    } else {
      setErrMsg("이메일 또는 비밀번호를 다시 확인해주세요.");
      setShowModal(true);
      console.log(signinSubmit);
    }
    // 나중에 에러 처리
    // switch ((signinSubmit as any).status) {
    //   case 200:
    //   case 400:
    //   default:
    // }
  };

  // // SSE 구독 api
  // const noticeApi = async () => {
  //   console.log("로그인된거임?", isLogin);
  //   if (isLogin === true) {
  //     const SSE = await getSSE();
  //     console.log(`noticeApi`, SSE);
  //     console.log("된거냐고", isLogin);
  //   }
  // };

  // useEffect(() => {
  //   noticeApi();
  //   console.log("된거임?");
  // }, [isLogin]);

  // // sse 구독 api
  // useEffect(() => {
  //   if(localStorage.getItem("authorization") !== null){
  //     let token = localStorage.getItem("authorization")
  //     let eventSource = new EventSource("/api/notifications/subscribe" + "?token=" + token);

  //     eventSource.addEventListener()
  //   }
  // },[])

  // const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    console.log("useEffect 앞");
    if (isLogin === true) {
      const axiosSEE = async () => {
        let eventSource;
        console.log("useEffect 중");
        try {
          eventSource = new EventSourcePolyfill(
            "/api/notifications/subscribe",
            {
              headers: { Authorization: localStorage.getItem("authorization") },
            },
          );
          console.log("useEffect 중하");
          console.log("useEffect", eventSource);

          // eventSource.onmessage = async event => {
          //   // const data = JSON.parse(event.data);
          //   // console.log("data", data.message);
          //   console.log("data", event);
          // };

          //   // if (data.type !== "error") {
          //   //   console.log("data", data.message);
          //   // }
          // };

          // eventSource.onerror = async event => {
          //   // eventSource.close();
          //   // const data = JSON.parse(error.data);
          //   // console.log("error 메세지", data.message);
          //   const data = JSON.parse(event.data);
          //   if (data.type === "error") {
          //     console.log("error", data.message);
          //   }
          // };

          eventSource.addEventListener("notificaiton", e => {
            const receivedConnectData = e.data;
            console.log("들어왔어!", receivedConnectData);
          });

          // eventSource.addEventListener("message", e => {
          //   console.log("메세지 들어왔어!", e);
          // });

          // eventSource.addEventListener("error", e => {
          //   console.log(e);
          // });
        } catch (err: unknown) {
          console.log("err", err);
          return console.error(err);
        }
      };
      axiosSEE();
      console.log("useEffect 끝");
    }
  }, [isLogin]);

  // const evSource = new EventSource("/api/notifications/subscribe");
  // const parseMyEvent = (ev: MessageEvent) => {
  //   const evData = JSON.parse(ev.data);
  //   console.log("돼냐", evData);
  // };
  // evSource.addEventListener("/api/notifications/subscribe", parseMyEvent);

  // // notice SSE 요청
  // const noticeApi = async () => {
  //   const noticeApi = await getSSE();
  //   console.log(`noticeApi`, noticeApi);
  // };

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
