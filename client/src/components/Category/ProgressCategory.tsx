// import tw from "tailwind-styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState } from "react";

export default function ProgressCategory() {
  const [categorySpread, setCategorySpread] = useState(false);

  const spreadOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategorySpread(!categorySpread);
  };

  const progressArr = useState([
    "입금완료",
    "배송준비중",
    "배송시작",
    "거래종료",
  ]);

  return (
    <div className="relative flex flex-col border-2">
      <button
        onClick={spreadOnClickHandler}
        className="flex justify-between w-22"
      >
        선택하기
        {categorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {categorySpread &&
        progressArr.map((progress, idx) => (
          <div key={idx}>
            <button>{progress}</button>
          </div>
        ))}
    </div>
  );
}

// <button>주문완료</button>
//       <button>입금확인</button>
//       <button>배송준비중</button>
//       <button>배송시작</button>
//       <button>거래종료</button>
