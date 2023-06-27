import { useState } from "react";
import { useForm } from "react-hook-form";

import SubmitButton from "../../Button/SubmitButton";
import { Input, LoginInput, ErrMsg } from "./SigninForm";
import { emailRegex } from "../../../util/Regex";
import MsgModal from "../../Modal/MsgModal";
import { postRePwLinkBut } from "../../../api/signApi";

export default function ForgotPasswordForm() {
  // form을 만들기위한 요소들
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const modalMsg = [
    "입력하신 이메일로 메일이 전송되었습니다.",
    "가입되어 있지 않은 이메일입니다.",
    "서버에러. 관리자에게 문의해주세요.",
  ];
  const [msg, setMsg] = useState<string>(modalMsg[0]);

  // 비밀번호 재설정 버튼 Handler
  const onSubmit = async (data: { email: string }) => {
    const signupSubmit = await postRePwLinkBut({ email: data.email });

    if ((signupSubmit as any).status === 200) {
      setMsg(modalMsg[0]);
    } else if ((signupSubmit as any).status === 404) {
      setMsg(modalMsg[1]);
    } else {
      setMsg(modalMsg[2]);
    }
    setShowModal(true);
  };

  return (
    <>
      {showModal && <MsgModal msg={msg} setOpenModal={setShowModal} />}
      <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h2 className="text-lg font-bold text-MainColor sm:text-xl md:text-2xl">
            비밀번호를 잊어버리셨나요?
          </h2>
          <div className="py-5 text-base md:text-lg">
            <p>
              <span className="mr-2 font-bold text-MainColor">Hobbyt</span>에
              가입했던 이메일을 입력해주세요.
            </p>
            <p>비밀번호 재설정 메일을 보내드립니다</p>
          </div>
        </div>
        <Input>
          <LoginInput
            type="email"
            id="email"
            placeholder="이메일"
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
        <SubmitButton id="signupSubmitBut" onClick={handleSubmit(onSubmit)}>
          비밀번호 재설정하기
        </SubmitButton>

        <p className="py-5 text-sm sm:text-base ">
          만약 비밀번호를 변경하고 싶지 않거나, 본인이 요청한 것이 아닐 경우, 본
          메일은 무시하셔도 됩니다.
        </p>
      </form>
    </>
  );
}
