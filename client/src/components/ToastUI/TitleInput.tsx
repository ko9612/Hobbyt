import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ChangeEvent, useCallback } from "react";
import DefalutTogle from "../Togle/DefalutTogle";
import { TitleState } from "../../state/BlogPostState";

const Title = tw.div`mt-10 mb-5 px-5`;

export default function TitleInput() {
  const router = useRouter();

  // atom에 title 내용 저장
  const [title, setTitle] = useRecoilState(TitleState);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const titleData = e.target.value;
      setTitle(titleData);
    },
    [setTitle],
  );

  return (
    <Title>
      <div className="flex">
        <h1 className="font-semibold">
          제목 <span className="text-red-500">&#42;</span>
        </h1>
        {!router.pathname.includes("/sale") ? (
          <DefalutTogle>공개 할래요</DefalutTogle>
        ) : (
          <DefalutTogle>상시 판매할래요</DefalutTogle>
        )}
      </div>
      <input
        type="text"
        id="title"
        placeholder="제목을 입력하세요"
        maxLength={50}
        value={title}
        onChange={onChangeTitle}
        className="w-full p-2 my-2 border-2 rounded-lg border-slate-200"
      />
    </Title>
  );
}
