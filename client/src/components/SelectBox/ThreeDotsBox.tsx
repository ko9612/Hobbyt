import React, { useState } from "react";
import tw from "tailwind-styled-components";
import {
  BsThreeDots,
  BsFillFileEarmarkFill,
  BsFillTrashFill,
} from "react-icons/bs";

interface DotsBoxProps {
  children: string;
}

export default function ThreeDotsBox(props: DotsBoxProps) {
  const SelectBox = tw.div`
  bg-gray-300 p-4 absolute rounded-xl z-10
  `;

  const [onClick, setOnClick] = useState(false);
  const { children } = props;

  const onClickHandler = () => {
    setOnClick(!onClick);
  };

  return (
    <div className="">
      <BsThreeDots
        onClick={onClickHandler}
        className="cursor-pointer"
        size={25}
        color="#d6d6d6"
      />
      {onClick && (
        <SelectBox>
          <div className="flex text-center">
            {children} 수정
            <BsFillFileEarmarkFill className="mt-1 ml-10" />
          </div>
          <hr className="my-2" />
          <div className="flex text-center">
            {children} 삭제
            <BsFillTrashFill className="mt-1 ml-10" />
          </div>
        </SelectBox>
      )}
    </div>
  );
}
