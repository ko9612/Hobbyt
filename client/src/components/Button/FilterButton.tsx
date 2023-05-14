import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { BlogSelectState } from "../../state/BlogPostState";

export default function FilterButton() {
  const setSelect = useSetRecoilState(BlogSelectState);

  /** 클릭된 필터가 무엇인지 */
  const [click, setClick] = useState("최신순");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === "인기순") {
      setSelect("인기순");
      setClick("인기순");
    } else if (value === "최신순") {
      setSelect("최신순");
      setClick("최신순");
    }
  };

  return (
    <div className="flex">
      <button
        type="button"
        className={`mr-2 ${
          click === "최신순" ? "font-bold text-MainColor" : null
        }`}
        onClick={handleClick}
        value="최신순"
      >
        최신순
      </button>
      <p>|</p>
      <button
        type="button"
        className={`ml-2 ${
          click === "인기순" ? "font-bold text-MainColor" : null
        }`}
        onClick={handleClick}
        value="인기순"
      >
        인기순
      </button>
    </div>
  );
}
