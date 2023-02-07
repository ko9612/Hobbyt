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
import example from "src/image/header_ex.jpg";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { DButton } from "../../Button/DefalutButton";
import { deleteOrder, patchOrderState } from "../../../api/OrderApi";
import DelModal from "../../Modal/DelModal";
import { OrderDetailState } from "../../../state/OrderState";

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

export default function OrderProgress() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [orderState, setOrderState] = useState(stateArr[0].id);

  // 주문 취소, 거래 종료 버튼 관련
  const [showModalCancle, setShowModalCancle] = useState(false);
  const [showModalFinish, setShowModalFinish] = useState(false);
  const [isOrderCancleBut, setIsOrderCancleBut] = useState(false);
  const orderData = useRecoilValue(OrderDetailState);

  const DeleteOrder = async () => {
    const delOrderData = await deleteOrder(pid);
    if ((delOrderData as any).status === 200) {
      router.reload();
    }
  };

  const CompleteOrder = async () => {
    const finOrderData = await patchOrderState({ status: "FINISH" }, pid);
    if ((finOrderData as any).status === 200) {
      router.reload();
    }
  };
  console.log(orderData);
  useEffect(() => {
    if (orderData) {
      if (
        !orderData.isCanceled &&
        (orderData.status === "ORDER" ||
          orderData.status === "PAYMENT_VERIFICATION")
      ) {
        setIsOrderCancleBut(true);
      } else {
        setIsOrderCancleBut(false);
      }

      if (orderData.status === "ORDER") {
        setOrderState(stateArr[0].id);
      } else if (orderData.status === "PAYMENT_VERIFICATION") {
        setOrderState(stateArr[1].id);
      } else if (orderData.status === "PREPARE_DELIVERY") {
        setOrderState(stateArr[2].id);
      } else if (orderData.status === "START_DELIVERY") {
        setOrderState(stateArr[3].id);
      } else if (orderData.status === "FINISH_DELIVERY") {
        setOrderState(stateArr[4].id);
      } else if (orderData.status === "FINISH") {
        setOrderState(stateArr[5].id);
      } else if (orderData.status === "PREPARE_REFUND") {
        setOrderState(refundStateArr[0].id);
      } else if (orderData.status === "FINISH_REFUND") {
        setOrderState(refundStateArr[1].id);
      }
    }
  }, [orderData && orderData.status]);

  return (
    <PgSection>
      {orderData && (
        <>
          <PgTitle>
            <div className="flex items-center">
              <span className="w-20 h-20 bg-black overflow-hidden rounded-md ring-4 ring-gray-300">
                <Image
                  src={orderData.thumbnailImage || example}
                  alt="작품 이미지"
                  className="w-20 h-20"
                />
              </span>
              <h2 className="px-6 text-2xl">
                {orderData.title}
                {orderData.status === "CANCEL" && (
                  <span className="text-red-400 px-6 font-semibold">
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
            {router.pathname.includes("ordermanagement") &&
            orderData.status === "ORDER" ? (
              <DButton onClick={() => setShowModalCancle(!showModalCancle)}>
                미입금 주문 취소
              </DButton>
            ) : (
              !router.pathname.includes("ordermanagement") && (
                <div>
                  <DButton className="mr-4 bg-gray-300 text-black hover:bg-gray-400 focus:bg-gray-400 focus:ring-gray-300/50">
                    문의하기
                  </DButton>

                  {isOrderCancleBut ? (
                    <DButton
                      onClick={() => setShowModalCancle(!showModalCancle)}
                    >
                      주문취소
                    </DButton>
                  ) : (
                    !orderData.isCanceled && (
                      <DButton
                        disabled={orderData.status === "FINISH"}
                        onClick={() => setShowModalFinish(!showModalFinish)}
                      >
                        거래종료
                      </DButton>
                    )
                  )}
                </div>
              )
            )}
          </PgTitle>
          <PgContent>
            {(orderData.isCanceled && orderData.status !== "CANCEL"
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
                  (orderData.isCanceled && orderData.status !== "CANCEL"
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
