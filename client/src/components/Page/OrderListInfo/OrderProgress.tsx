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
import example from "src/image/pictureDefalut.svg";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { DButton } from "../../Button/DefalutButton";
import { deleteOrder, patchOrderState } from "../../../api/orderApi";
import DelModal from "../../Modal/DelModal";
import ProgressCategory from "../../Category/ProgressCategory";
import { OrderStatus } from "../../../state/OrderState";
import { OrderDetailProps } from "../../../type/OrderType";
import { orderErrorHandler } from "../../../util/ErrorHandler";
import MsgModal from "../../Modal/MsgModal";
import DMButton from "../../Button/DMButton";

const IconDiv = tw.span`
bg-gray-300 h-[5rem] w-[5rem] rounded-full flex items-center justify-center border-2 border-white
`;

const PgSection = tw.section`
py-10
`;

const PgTitle = tw.div`
flex items-center justify-between
`;

const PgContent = tw.ul`
flex justify-center items-center pt-[4rem]
`;

const PgStatus = tw.li`
text-center
`;

const PgStatusLine = tw.div`
w-14 h-[0.1rem] bg-slate-500
`;

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
  }, [isStatus]);

  console.log(isData);
  return (
    <PgSection>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      {isData && (
        <>
          <PgTitle>
            <div className="flex items-center">
              <span className="w-20 h-20 overflow-hidden rounded-md ring-4 ring-gray-300">
                <Image
                  src={
                    isData.thumbnailImage !== null
                      ? isData.thumbnailImage
                      : example
                  }
                  width={150}
                  height={150}
                  alt="작품 이미지"
                  className="w-20 h-20"
                />
              </span>
              <h2 className="px-6 text-2xl">
                <button
                  className="hover:text-MainColor"
                  onClick={() =>
                    router.push(
                      `/blog/${isData.sellerId}/sale/${isData.saleId}`,
                    )
                  }
                >
                  {isData.title}
                </button>
                {isData.status === "CANCEL" && (
                  <span className="px-6 font-semibold text-red-400">
                    [미입금 주문 취소]
                  </span>
                )}
              </h2>
            </div>
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
                // <DButton className="mr-4 text-black bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:ring-gray-300/50">
                //   채팅하기
                // </DButton>
                // <DButton className="mr-4 text-black bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:ring-gray-300/50">
                //   문의하기
                // </DButton>
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
          </PgTitle>
          <PgContent>
            {(isData.isCanceled && isData.status !== "CANCEL"
              ? refundStateArr
              : stateArr
            ).map(state => (
              <>
                <PgStatus>
                  <IconDiv
                    className={`${
                      orderState >= state.id && "bg-MainColor text-white"
                    }`}
                  >
                    {state.icon}
                  </IconDiv>
                  {state.status}
                </PgStatus>
                {state.id !==
                  (isData.isCanceled && isData.status !== "CANCEL"
                    ? refundStateArr
                    : stateArr
                  ).length -
                    1 && (
                  <PgStatusLine
                    className={`${orderState > state.id && "bg-MainColor/50"}`}
                  />
                )}
              </>
            ))}
          </PgContent>
        </>
      )}
    </PgSection>
  );
}
