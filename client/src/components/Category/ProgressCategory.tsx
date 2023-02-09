// import tw from "tailwind-styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useEffect, useState } from "react";
// import { useSetRecoilState } from "recoil";
import { ProgressArr, RefundArr } from "./CategoryArr";
import { patchOrderState } from "../../api/OrderApi";
// import { OrderStatus } from "../../state/OrderState";

interface Istatus {
  orderStatus: string;
  orderId: number;
  isCanceled: boolean;
}

export default function ProgressCategory({
  orderStatus,
  orderId,
  isCanceled,
}: Istatus) {
  const [categorySpread, setCategorySpread] = useState(false);
  // const setOrderStatus = useSetRecoilState(OrderStatus);
  const spreadOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategorySpread(!categorySpread);
  };

  const progressArr = ProgressArr;

  // 진행사항 함수
  // eslint-disable-next-line consistent-return
  const getStatus = (status: string) => {
    if (status === "ORDER") {
      return "주문완료";
    }
    if (status === "PAYMENT_VERIFICATION") {
      return "입금확인";
    }
    if (status === "PREPARE_DELIVERY") {
      return "배송준비중";
    }
    if (status === "START_DELIVERY") {
      return "배송시작";
    }
    if (status === "FINISH_DELIVERY") {
      return "배송완료";
    }
    if (status === "PREPARE_REFUND") {
      return "환불준비중";
    }
    if (status === "FINISH_REFUND") {
      return "환불완료";
    }
    if (status === "FINISH") {
      return "거래종료";
    }
    if (status === "CANCEL") {
      return "미입금취소";
    }
  };

  // 클릭한 이름
  const [clcikName, setClickName] = useState(orderStatus);

  useEffect(() => {}, [clcikName]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setClickName(value);
    setCategorySpread(!categorySpread);
    // setOrderStatus(value);

    // 진행사항 변경시 patch 요청
    const data = {
      status: value,
      // status: clcikName,
    };
    const patchData = async () => {
      const res = await patchOrderState(data, orderId);
      return res;
    };
    patchData();
  };

  // useEffect(() => {
  //   // 진행사항 변경시 patch 요청
  //   const data = {
  //     // status: value,
  //     status: clcikName,
  //   };

  //   const patchData = async () => {
  //     const res = await patchOrderState(data, orderId);
  //     console.log("진행사항 변경", res);
  //     // setNewStatus(clcikName);
  //   };
  //   patchData();
  // }, [clcikName]);

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const { value } = e.currentTarget;
  //   // console.log(`e.currentTarget`, e.currentTarget);
  //   // if (e.currentTarget.value) {
  //   // setNewStatus(value);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   setClickName(value);
  //   setCategorySpread(!categorySpread);
  //   console.log("밸류", value);
  //   // console.log("핸들클릭안에", clcikName);
  //   // }
  // };
  console.log(`프로그래스 카테고리`, orderStatus);
  return (
    <div className="relative flex flex-col border-2 mr-[2rem]">
      <button
        onClick={spreadOnClickHandler}
        className="flex justify-between p-[0.5rem] w-22 text-sm"
      >
        {clcikName && getStatus(clcikName)}
        {categorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {categorySpread && (
        <div className="absolute z-10 w-full p-1 overflow-hidden text-sm bg-gray-100 border-2 top-9">
          {(isCanceled ? RefundArr : progressArr).map((progress, idx) => (
            <button
              className="flex py-1 m-auto "
              key={idx}
              onClick={handleClick}
              value={progress.status}
            >
              {progress.title}
              <hr />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
