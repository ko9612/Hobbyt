import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
// import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
} from "./InfoStyle";
import { DButton } from "../../Button/DefalutButton";
import { PasswordProps } from "../../../type/userTypes";
import { passwordRegex } from "../../../util/Regex";
import MsgModal from "../../Modal/MsgModal";
import { patchPaswword } from "../../../api/userApi";
import { ErrMsg } from "../Sign/SigninForm";
import { OauthState } from "../../../state/UserState";

export default function PasswordInfo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordProps>();

  const oauthLogin = useRecoilValue(OauthState);
  // 리렌더링 방지
  const newPassword = useRef<string | null>();
  newPassword.current = watch("newPassword");

  // 모달
  const [showModal, setShowModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  // 비밀번호 변경 핸들러
  const passwordEditSubmit = async (data: PasswordProps) => {
    // 현재 비밀번호는 서버에서 관리, 에러 처리 후 modal 띄우기

    // if (data.oldPassword !== isPassword) {
    //   setMsg("현재 비밀번호가 일치하지 않습니다.");
    //   setShowModal(true);
    // } else

    if (data.oldPassword === data.newPassword) {
      setMsg("현재 비밀번호와 다른 비밀번호를 입력해주세요.");
      setShowModal(true);
    } else {
      const passwordData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        checkPassword: data.checkPassword,
      };

      const passwordSubmit = await patchPaswword(passwordData);
      // 에러처리 나중에
      if ((passwordSubmit as any).status === 200) {
        setMsg("비밀번호가 변경되었습니다.");
        setShowModal(true);
      }
      console.log(passwordSubmit);
    }
    // switch ((passwordSubmit as any).status) {
    //   case 200:
    //   setMsg("비밀번호가 변경되었습니다.");
    //   setPassword(data.newPassword);
    //     break;
    //   default:
    // }
  };

  return (
    <>
      {showModal && <MsgModal msg={msg} setOpenModal={setShowModal} />}
      <InfoSection>
        <div className="flex items-center justify-between">
          <InfoTitle>비밀번호 설정</InfoTitle>
          <p className="text-sm text-gray-500">
            ※ 비밀번호는 8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서
            사용하실 수 있습니다.
          </p>
        </div>
        <InfoContent onSubmit={handleSubmit(passwordEditSubmit)}>
          <EditList>
            <InputLabel htmlFor="oldPassword">현재 비밀번호</InputLabel>
            <InputDiv>
              <Input
                type="password"
                id="oldPassword"
                {...register("oldPassword", {
                  required: true,
                  pattern: {
                    value: passwordRegex,
                    message:
                      "8~15자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.",
                  },
                })}
              />
              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <ErrMsg>새 비밀번호를 입력해주세요.</ErrMsg>
              )}
              {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                <ErrMsg>{errors.oldPassword.message}</ErrMsg>
              )}
            </InputDiv>
          </EditList>
          <EditList>
            <InputLabel htmlFor="newPassword">새 비밀번호 </InputLabel>
            <InputDiv>
              <Input
                type="password"
                id="newPassword"
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
                <ErrMsg>새 비밀번호를 입력해주세요.</ErrMsg>
              )}
              {errors.newPassword && errors.newPassword.type === "pattern" && (
                <ErrMsg>{errors.newPassword.message}</ErrMsg>
              )}
            </InputDiv>
          </EditList>
          <EditList>
            <InputLabel htmlFor="checkPassword">새 비밀번호 확인</InputLabel>
            <InputDiv>
              <Input
                type="password"
                id="checkPassword"
                {...register("checkPassword", {
                  required: true,
                  validate: value => value === newPassword.current,
                })}
              />
              {errors.checkPassword &&
                errors.checkPassword.type === "required" && (
                  <ErrMsg>새 비밀번호 확인을 입력해주세요.</ErrMsg>
                )}
              {errors.checkPassword &&
                errors.checkPassword.type === "validate" && (
                  <ErrMsg>새 비밀번호가 일치하지 않습니다.</ErrMsg>
                )}
            </InputDiv>
          </EditList>
          <div className="flex justify-end items-center">
            {oauthLogin && (
              <p className="text-sm text-red-400 px-6">
                소셜 로그인 회원은 비밀번호 변경이 불가합니다.
              </p>
            )}
            <DButton id="passwordEdit" disabled={oauthLogin === true}>
              비밀번호 변경
            </DButton>
          </div>
        </InfoContent>
      </InfoSection>
    </>
  );
}
