import dynamic from "next/dynamic";
import { useState, ComponentProps, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import TitleInput from "../../ToastUI/TitleInput";
import ThumbnailInput from "../../ToastUI/ThumbnailInput";
import DefalutTag from "../../Tag/DefalutTag";
import SubmitButton from "../../Button/SubmitButton";
import { SaleWriteProps } from "../../../type/saleType";
import {
  ContentState,
  TitleState,
  TagState,
  PublicState,
  ThumbnailState,
} from "../../../state/BlogPostState";
import { postSaleWrite } from "../../../api/saleApi";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  PostTextArea,
  Sign,
  PostInput,
  SubLabel,
} from "./PostWriteStyle";
import { accountNumRegex } from "../../../util/Regex";
import ProductInfoInput from "./ProductInfoInput";
import { SaleProductList } from "../../../state/SaleState";
import { getUserInfo } from "../../../api/userApi";
import { UserIdState } from "../../../state/UserState";
import MsgModal from "../../Modal/MsgModal";

const ToastEditor = dynamic(() => import("../../ToastUI/TextEditor"), {
  ssr: false,
});

// error msg
// 그냥 필수 입력값 + 제품 정보 1개 이상 없을 시 버튼 disable?

export default function SaleWriteContent() {
  const router = useRouter();
  const [showMsgModal, setShowMsgModal] = useState(false);

  const modalMsg: string[] = [
    "제목을 입력해주세요",
    "제목은 50자를 넘을 수 없습니다",
    "게시글은 300자 이상 작성해야 합니다",
    "환불/교환 안내를 작성해주세요",
    "주의사항을 작성해주세요",
    "제품정보를 등록해주세요",
    "입금계좌 정보를 올바르게 작성해주세요",
    "계좌번호는 10~14자리로 입력해주세요",
    "배송정보를 올바르게 작성해주세요",
    "태그를 1개 이상 입력해주세요",
    "게시글이 등록되었습니다",
    "서버에러. 관리자에게 문의해주세요",
  ];

  const [errMsg, setErrMsg] = useState(modalMsg[0]);

  const [userId] = useRecoilState(UserIdState);
  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [togleData, setTogleData] = useRecoilState(PublicState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [productsData, setProductData] = useRecoilState(SaleProductList);
  const [thumbnail, setThumbnail] = useRecoilState(ThumbnailState);
  const { register, handleSubmit, watch, setValue } = useForm<SaleWriteProps>();

  // 계좌번호: 동적 유효성 검사 위해 useForm 사용x
  const [isAccountNum, setIsAccountNum] = useState("");

  const AccountNumHandler: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    if (accountNumRegex.test(value))
      setIsAccountNum(value.replace(/[^0-9]/g, ""));
  };

  // 입금계좌 정보 default 값 불러오기 위함
  const getUserData = async () => {
    const userInfo = await getUserInfo();

    if ((userInfo as any).status === 200) {
      const { data } = userInfo as any;
      setValue("account.holder", data.account.holder);
      setValue("account.bank", data.account.bank);
      setIsAccountNum(data.account.number);
    } else {
      if ((userInfo as any).status === 404) {
        setErrMsg("존재하지 않는 회원입니다.");
      } else {
        setErrMsg("Server Error");
      }
      setShowMsgModal(true);
    }
  };

  // 페이지 벗어날 시, 데이터 reset
  const resetData = () => {
    setTitleData("");
    setTogleData(true);
    setContentData("");
    setTagData([]);
    setProductData([]);
    setThumbnail(null);
  };

  useEffect(() => {
    getUserData();
    router.events.on("routeChangeStart", resetData);
    router.events.on("routeChangeComplete", resetData);
  }, []);

  // 엔터키 submit 방지
  const preventEnterKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  // 판매글 작성 Submit버튼 핸들러
  const onSubmit = async (data: SaleWriteProps) => {
    const saleData = {
      title: titleData,
      thumbnailImage: thumbnail,
      content: contentData,
      depositEffectiveTime: Number(data.depositEffectiveTime),
      delivery: {
        deliveryTime: data.delivery.deliveryTime,
        deliveryCompany: data.delivery.deliveryCompany,
        deliveryPrice: data.delivery.deliveryPrice,
      },
      caution: data.caution,
      productionProcessLink: data.productionProcessLink,
      tags: tagData,
      account: {
        holder: data.account.holder,
        bank: data.account.bank,
        number: isAccountNum,
      },
      period: {
        startedAt: !togleData ? data.period.startedAt : null,
        endAt: !togleData ? data.period.endAt : null,
      },
      refundExchangePolicy: data.refundExchangePolicy,
      isAlwaysOnSale: togleData,
      products: productsData,
    };

    try {
      if (!titleData) {
        setErrMsg(modalMsg[0]);
      } else if (titleData.length > 50) {
        setErrMsg(modalMsg[1]);
      } else if (!contentData || (contentData && contentData.length < 300)) {
        setErrMsg(modalMsg[2]);
      } else if (!watch("refundExchangePolicy")) {
        setErrMsg(modalMsg[3]);
      } else if (!watch("caution")) {
        setErrMsg(modalMsg[4]);
      } else if (!productsData.length) {
        setErrMsg(modalMsg[5]);
      } else if (
        !(watch("account.holder") && watch("account.bank") && isAccountNum)
      ) {
        setErrMsg(modalMsg[6]);
      } else if (isAccountNum.length < 10 || isAccountNum.length > 14) {
        setErrMsg(modalMsg[7]);
      } else if (
        !(watch("delivery.deliveryCompany") && watch("delivery.deliveryPrice"))
      ) {
        setErrMsg(modalMsg[8]);
      } else if (!tagData?.length) {
        setErrMsg(modalMsg[9]);
      } else {
        const PostSaleWriteData = await postSaleWrite(saleData);
        if ((PostSaleWriteData as any).status === 201) {
          resetData();
          setErrMsg(modalMsg[10]);
          router.replace(
            `/blog/${userId}/sale/${(PostSaleWriteData as any).data}`,
          );
        } else {
          setErrMsg(modalMsg[11]);
        }
      }
      setShowMsgModal(true);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      <form
        role="presentation"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={e => preventEnterKey(e)}
      >
        {/* 제목 */}
        <TitleInput />
        {/* 썸네일 */}
        <ThumbnailInput />
        {/* 본문 */}
        <ToastEditor />
        {/* 환불, 교환 안내 */}
        <PostWriteContent className="pt-[2rem]">
          <PostWriteList>
            <PostWriteLabel htmlFor="refundGuide">
              환불/교환 안내 <Sign>&#42;</Sign>
            </PostWriteLabel>
            <PostTextArea
              id="refundGuide"
              cols={50}
              rows={3}
              maxLength={300}
              {...register("refundExchangePolicy")}
            />
          </PostWriteList>
        </PostWriteContent>
        {/* 제작과정 url */}
        <PostWriteContent>
          <PostWriteList>
            <PostWriteLabel htmlFor="processUrl">제작과정 URL</PostWriteLabel>
            <PostInput
              type="url"
              id="processUrl"
              maxLength={100}
              {...register("productionProcessLink")}
            />
          </PostWriteList>
        </PostWriteContent>
        {/* 판매기간 */}
        <PostWriteContent>
          {!togleData && (
            <PostWriteList>
              <PostWriteLabel htmlFor="startDate">
                판매기간 <Sign>&#42;</Sign>
              </PostWriteLabel>
              <div className="flex flex-wrap items-center">
                <div className="text-sm sm:text-base">
                  <PostInput
                    type="date"
                    id="startDate"
                    placeholder=""
                    min={new Date().toISOString().substring(0, 10)}
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    {...register("period.startedAt", {
                      required: true,
                    })}
                  />
                </div>
                <span className="px-2 text-xl font-extrabold text-MainColor">
                  ~
                </span>
                <SubLabel className="text-sm sm:text-base">
                  <PostInput
                    type="date"
                    id="endDate"
                    {...register("period.endAt", { required: true })}
                  />
                </SubLabel>
              </div>
            </PostWriteList>
          )}
        </PostWriteContent>
        {/* 주의사항 */}
        <PostWriteContent>
          <PostWriteList>
            <PostWriteLabel htmlFor="WarningInput">
              주의사항 <Sign>&#42;</Sign>
            </PostWriteLabel>
            <PostTextArea
              id="WarningInput"
              cols={50}
              rows={3}
              maxLength={30}
              {...register("caution")}
            />
          </PostWriteList>
        </PostWriteContent>
        {/* 제품 정보 추가 */}
        <ProductInfoInput />
        {/* 입금계좌 정보 */}
        <PostWriteContent>
          <PostWriteList>
            <PostWriteLabel htmlFor="accountBank">
              입금계좌 정보 <Sign>&#42;</Sign>
            </PostWriteLabel>
            <div className="flex flex-wrap items-center justify-between text-sm sm:text-base">
              <div className="flex items-center">
                <PostInput
                  type="text"
                  id="holder"
                  maxLength={10}
                  placeholder="예금주"
                  {...register("account.holder")}
                />
                <span className="px-3 text-xl font-extrabold text-MainColor">
                  |
                </span>
                <PostInput
                  type="text"
                  id="accountBank"
                  placeholder="은행명"
                  maxLength={10}
                  {...register("account.bank")}
                />
              </div>
              <PostInput
                type="text"
                id="accountNum"
                placeholder="'-'를 제외한 계좌번호를 입력해주세요"
                value={isAccountNum}
                onChange={AccountNumHandler}
                minLength={10}
              />
            </div>
          </PostWriteList>
        </PostWriteContent>
        {/* 배송 정보 */}
        <PostWriteContent>
          <PostWriteList className="flex flex-col">
            <PostWriteLabel htmlFor="startDate" className="mb-2">
              배송정보 <Sign>&#42;</Sign>
            </PostWriteLabel>
            <div className="px-3 py-2 mb-4 bg-slate-200 rounded-xl">
              <div className="flex items-center text-sm sm:text-base">
                <SubLabel htmlFor="shippingTime" className="mr-2">
                  배송 평균 소요시간
                </SubLabel>
                <div className="flex items-center">
                  <PostInput
                    type="number"
                    id="shippingTime"
                    min={1}
                    max={999}
                    defaultValue={1}
                    {...register("delivery.deliveryTime")}
                  />
                  &nbsp;일
                </div>
              </div>
              <div className="flex items-center">
                <Sign className="pr-2">&#42;</Sign>
                <SubLabel className="pr-2">
                  <PostInput
                    type="text"
                    id="shippingCompany"
                    maxLength={10}
                    placeholder="배송사명"
                    {...register("delivery.deliveryCompany")}
                  />
                </SubLabel>
                <SubLabel>
                  <PostInput
                    type="number"
                    id="shippingFee"
                    placeholder="배송비"
                    min={0}
                    {...register("delivery.deliveryPrice")}
                  />
                </SubLabel>
              </div>
            </div>
          </PostWriteList>
        </PostWriteContent>
        {/* 입금 시간 정보 */}
        <PostWriteContent>
          <PostWriteList className="flex flex-col">
            <PostWriteLabel htmlFor="depositTime" className="mb-2">
              입금시간 정보 <Sign>&#42;</Sign>
            </PostWriteLabel>
            <div className="flex items-center text-sm sm:text-base">
              <SubLabel htmlFor="depositTime" className="mr-2">
                주문 완료 후
              </SubLabel>
              <div className="flex items-center">
                <div className="w-[3rem] sm:w-[4rem]">
                  <PostInput
                    type="number"
                    id="depositTime"
                    min={1}
                    max={99}
                    defaultValue={1}
                    {...register("depositEffectiveTime")}
                  />
                </div>
                &nbsp;시간 이내
              </div>
            </div>
          </PostWriteList>
        </PostWriteContent>
        {/* 태그 */}
        <DefalutTag />
        <div className="flex justify-center px-5">
          <SubmitButton id="salePostSubmit" onClick={handleSubmit(onSubmit)}>
            등록
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
