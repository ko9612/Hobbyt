import React from "react";
import { useSetRecoilState } from "recoil";
import { BlogSelectState } from "../../state/BlogPostState";

export default function FilterButton() {
  const setSelect = useSetRecoilState(BlogSelectState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === "인기순") {
      setSelect("인기순");
    } else if (value === "최신순") {
      setSelect("최신순");
    }
  };
  return (
    <div className="flex">
      <button
        type="button"
        className="mr-2"
        onClick={handleClick}
        value="최신순"
      >
        최신순
      </button>
      <p>|</p>
      <button
        type="button"
        className="ml-2"
        onClick={handleClick}
        value="인기순"
      >
        인기순
      </button>
    </div>
  );
}

// 블로그 게시글이랑 판매 게시글 정렬 기본을 최신순으로 할 것인지,
// 인기순으로 할 것인지 정하고 css 마저 수정하기
