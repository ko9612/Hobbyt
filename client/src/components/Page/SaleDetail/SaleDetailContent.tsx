import tw from "tailwind-styled-components";
import { ComponentProps, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import ProductTitle from "./ProductTitle";
import ProductContent from "./ProductContent";
import ProductGuide from "./ProductGuide";
import Agreement from "./Agreement";
import { BlogContent } from "../../../../pages/blog";
import { WideB } from "../../Button/SubmitButton";
import PaymentModal from "../../Modal/PaymentModal";
import { getSaleDetail } from "../../../api/saleApi";
import {
  SaleDetailProps,
  SelectPdList,
  OrderInputProps,
} from "../../../type/saleType";
import {
  SaleDetailState,
  OrderAgreeState,
  SelectdPdList,
  totalState,
} from "../../../state/SaleState";
import DelModal from "../../Modal/DelModal";
import ProductList from "./ProductList";
import { getUserInfo } from "../../../api/userApi";
import { phoneNumRegex, accountNumRegex } from "../../../util/Regex";
import {
  EmailState,
  UserRecipientStreetState,
  UserRecipientZipCodeState,
  UserRecipientDetailState,
} from "../../../state/UserState";
import MsgModal from "../../Modal/MsgModal";
import { Input } from "../UserInfo/InfoStyle";
import AddressApi from "../UserInfo/AddressApi";

const PurForm = tw.section``;
const PurContent = tw.div`py-2`;
const PurContentInput = tw.div`py-2 flex items-center flex-wrap`;
const PurInputDiv = tw.div`w-1/2`;

export default function SaleDetailContent() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [SaleData, setSaleData] =
    useRecoilState<SaleDetailProps>(SaleDetailState);
  const priceSum = useRecoilValue(totalState);
  const [isAgree] = useRecoilState(OrderAgreeState);
  // 선택 제품 list state
  const [, setSelectItem] = useRecoilState<SelectPdList[]>(SelectdPdList);
  const [email] = useRecoilState<string | undefined>(EmailState);
  const [isZipcode, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [isStreet, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [isDetail, setIsDetail] = useRecoilState(UserRecipientDetailState);

  const [isPurchaserPhone, setisPurchaserPhone] = useState("");
  const [isReceiverPhone, setIsReceiverPhone] = useState("");
  const [isAccountNum, setIsAccountNum] = useState("");
  const { register, setValue, watch } = useForm<OrderInputProps>();

  const [showMsgModal, setShowMsgModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const modalMsg = [
    "휴대폰번호 형식이 올바르지 않습니다.",
    "연락처 형식이 올바르지 않습니다.",
    "주문하실 제품을 선택해주세요.",
  ];
  const [msg, setMsg] = useState<string>(modalMsg[0]);

  // 판매 상세 데이터 get
  const getSaleData = async () => {
    const saleDetail = await getSaleDetail(pid);
    setSaleData((saleDetail as any).data);

    // 제품 list 복사 후, 제품 item Object에 새 key 추가
    const copySelectItem = [...(saleDetail as any).data.products].map(el => ({
      ...el,
      quantity: 0,
    }));
    setSelectItem(copySelectItem);
    // if ((saleDetail as any).status === 200) {
    //   setSaleData((saleDetail as any).data);

    //   // 제품 list 복사 후, 제품 item Object에 새 key 추가
    //   const copySelectItem = [...(saleDetail as any).data.products].map(el => ({
    //     ...el,
    //     quantity: 0,
    //   }));
    //   setSelectItem(copySelectItem);
    // } else {
    //   alert("잘못된 요청입니다.");
    //   router.back();
    // }
  };

  // 주문 입력 default data get
  const getInputData = async () => {
    const userInfo = await getUserInfo();

    if ((userInfo as any).status === 200) {
      // setUserInfoData((userInfo as any).data);
      const { data } = userInfo as any;

      // 입금자 정보
      setValue("holder", data.account.holder);

      // 주문자 정보
      setValue("orderer.name", data.recipient.name);
      setisPurchaserPhone(data.recipient.phoneNumber);
      setValue("orderer.email", email);

      // 배송정보
      setIsZipcode(data.recipient.address.zipcode);
      setIsStreet(data.recipient.address.street);
      setIsDetail(data.recipient.address.detail);

      // 환불계좌 정보
      setValue("account.holder", data.account.holder);
      setValue("account.bank", data.account.bank);
      setIsAccountNum(data.account.number);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getSaleData();
      getInputData();
    }
  }, [router.isReady]);

  // 계좌, 휴대폰 번호 하이픈 replace 때문에 useForm x
  const purchaserPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    if (phoneNumRegex.test(e.target.value))
      setisPurchaserPhone(e.target.value.replace(/[^0-9]/g, ""));
  };

  const receiverPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    if (phoneNumRegex.test(e.target.value)) {
      setIsReceiverPhone(e.target.value.replace(/[^0-9]/g, ""));
    }
  };

  const AccountNumlHandler: ComponentProps<"input">["onChange"] = e => {
    if (accountNumRegex.test(e.target.value)) {
      setIsAccountNum(e.target.value.replace(/[^0-9]/g, ""));
    }
  };

  // 주문자 정보와 동일 체크박스 핸들러
  const checkOrdererHandler: ComponentProps<"input">["onClick"] = e => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setValue("recipient.name", watch("orderer.name"));
      setIsReceiverPhone(isPurchaserPhone);
    } else {
      setValue("recipient.name", "");
      setIsReceiverPhone("");
    }
  };

  // 주문하기 버튼 핸들러
  const OrderButtonHandler: ComponentProps<"button">["onClick"] = e => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("authorization")) {
        setShowMsgModal(!showMsgModal);
      } else if (isPurchaserPhone.length < 11) {
        setMsg(modalMsg[0]);
        setErrorModal(true);
      } else if (isReceiverPhone.length < 11) {
        setMsg(modalMsg[1]);
        setErrorModal(true);
      } else if (!priceSum.total) {
        setMsg(modalMsg[2]);
        setErrorModal(true);
      } else {
        setShowPaymentModal(!showPaymentModal);
      }
    }
  };

  return (
    <BlogContent className="px-5">
      <ProductTitle />
      <ProductContent />
      <ProductGuide id={pid} />
      {/* 제품 선택 */}
      <ProductList />
      {/* 주문 정보 입력 */}
      <PurForm>
        <PurContent>
          <ul className="font-semibold">배송</ul>
          <li className="p-2">
            우체국택배{" "}
            <span className="font-semibold">
              +{SaleData.delivery.deliveryPrice}
            </span>{" "}
            원
          </li>
        </PurContent>
        <PurContent>
          <ul className="font-semibold">입금시간</ul>
          <li className="p-2">
            주문완료 후{" "}
            <span className="font-semibold">
              {SaleData.depositEffectiveTime}
            </span>{" "}
            시간 이내
          </li>
        </PurContent>
        <PurContent>
          <div className="font-semibold">입금자 정보</div>
          <PurContentInput>
            <PurInputDiv>
              <Input
                type="text"
                id="depositerName"
                placeholder="입금자명"
                maxLength={10}
                {...register("holder")}
              />
            </PurInputDiv>
            <PurInputDiv className="pl-4">
              <div className=" bg-slate-100 px-2 py-1 rounded-lg border border-slate-300">
                {priceSum.total + Number(SaleData.delivery.deliveryPrice)}
              </div>
            </PurInputDiv>
          </PurContentInput>
        </PurContent>
        <PurContent>
          <div className="font-semibold">주문자 정보</div>
          <PurContentInput>
            <PurInputDiv>
              <Input
                type="text"
                id="purchaserName"
                placeholder="주문자명"
                maxLength={10}
                {...register("orderer.name")}
              />
            </PurInputDiv>
            <PurInputDiv className="pl-4">
              <Input
                type="tel"
                id="purchaserTel"
                placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
                value={isPurchaserPhone}
                minLength={11}
                onChange={e => purchaserPhonelHandler(e)}
              />
            </PurInputDiv>
            <PurInputDiv className="mt-2">
              <Input
                type="text"
                id="purchaserEmail"
                placeholder="주문자 이메일"
                maxLength={30}
                {...register("orderer.email")}
              />
            </PurInputDiv>
          </PurContentInput>
        </PurContent>
        <PurContent>
          <div className="flex items-center">
            <div className="font-semibold">배송 정보</div>
            <p className="text-sm pl-4 pr-2">주문자 정보와 동일</p>
            <input type="checkbox" onClick={e => checkOrdererHandler(e)} />
          </div>
          <PurContentInput>
            <PurInputDiv>
              <Input
                type="text"
                id="receiverName"
                placeholder="수령자명"
                maxLength={10}
                {...register("recipient.name")}
              />
            </PurInputDiv>
            <PurInputDiv className="pl-4">
              <Input
                type="tel"
                id="purchaserTel"
                placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
                value={isReceiverPhone}
                minLength={11}
                onChange={e => receiverPhonelHandler(e)}
              />
            </PurInputDiv>
            {/* 우편번호 검색 & 주소 */}
            <AddressApi />
          </PurContentInput>
        </PurContent>
        <PurContent>
          <div className="font-semibold">환불계좌 정보</div>
          <PurContentInput>
            <PurInputDiv className="w-1/5">
              <Input
                type="text"
                id="holderName"
                maxLength={10}
                placeholder="예금주"
                {...register("account.holder")}
              />
            </PurInputDiv>
            <PurInputDiv className="w-1/5 px-4">
              <Input
                type="text"
                id="bankName"
                placeholder="은행명"
                maxLength={10}
                {...register("account.bank")}
              />
            </PurInputDiv>
            <PurInputDiv className="w-3/5">
              <Input
                type="text"
                id="accountNumber"
                placeholder="'-'를 제외한 계좌번호를 입력해주세요"
                value={isAccountNum}
                minLength={10}
                onChange={e => AccountNumlHandler(e)}
              />
            </PurInputDiv>
          </PurContentInput>
        </PurContent>
        <Agreement />
        <div className="pt-10">
          {showPaymentModal && (
            <PaymentModal
              setOpenModal={setShowPaymentModal}
              seller={SaleData.account.holder}
              bank={SaleData.account.bank}
              number={SaleData.account.number}
            />
          )}
          {showMsgModal && (
            <DelModal
              setOpenModal={setShowMsgModal}
              msg="로그인 후 이용 가능합니다."
              subMsg={["로그인 페이지로 이동하시겠습니까?"]}
              buttonString="페이지 이동"
              afterClick={() => {
                router.push("/signin");
              }}
            />
          )}
          {errorModal && <MsgModal msg={msg} setOpenModal={setErrorModal} />}
          <WideB
            onClick={e => OrderButtonHandler(e)}
            disabled={
              !(
                watch("holder") &&
                watch("orderer.name") &&
                isPurchaserPhone &&
                watch("orderer.email") &&
                watch("recipient.name") &&
                watch("recipient.name") &&
                isReceiverPhone &&
                isZipcode &&
                isStreet &&
                isDetail &&
                watch("account.holder") &&
                watch("account.bank") &&
                isAccountNum &&
                isAgree
              )
            }
          >
            주문하기
          </WideB>
        </div>
      </PurForm>
    </BlogContent>
  );
}
