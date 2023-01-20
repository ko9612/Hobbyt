import { BsEnvelopeFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
// react-hook-form에서 폼 만들기 위한 useForm
import { useForm } from "react-hook-form";
import SubmitButton from "../../Button/SubmitButton";
import { DButton } from "../../Button/DefalutButton";
import { Input, LoginInput, ErrMsg } from "./SigninForm";
import { emailRegex, passwordRegex } from "../../../util/Regex";
import MsgModal from "../../Modal/MsgModal";
import { postsignupSubmit, postSignupEmailBut } from "../../../api/signApi";
import { SignupInputs } from "../../../type/userTypes";

export default function SignupForm() {
  const router = useRouter();

  // form을 만들기위한 요소들
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInputs>();

  // 리렌더링 방지
  const email = useRef<string | null>();
  email.current = watch("email");
  const emailCheck = useRef<string | null>();
  emailCheck.current = watch("emailCheck");
  const password = useRef<string | null>();
  password.current = watch("password");

  // 이메일 인증코드 전송 및 인증 완료 버튼
  const [isEmailBut, setIsEmailBut] = useState<boolean>(false);
  const [emailComplete, setEmailComplete] = useState<boolean>(false);

  // // 이메일 인증코드
  const [certificationCode, setCertificationCode] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const modalMsg = [
    "회원가입이 완료되었습니다.", //
    "이메일로 인증번호가 전송되었습니다.", //
    "인증번호를 입력해주세요.", //
    "인증번호가 유효하지 않습니다.", //
    "이메일 인증이 완료되었습니다.", //
    "이미 가입되어있는 이메일입니다.",
    "중복되는 닉네임 입니다.",
    "이메일을 인증해주세요.", //
  ];
  const [msg, setMsg] = useState<string>(modalMsg[0]);

  // 회원가입 버튼 Handler
  // 중복 이메일, 중복 닉네임xxx
  const onSubmit = async (data: SignupInputs) => {
    if (!emailComplete) {
      setMsg(modalMsg[7]);
      setShowModal(true);
    } else {
      const signupData = {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      };

      const signupSubmit = await postsignupSubmit(signupData);

      // 에러처리 나중에
      if ((signupSubmit as any).status) {
        setMsg(modalMsg[0]);
        setShowModal(true);
        if (!showModal) {
          router.push("/signin");
        }
      }
      console.log(signupSubmit);
      // switch ((signupSubmit as any).status) {
      //   case 201:
      //     setMsg(modalMsg[0]);
      //     setShowModal(true);
      //     if (!showModal) {
      //       router.push("/signin");
      //     }
      //     break;
      //   // 닉네임 중복
      //   // 이메일 중복
      //   // 로그인 실패- 관리자에게 문의
      //   default:
      // }
    }
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    next: string,
  ) => {
    const key = e.key || e.keyCode;
    if (key === "Enter" || key === 13) {
      if (next !== "signUpSubmit") {
        e.preventDefault();
        document.getElementById(next)?.focus();
      }
    }
  };

  // 이메일 인증 버튼 Handler
  const handleEmailBut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailData = {
      email: email.current,
    };
    const emailCheckBut = await postSignupEmailBut(emailData);
    switch ((emailCheckBut as any).status) {
      case 201:
        setMsg(modalMsg[1]);
        setShowModal(true);
        setIsEmailBut(true);
        setCertificationCode((emailCheckBut as any).data);
        break;
      default:
    }
  };

  // 이메일 인증 확인 버튼 Handler
  const handleEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailCheckNum = watch("emailCheck");

    if (emailCheckNum.length === 0) {
      setMsg(modalMsg[2]);
      setShowModal(true);
    } else if (emailCheckNum !== certificationCode) {
      setMsg(modalMsg[3]);
      setShowModal(true);
    } else {
      setMsg(modalMsg[4]);
      setShowModal(true);
      setIsEmailBut(!isEmailBut);
      setEmailComplete(true);
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={msg} setOpenModal={setShowModal} />}
      <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
        <Input>
          <LoginInput
            type="text"
            id="name"
            placeholder="닉네임"
            onKeyPress={e => handleEnter(e, "email")}
            {...register("nickname", {
              required: true,
              minLength: 2,
              maxLength: 6,
            })}
          />
          {errors.nickname && errors.nickname.type === "required" && (
            <ErrMsg>닉네임을 입력해주세요.</ErrMsg>
          )}
          {errors.nickname &&
            (errors.nickname.type === "minLength" ||
              errors.nickname.type === "maxLength") && (
              <ErrMsg>닉네임은 2~6글자로 설정할 수 있습니다.</ErrMsg>
            )}
        </Input>

        <Input>
          <div className="flex">
            <div className="flex-1">
              <LoginInput
                type="email"
                id="email"
                placeholder="이메일"
                onKeyDown={e => handleEnter(e, "emailCertificBut")}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: emailRegex,
                    message: "이메일 형식이 올바르지 않습니다",
                  },
                })}
              />
            </div>
            <div className="ml-2">
              <DButton
                id="emailCertificBut"
                onClick={handleEmailBut}
                onKeyDown={e => handleEnter(e, "emailCertification")}
                disabled={!emailRegex.test(email.current)}
              >
                <BsEnvelopeFill size="25px" />
              </DButton>
            </div>
          </div>
          {errors.email && errors.email.type === "required" && (
            <ErrMsg>이메일을 입력해주세요.</ErrMsg>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <ErrMsg>{errors.email.message}</ErrMsg>
          )}
        </Input>

        {isEmailBut && (
          <Input>
            <div className="flex">
              <div className="flex-1">
                <LoginInput
                  type="text"
                  id="emailCertification"
                  placeholder="인증번호 입력"
                  onKeyDown={e => handleEnter(e, "confirmBut")}
                  {...register("emailCheck", {
                    required: true,
                  })}
                />
                {errors.emailCheck && errors.emailCheck.type === "required" && (
                  <ErrMsg>인증번호를 입력해주세요.</ErrMsg>
                )}
              </div>

              <div className="ml-2">
                <DButton
                  id="confirmBut"
                  onClick={handleEmailCheck}
                  onKeyPress={e => handleEnter(e, "password")}
                >
                  확인
                </DButton>
              </div>
            </div>
          </Input>
        )}

        <div className="mb-10">
          <Input>
            <LoginInput
              type="password"
              id="password"
              placeholder="비밀번호"
              onKeyPress={e => handleEnter(e, "passwordConfrim")}
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
          <Input>
            <LoginInput
              type="password"
              id="passwordConfrim"
              placeholder="비밀번호 확인"
              onKeyPress={e => handleEnter(e, "signupSubmitBut")}
              {...register("passwordCheck", {
                required: true,
                validate: value => value === password.current,
              })}
            />
            {errors.passwordCheck &&
              errors.passwordCheck.type === "required" && (
                <ErrMsg>비밀번호 확인을 입력해주세요.</ErrMsg>
              )}
            {errors.passwordCheck &&
              errors.passwordCheck.type === "validate" && (
                <ErrMsg>비밀번호가 일치하지 않습니다.</ErrMsg>
              )}
          </Input>
        </div>
        <SubmitButton id="signupSubmitBut">회원가입</SubmitButton>
      </form>
    </>
  );
}
