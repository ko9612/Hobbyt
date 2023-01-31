import { ComponentProps, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  EmailState,
  LoginState,
  NicknameState,
  UserIdState,
  UserPhoneNumState,
} from "../../../state/UserState";
import { delAccount } from "../../../api/signApi";
import DelModal from "../../Modal/DelModal";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
} from "./InfoStyle";
import { phoneNumRegex } from "../../../util/Regex";

export default function AccountInfo() {
  const router = useRouter();
  const [, setLogin] = useRecoilState(LoginState);
  const [isEmail, setEmailState] = useRecoilState(EmailState);
  const [, setIsNickname] = useRecoilState(NicknameState);
  const [, setIsUserId] = useRecoilState(UserIdState);
  const [isEditPhone, setIsEditPhone] = useRecoilState(UserPhoneNumState);
  const [showModal, setShowModal] = useState(false);

  // userEmail 가져오는 함수
  const getUserEmail = () => {
    if (typeof window !== "undefined") {
      if (isEmail) {
        setEmailState(isEmail);
      }
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  // 휴대폰번호 handler
  const EditPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    if (phoneNumRegex.test(value)) setIsEditPhone(value.replace(/[^0-9]/g, ""));
  };

  // 회원탈퇴
  const delAccountClick = async () => {
    const delAccountSubmit = await delAccount();
    if ((delAccountSubmit as any).status === 200) {
      localStorage.clear();
      setLogin(false);
      setEmailState("");
      setIsUserId(0);
      setIsNickname("");
      setShowModal(false);
      router.push("/");
    }
  };

  return (
    <>
      {showModal && (
        <DelModal
          msg="Hobbyt 회원을 정말 탈퇴하시겠습니까?"
          subMsg={["정말로 떠나시는 건가요?", "다시 한 번 생각해주세요 😢"]}
          buttonString="탈퇴"
          setOpenModal={setShowModal}
          afterClick={delAccountClick}
        />
      )}
      <InfoSection>
        <InfoTitle>계정 정보</InfoTitle>
        <InfoContent>
          {/* 이메일 수정 불가능 */}
          <EditList>
            <InputLabel>이메일</InputLabel>
            <div className=" px-2 py-1 w-3/5">{isEmail}</div>
          </EditList>
          <EditList>
            <InputLabel htmlFor="phoneNumber">휴대폰 번호</InputLabel>
            <InputDiv>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
                value={isEditPhone}
                onChange={e => EditPhonelHandler(e)}
              />
            </InputDiv>
          </EditList>
          <div className="text-sm text-gray-500 text-end ">
            <button
              type="button"
              className="focus:underline hover:underline"
              onClick={() => setShowModal(true)}
            >
              회원탈퇴
            </button>
          </div>
        </InfoContent>
      </InfoSection>
    </>
  );
}
