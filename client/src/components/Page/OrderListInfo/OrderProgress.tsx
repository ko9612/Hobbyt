import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import {
  RiFileList3Line,
  RiHandHeartLine,
  RiTruckLine,
  RiBankCardLine,
  RiGiftLine,
  RiCheckDoubleFill,
} from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import example from "src/image/pictureDefalut.svg";
import { DButton } from "../../Button/DefalutButton";
import { deleteOrder, patchOrderState } from "../../../api/orderApi";
import DelModal from "../../Modal/DelModal";
import ProgressCategory from "../../Category/ProgressCategory";
import { OrderStatus } from "../../../state/OrderState";
import { OrderDetailProps } from "../../../type/OrderType";
import { orderErrorHandler } from "../../../util/ErrorHandler";
import MsgModal from "../../Modal/MsgModal";
import DMButton from "../../Button/DMButton";

const IconDiv = tw.span`bg-gray-300 h-[5rem] w-[5rem] rounded-full flex items-center 
justify-center border-2 border-white max-sm:h-[3rem] max-sm:w-[3rem] max-sm:p-3`;
const PgSection = tw.section`my-8`;
const PgTitle = tw.div`flex items-center justify-between max-[500px]:flex-col`;
const PgContent = tw.ul`flex justify-evenly items-center pt-[4rem] max-[420px]:flex-wrap`;
const PgStatus = tw.li`flex flex-col items-center text-[12px] sm:text-base max-[420px]:w-1/3 pb-2`;

const stateArr = [
  {
    id: 0,
    status: "주문완료",
    icon: <RiFileList3Line size="2.5rem" />,
  },
  {
    id: 1,
    status: "입금확인",
    icon: <RiBankCardLine size="2.5rem" />,
  },
  {
    id: 2,
    status: "배송준비중",
    icon: <RiGiftLine size="2.5rem" />,
  },
  {
    id: 3,
    status: "배송시작",
    icon: <RiTruckLine size="2.5rem" />,
  },
  {
    id: 4,
    status: "배송완료",
    icon: <RiHandHeartLine size="2.5rem" />,
  },
  {
    id: 5,
    status: "거래종료",
    icon: <RiCheckDoubleFill size="2.5rem" />,
  },
];

const refundStateArr = [
  {
    id: 0,
    status: "환불진행중",
    icon: <RiFileList3Line size="2.5rem" />,
  },
  {
    id: 1,
    status: "환불완료",
    icon: <RiBankCardLine size="2.5rem" />,
  },
];

export interface IDataProps {
  isData: OrderDetailProps | undefined;
}

export default function OrderProgress({ isData }: IDataProps) {
  const router = useRouter();

  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const pid = Number(router.query.id);
  const isStatus = useRecoilValue(OrderStatus);
  const [orderState, setOrderState] = useState(stateArr[0].id);
  // 주문 취소, 거래 종료 버튼 관련
  const [showModalCancle, setShowModalCancle] = useState(false);
  const [showModalFinish, setShowModalFinish] = useState(false);
  const [isOrderCancleBut, setIsOrderCancleBut] = useState(false);
  const [showDropbox, setShowDropBox] = useState(true);

  const DeleteOrder = async () => {
    const delOrderData = await deleteOrder(pid);
    if ((delOrderData as any).status === 200) {
      router.reload();
    } else {
      setShowModalCancle(false);
      orderErrorHandler({ data: delOrderData, setErrMsg, setShowMsgModal });
    }
  };

  const CompleteOrder = async () => {
    const finOrderData = await patchOrderState({ status: "FINISH" }, pid);
    if ((finOrderData as any).status === 200) {
      router.reload();
    } else {
      setShowModalFinish(false);
      orderErrorHandler({ data: finOrderData, setErrMsg, setShowMsgModal });
    }
  };

  useEffect(() => {
    if (
      isData &&
      !isData.isCanceled &&
      (isStatus === "ORDER" || isStatus === "PAYMENT_VERIFICATION")
    ) {
      setIsOrderCancleBut(true);
    } else {
      setIsOrderCancleBut(false);
    }

    if (isStatus === "ORDER") {
      setOrderState(stateArr[0].id);
    } else if (isStatus === "PAYMENT_VERIFICATION") {
      setOrderState(stateArr[1].id);
    } else if (isStatus === "PREPARE_DELIVERY") {
      setOrderState(stateArr[2].id);
    } else if (isStatus === "START_DELIVERY") {
      setOrderState(stateArr[3].id);
    } else if (isStatus === "FINISH_DELIVERY") {
      setOrderState(stateArr[4].id);
    } else if (isStatus === "FINISH") {
      setOrderState(stateArr[5].id);
      setShowDropBox(false);
    } else if (isStatus === "PREPARE_REFUND") {
      setOrderState(refundStateArr[0].id);
    } else if (isStatus === "FINISH_REFUND") {
      setOrderState(refundStateArr[1].id);
      setShowDropBox(false);
    } else if (isStatus === "CANCEL") {
      setShowDropBox(false);
    }
  }, [isData?.status]);

  return (
    <PgSection>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      {isData && (
        <>
          <PgTitle>
            <div className="flex items-center mb-5">
              <span className="w-[5rem] h-[5rem] aspect-square rounded-md ring-4 ring-gray-300">
                <Image
                  src={
                    isData.thumbnailImage !== null
                      ? isData.thumbnailImage
                      : example
                  }
                  width={150}
                  height={150}
                  alt="작품 이미지"
                  className="object-fill w-full h-full rounded-md"
                />
              </span>
              <h2 className="flex flex-wrap items-center px-5 overflow-hidden text-lg font-bold sm:text-xl">
                <button
                  className="px-3 hover:text-MainColor"
                  onClick={() =>
                    router.push(
                      `/blog/${isData.sellerId}/sale/${isData.saleId}`,
                    )
                  }
                >
                  {isData.title}
                </button>
                {isData.status === "CANCEL" && (
                  <span className="px-3 font-semibold text-red-400">
                    [미입금 주문 취소]
                  </span>
                )}
              </h2>
            </div>
            <div>
              {showModalCancle && (
                <DelModal
                  setOpenModal={setShowModalCancle}
                  msg="정말 주문을 취소하시겠습니까?"
                  subMsg={["취소 후, 철회가 불가능합니다."]}
                  afterClick={DeleteOrder}
                  buttonString="주문취소"
                />
              )}
              {showModalFinish && (
                <DelModal
                  setOpenModal={setShowModalFinish}
                  msg="정말 거래를 완료하시겠습니까?"
                  subMsg={["완료 후, 철회가 불가능합니다."]}
                  afterClick={CompleteOrder}
                  buttonString="거래완료"
                />
              )}

              <div className="flex items-center">
                {router.pathname.includes("ordermanagement") ? (
                  <DMButton>채팅하기</DMButton>
                ) : (
                  <DMButton>문의하기</DMButton>
                )}
                {router.pathname.includes("ordermanagement") ? (
                  <div>
                    {showDropbox && (
                      <ProgressCategory
                        isCanceled={isData.isCanceled}
                        orderStatus={isData.status}
                        orderId={pid}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    {isOrderCancleBut ? (
                      <DButton
                        onClick={() => setShowModalCancle(!showModalCancle)}
                      >
                        주문취소
                      </DButton>
                    ) : (
                      !isData.isCanceled && (
                        <DButton
                          disabled={isData.status === "FINISH"}
                          onClick={() => setShowModalFinish(!showModalFinish)}
                        >
                          거래종료
                        </DButton>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </PgTitle>
          <PgContent>
            {(isData.isCanceled && isData.status !== "CANCEL"
              ? refundStateArr
              : stateArr
            ).map((state, idx) => (
              <PgStatus key={idx}>
                <IconDiv
                  className={`${
                    orderState >= state.id && "bg-MainColor text-white"
                  }`}
                >
                  {state.icon}
                </IconDiv>
                <span>{state.status}</span>
              </PgStatus>
            ))}
          </PgContent>
        </>
      )}
    </PgSection>
  );
}
