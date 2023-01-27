import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";
import React from "react";

interface ILike {
  children: number | string | undefined;
}

const LComponent = tw.div`flex items-center whitespace-pre-wrap`;

export default function LikeCount({ children }: ILike) {
  return (
    <LComponent>
      <BsHeart />
      <p className="px-1">{children}</p>
    </LComponent>
  );
}
