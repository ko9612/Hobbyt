import { useRecoilState } from "recoil";
import { BsEnvelopeFill } from "react-icons/bs";
import { useState, ComponentProps } from "react";
import { useRouter } from "next/router";
import { signUpName, signUpEmail, signUpPW } from "../../../state/signupState";
import { WideB } from "../../Button/SubmitButton";
import { DButton } from "../../Button/DefalutButton";
import { Input, LoginInput, ErrMsg } from "./SigninForm";
import { emailRegex, passwordRegex } from "../../../util/Regex";
import MsgModal from "../../Modal/MsgModal";
import { postsignupSubmit, postSignupEmailBut } from "../../../api/signupApi";

export default function SignupForm() {
  const router = useRouter();

  // input value
  const [nickname, setNickname] = useRecoilState(signUpName);
  const [email, setEmail] = useRecoilState(signUpEmail);
  const [password, setPassword] = useRecoilState(signUpPW);
  const [rePassword, setRePassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");

  // err msg
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [rePasswordMsg, setRePasswordMsg] = useState("");

  // 유효성 검사
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isRePassword, setIsRePassword] = useState(false);

  // 이메일 인증코드 전송 및 인증 완료 버튼
  const [isEmailBut, setIsEmailBut] = useState(false);
  const [emailComplete, setEmailComplete] = useState(false);

  // 이메일 인증코드
  const [certificationCode, setCertificationCode] = useState("");

  const [showModal, setShowModal] = useState(false);
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
  const [msg, setMsg] = useState(modalMsg[0]);

  const nicknameHandler: ComponentProps<"input">["onChange"] = e => {
    setNickname(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 6) {
      setNicknameMsg("닉네임은 2~6글자로 설정할 수 있습니다.");
      setIsNickname(false);
    } else {
      setNicknameMsg("");
      setIsNickname(true);
    }
  };

  const emailHandler: ComponentProps<"input">["onChange"] = e => {
    setEmail(e.target.value);

    if (!emailRegex.test(e.target.value)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다");
      setIsEmail(false);
    } else {
      setEmailMsg("");
      setIsEmail(true);
    }
  };

  const emailCheckHandler: ComponentProps<"input">["onChange"] = e => {
    setEmailCheck(e.target.value);
  };

  const passwordHandler: ComponentProps<"input">["onChange"] = e => {
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMsg(
        "8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.",
      );
      setIsPassword(false);
    } else {
      setPasswordMsg("");
      setIsPassword(true);
    }
  };

  const rePasswordHandler: ComponentProps<"input">["onChange"] = e => {
    setRePassword(e.target.value);

    if (password !== e.target.value) {
      setRePasswordMsg("비밀번호가 일치하지 않습니다.");
      setIsRePassword(false);
    } else {
      setIsRePassword(true);
    }
  };

  // 회원가입 버튼 Handler
  const handleSubmit: ComponentProps<"button">["onClick"] = async e => {
    e.preventDefault();

    if (!emailComplete) {
      setMsg(modalMsg[6]);
      setShowModal(true);
    } else {
      const signupData = {
        nickname,
        email,
        password,
      };

      // 중복 이메일, 중복 닉네임xxx

      const signupSubmit = await postsignupSubmit(signupData);

      switch ((signupSubmit as any).status) {
        case 201:
          setMsg(modalMsg[0]);
          setShowModal(true);
          if (!showModal) {
            router.push("/signin");
          }
          console.log(signupSubmit);
          break;
        default:
      }
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
  const handleEmailBut: ComponentProps<"button">["onClick"] = async e => {
    e.preventDefault();
    setIsEmailBut(true);
    const emailData = {
      email,
    };
    const emailCheckBut = await postSignupEmailBut(emailData);
    // console.log((emailCheckBut as any).status);
    switch ((emailCheckBut as any).status) {
      case 201:
        setMsg(modalMsg[1]);
        setShowModal(true);
        setIsEmailBut(true);
        setCertificationCode((emailCheckBut as any).data);
        console.log(certificationCode);
        break;
      default:
    }
  };

  // 이메일 인증 확인 버튼 Handler
  const handleEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (emailCheck?.length === 0) {
      setMsg(modalMsg[2]);
      setShowModal(true);
    } else if (emailCheck !== certificationCode) {
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
      <form className="mb-10">
        <Input>
          <LoginInput
            type="text"
            id="name"
            placeholder="닉네임"
            maxLength={6}
            value={nickname}
            onChange={nicknameHandler}
            onKeyPress={e => handleEnter(e, "email")}
          />
          {!isNickname && <ErrMsg>{nicknameMsg}</ErrMsg>}
        </Input>

        <Input>
          <div className="flex">
            <div className="flex-1">
              <LoginInput
                type="email"
                id="email"
                placeholder="이메일"
                maxLength={25}
                value={email}
                onChange={emailHandler}
                onKeyDown={e => handleEnter(e, "emailCertificBut")}
              />
            </div>
            <div className="ml-2">
              <DButton
                id="emailCertificBut"
                onClick={handleEmailBut}
                onKeyDown={e => handleEnter(e, "emailCertification")}
                disabled={!isEmail && true}
              >
                <BsEnvelopeFill size="25px" />
              </DButton>
            </div>
          </div>
          {email.length > 5 && !isEmail && <ErrMsg>{emailMsg}</ErrMsg>}
        </Input>

        {isEmailBut && (
          <Input>
            <div className="flex">
              <div className="flex-1">
                <LoginInput
                  type="text"
                  id="emailCertification"
                  placeholder="인증번호 입력"
                  maxLength={10}
                  value={emailCheck}
                  onChange={emailCheckHandler}
                  onKeyDown={e => handleEnter(e, "confirmBut")}
                />
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
              maxLength={15}
              value={password}
              onChange={passwordHandler}
              onKeyPress={e => handleEnter(e, "passwordConfrim")}
            />
            {!isPassword && <ErrMsg>{passwordMsg}</ErrMsg>}
          </Input>
          <Input>
            <LoginInput
              type="password"
              id="passwordConfrim"
              placeholder="비밀번호 확인"
              maxLength={15}
              value={rePassword}
              onChange={rePasswordHandler}
              onKeyPress={e => handleEnter(e, "signupSubmitBut")}
            />
            {(!isRePassword || password !== rePassword) && (
              <ErrMsg>{rePasswordMsg}</ErrMsg>
            )}
          </Input>
        </div>
        <WideB
          id="signupSubmitBut"
          disabled={
            (!isNickname || !isEmail || !isPassword || !isRePassword) && true
          }
          onClick={handleSubmit}
        >
          회원가입
        </WideB>
      </form>
    </>
  );
}
