import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrMsg, Input, LoginInput } from "./SigninForm";
import { useRef } from "react";
import MsgModal from "../../Modal/MsgModal";
import SubmitButton from "../../Button/SubmitButton";
import { passwordRegex } from "../../../util/Regex";
import { PatchPasswordProps } from "../../../type/userTypes";
import { patchRePassword } from "../../../api/signApi";
import DelModal from "../../Modal/DelModal";

export default function PatchForgotPassword() {
const router = useRouter();
const [tokenData, setTokenData] = useState<string>("");
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
} = useForm<PatchPasswordProps>();

const newpassword = useRef<string | null>();
newpassword.current = watch("newPassword");

const [showMsgModal, setShowMsgModal] = useState(false);
const [showModal, setShowModal] = useState<boolean>(false);

const modalMsg = [
  "비밀번호가 변경되었습니다.",
  "기존 비밀번호와 같은 비밀번호입니다.",
  "서버에러. 관리자에게 문의해주세요.",
];
const [msg, setMsg] = useState<string>(modalMsg[0]);

const onSubmit = async (data: PatchPasswordProps) => {

    const rePasswordData = {
        password: data.newPassword
    }
      const signupSubmit = await patchRePassword(rePasswordData,tokenData);
      if ((signupSubmit as any).status === 200) {
        setMsg(modalMsg[0]);
        setShowMsgModal(true);
      } else if ((signupSubmit as any).status === 401) {
        setMsg(modalMsg[1]);
        setShowModal(true);
      } else {
        setMsg(modalMsg[2]);
        setShowModal(true);
      }
    }

  useEffect(() => {
    if (router.isReady) {
        setTokenData(String(router.query.token));
      }
  }, [router.isReady]);

  return (
    <>
     {showModal && <MsgModal msg={msg} setOpenModal={setShowModal} />}
      {showMsgModal && (
        <DelModal
          setOpenModal={setShowMsgModal}
          msg={modalMsg[0]}
          subMsg={["로그인 페이지로 이동하시겠습니까?"]}
          buttonString="페이지 이동"
          afterClick={() => {
            router.replace("/signin");
          }}
        />
      )}
        <div>
        <h2 className="p-8 font-bold text-2xl text-MainColor">비밀번호 재설정</h2>
        <p>새로운 비밀번호를 입력해주세요.</p>
        <p className="text-sm text-gray-500">
            ※ 비밀번호는 8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서
            사용하실 수 있습니다.
        </p>
        </div>
        <form className="">
          <Input>
            <LoginInput
              type="password"
              id="newPassword"
              placeholder="비밀번호"
              {...register("newPassword", {
                required: true,
                pattern: {
                  value: passwordRegex,
                  message:
                    "8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.",
                },
              })}
            />
            {errors.newPassword && errors.newPassword.type === "required" && (
              <ErrMsg>비밀번호를 입력해주세요.</ErrMsg>
            )}
            {errors.newPassword && errors.newPassword.type === "pattern" && (
              <ErrMsg>{errors.newPassword.message}</ErrMsg>
            )}
          </Input>
          <Input>
            <LoginInput
              type="password"
              id="checkPassword"
              placeholder="비밀번호 확인"
              {...register("checkPassword", {
                required: true,
                validate: value => value === newpassword.current,
              })}
            />
            {errors.checkPassword &&
              errors.checkPassword.type === "required" && (
                <ErrMsg>비밀번호 확인을 입력해주세요.</ErrMsg>
              )}
            {errors.checkPassword &&
              errors.checkPassword.type === "validate" && (
                <ErrMsg>비밀번호가 일치하지 않습니다.</ErrMsg>
              )}
          </Input>
        <SubmitButton id="signupSubmitBut" onClick={handleSubmit(onSubmit)}>
          비밀번호 변경
        </SubmitButton>
        </form>
    </>
  );
}
