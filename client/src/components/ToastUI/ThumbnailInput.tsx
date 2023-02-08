import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ChangeEvent, useCallback } from "react";
import DefalutTogle from "../Togle/DefalutTogle";
import { TitleState } from "../../state/BlogPostState";

const Title = tw.div`mt-5 mb-5 px-5 flex items-center`;

export default function ThumbnailInput() {
  const router = useRouter();

  // atom에 title 내용 저장
  const [thumbnail, setThumbnail] = useRecoilState(TitleState);

  const onChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const thumbnailData = e.target.file;
      setThumbnail(thumbnailData);
    },
    [setThumbnail],
  );

  return (
    <Title>
      <h1 className="font-semibold w-[10rem]">
        대표 이미지 <span className="text-red-500">&#42;</span>
      </h1>
      <input
        type="file"
        id="thumbnailImg"
        accept="image/jpeg, image/png, image/jpg"
        onChange={onChangeImage}
        className="w-full p-2 my-2 border-2 rounded-lg border-slate-200 "
      />
    </Title>
  );
}
