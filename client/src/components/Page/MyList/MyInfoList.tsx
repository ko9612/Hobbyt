import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import AccountInfo from "../UserInfo/AccountInfo";
import PasswordInfo from "../UserInfo/PasswordInfo";
import AddressInfo from "../UserInfo/AddressInfo";
import RefundInfo from "../UserInfo/RefundInfo";
import SubmitButton from "../../Button/SubmitButton";
import { MyInfoProps } from "../../../type/userTypes";
import { getUserInfo, patchUserInfo } from "../../../api/userApi";
import {
  UserPhoneNumState,
  UserRecipientPhoneState,
  UserRecipientNameState,
  UserRecipientZipCodeState,
  UserRecipientStreetState,
  UserRecipientDetailState,
  UserRefundHolderState,
  UserRefundBankState,
  UserRefundNumState,
} from "../../../state/UserState";
import MsgModal from "../../Modal/MsgModal";

const InfoContent = tw.main`
justify-center items-center mx-auto
`;

export default function MyInfoList() {
  const [isPhoneNum, setPhoneNum] =
    useRecoilState<MyInfoProps["phoneNumber"]>(UserPhoneNumState);
  const [isRecipientName, setIsRecipientName] = useRecoilState(
    UserRecipientNameState,
  );
  const [isRecipientContact, setIsRecipientContact] = useRecoilState(
    UserRecipientPhoneState,
  );
  const [isZipcode, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [isStreet, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [isDetail, setIsDetail] = useRecoilState(UserRecipientDetailState);
  const [isHolder, setIsHolder] = useRecoilState(UserRefundHolderState);
  const [isBank, setIsBank] = useRecoilState(UserRefundBankState);
  const [isAccountNum, setIsAccountNum] = useRecoilState(UserRefundNumState);

  // 모달
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalMsg = [
    "휴대폰번호 형식이 올바르지 않습니다.",
    "연락처 형식이 올바르지 않습니다.",
    "저장되었습니다.",
    "서버에러. 관리자에게 문의해주세요.",
  ];
  const [msg, setMsg] = useState<string>(modalMsg[0]);

  // 유저 정보 불러오는 함수
  const getUserData = async () => {
    const userInfo = await getUserInfo();

    if ((userInfo as any).status === 200) {
      const { data } = userInfo as any;
      setPhoneNum(data.phoneNumber);
      setIsRecipientName(data.recipient.name);
      setIsRecipientContact(data.recipient.phoneNumber);
      setIsZipcode(data.recipient.address.zipcode);
      setIsStreet(data.recipient.address.street);
      setIsDetail(data.recipient.address.detail);
      setIsHolder(data.account.holder);
      setIsBank(data.account.bank);
      setIsAccountNum(data.account.number);
    } else {
      setMsg("Server Error");
      setShowModal(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const { handleSubmit } = useForm<MyInfoProps>();

  const onSubmit = async () => {
    if (
      (isPhoneNum && isPhoneNum.slice(0, 3) !== "010") ||
      (isPhoneNum && isPhoneNum.length < 11)
    ) {
      setMsg(modalMsg[0]);
    } else if (
      (isRecipientContact && isRecipientContact.slice(0, 3) !== "010") ||
      (isRecipientContact && isRecipientContact.length < 11)
    ) {
      setMsg(modalMsg[1]);
    } else {
      const EditData = {
        phoneNumber: isPhoneNum,
        recipient: {
          address: {
            zipcode: isZipcode,
            street: isStreet,
            detail: isDetail,
          },
          name: isRecipientName,
          phoneNumber: isRecipientContact,
        },
        account: {
          holder: isHolder,
          bank: isBank,
          number: isAccountNum,
        },
      };

      const EditSubmit = await patchUserInfo(EditData);

      // 에러처리 나중에
      if ((EditSubmit as any).status === 200) {
        setMsg(modalMsg[2]);
      } else {
        setMsg(modalMsg[3]);
      }
    }
    setShowModal(true);
  };

  return (
    <>
      {showModal && <MsgModal msg={msg} setOpenModal={setShowModal} />}
      <InfoContent>
        <PasswordInfo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <AccountInfo />
          <AddressInfo />
          <RefundInfo />
          <div className="pt-20">
            <SubmitButton id="myInfoSubmit" onClick={() => onSubmit()}>
              내 정보 저장하기
            </SubmitButton>
          </div>
        </form>
      </InfoContent>
    </>
  );
}
