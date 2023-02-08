import { useRouter } from "next/router";
import React from "react";
import FilterButton from "../../Button/FilterButton";
import { DefalutButton } from "../../Button/DefalutButton";

interface IProps {
  children: string;
}

export default function BlogSaleInfo({ children }: IProps) {
  const router = useRouter();
  const homeUserId = Number(router.query.userId);

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (children === "블로그") {
      router.push(`/blog/${homeUserId}/blogwrite`);
    } else if (children === "판매") {
      router.push(`/blog/${homeUserId}/salewrite`);
    }
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <FilterButton />
      <DefalutButton
        id=""
        onClick={e => {
          onClickHandler(e);
        }}
      >
        글쓰기
      </DefalutButton>
    </div>
  );
}
