// import tw from "tailwind-styled-components";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState } from "react";
import { ProgressArr } from "./CategoryArr";

export default function ProgressCategory() {
  const [categorySpread, setCategorySpread] = useState(false);

  const spreadOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategorySpread(!categorySpread);
  };

  const progressArr = ProgressArr;

  return (
    <div className="relative flex flex-col border-2 mr-[2rem]">
      <button
        onClick={spreadOnClickHandler}
        className="flex justify-between p-[0.5rem] w-22 text-sm"
      >
        선택하기
        {categorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {categorySpread && (
        <div className="absolute z-10 w-full p-1 overflow-hidden text-sm bg-gray-100 border-2 top-9">
          {progressArr.map((progress, idx) => (
            <button className="flex py-1 m-auto " key={idx}>
              {progress.title}
              <hr />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// <button>주문완료</button>
//       <button>입금확인</button>
//       <button>배송준비중</button>
//       <button>배송시작</button>
//       <button>거래종료</button>
