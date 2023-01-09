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
import { DButton } from "../Button/DefalutButton";

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

export default function OrderProgress() {
  const [orderFin, setOrderFin] = useState(true);
  const [depositFin, setDepositFin] = useState(true);
  const [preparing, setPreparing] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [complete, setComplete] = useState(false);

  // 에러 방지용
  console.log(
    setOrderFin,
    setDepositFin,
    setPreparing,
    setShipping,
    setComplete,
  );

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
          <DButton>주문취소</DButton>
        </div>
      </PgTitle>
      <PgContent>
        <PgStatus>
          <IconDiv className={`${orderFin && "bg-MainColor text-white"}`}>
            <RiFileList3Line size="2.5rem" />
          </IconDiv>
          주문완료
        </PgStatus>
        <PgStatusLine className={`${depositFin && "bg-MainColor/50"}`} />
        <PgStatus>
          <IconDiv className={`${depositFin && "bg-MainColor text-white"}`}>
            <RiBankCardLine size="2.5rem" />
          </IconDiv>
          입금확인
        </PgStatus>
        <PgStatusLine className={`${preparing && "bg-MainColor/50"}`} />
        <PgStatus>
          <IconDiv className={`${preparing && "bg-MainColor text-white"}`}>
            <RiGiftLine size="2.5rem" />
          </IconDiv>
          배송준비중
        </PgStatus>
        <PgStatusLine className={`${shipping && "bg-MainColor/50"}`} />
        <PgStatus>
          <IconDiv className={`${shipping && "bg-MainColor text-white"}`}>
            <RiTruckLine size="2.5rem" />
          </IconDiv>
          배송시작
        </PgStatus>
        <PgStatusLine className={`${complete && "bg-MainColor/50"}`} />
        <PgStatus>
          <IconDiv className={`${complete && "bg-MainColor text-white"}`}>
            <RiHandHeartLine size="2.5rem" />
          </IconDiv>
          거래종료
        </PgStatus>
      </PgContent>
    </PgSection>
  );
}
