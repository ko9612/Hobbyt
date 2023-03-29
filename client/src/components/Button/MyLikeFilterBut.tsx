import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { BlogLikeSelectState } from "../../state/BlogPostState";

export default function MyLikeFilterBut() {
  const setLikeSelect = useSetRecoilState(BlogLikeSelectState);

  /** 클릭된 필터가 무엇인지 */
  const [click, setClick] = useState("블로그");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === "판매") {
      setLikeSelect("판매");
      setClick("판매");
    } else if (value === "블로그") {
      setLikeSelect("블로그");
      setClick("블로그");
    }
  };

  return (
    <div className="flex py-2 mt-2">
      <button
        type="button"
        className={`mr-2 ${
          click === "블로그" ? "font-bold text-MainColor" : null
        }`}
        onClick={handleClick}
        value="블로그"
      >
        블로그
      </button>
      <p>|</p>
      <button
        type="button"
        className={`ml-2 ${
          click === "판매" ? "font-bold text-MainColor" : null
        }`}
        onClick={handleClick}
        value="판매"
      >
        판매
      </button>
    </div>
  );
}
