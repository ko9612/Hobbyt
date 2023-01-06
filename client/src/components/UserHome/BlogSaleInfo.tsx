import { useRouter } from "next/router";
import React from "react";
import FilterButton from "../Button/FilterButton";
import DefalutButton from "../Button/DefalutButton";

interface IProps {
  children: string;
}

export default function BlogSaleInfo({ children }: IProps) {
  const router = useRouter();

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (children === "블로그") {
      router.push("blogwrite");
    } else if (children === "판매") {
      router.push("salewrite");
    }
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <FilterButton />
      <DefalutButton
        onClick={e => {
          onClickHandler(e);
        }}
      >
        글쓰기
      </DefalutButton>
    </div>
  );
}
