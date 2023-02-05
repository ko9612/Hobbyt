import tw from "tailwind-styled-components";
import { useState } from "react";
import {
  RiFileList3Line,
  RiHandHeartLine,
  RiTruckLine,
  RiBankCardLine,
  RiGiftLine,
} from "react-icons/ri";
import Image from "next/image";
import example from "src/image/header_ex.jpg";
import { useRouter } from "next/router";
import { DButton } from "../../Button/DefalutButton";
import { deleteOrder } from "../../../api/OrderApi";
import DelModal from "../../Modal/DelModal";

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
    status: "거래종료",
    icon: <RiHandHeartLine size="2.5rem" />,
  },
];

export default function OrderProgress({ id }: IdProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [orderState, setOrderState] = useState(stateArr[0].id);

  const DeleteOrder = async () => {
    const delOrderData = await deleteOrder(id);
    if ((delOrderData as any).status === 204) {
      router.reload();
    }
    console.log(delOrderData);
  };

  return (
    <PgSection>
      <PgTitle>
        <div className="flex items-center">
          <span className="w-20 h-20 bg-black overflow-hidden rounded-md ring-4 ring-gray-300">
            <Image src={example} alt="작품 이미지" className="w-20 h-20" />
          </span>
          <h2 className="px-6 text-2xl">구매한 작품 이름</h2>
        </div>
        <div>
          <DButton className="mr-4 bg-gray-300 text-black hover:bg-gray-400 focus:bg-gray-400 focus:ring-gray-300/50">
            문의하기
          </DButton>
          {showModal && (
            <DelModal
              setOpenModal={setShowModal}
              msg="정말 주문을 취소하시겠습니까?"
              subMsg={["취소 후, 철회가 불가능합니다."]}
              afterClick={DeleteOrder}
              buttonString="주문취소"
            />
          )}
          <DButton onClick={() => setShowModal(!showModal)}>주문취소</DButton>
        </div>
      </PgTitle>
      <PgContent>
        {stateArr.map(state => (
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
            {state.id !== stateArr.length - 1 && (
              <PgStatusLine
                className={`${orderState > state.id && "bg-MainColor/50"}`}
              />
            )}
          </>
        ))}
      </PgContent>
    </PgSection>
  );
}
