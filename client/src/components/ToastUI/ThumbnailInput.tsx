import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import { ThumbnailState } from "../../state/BlogPostState";
import { postThumbnailUpload } from "../../api/blogApi";
import MsgModal from "../Modal/MsgModal";
import { imageErrorHandler } from "../../util/ErrorHandler";

const Title = tw.div`mt-5 mb-5 px-5`;

export default function ThumbnailInput() {
  const router = useRouter();
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const setThumbnail = useSetRecoilState(ThumbnailState);

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const originalImage = e.target.files[0];

      const formData = new FormData();
      const size = { width: 500, height: 500 };

      formData.append("image", originalImage);
      formData.append(
        "size",
        new Blob([JSON.stringify(size)], { type: "application/json" }),
      );
      const data = await postThumbnailUpload(formData);

      // error 처리
      if ((data as any).status === 200) {
        setThumbnail((data as any).data);
      } else {
        imageErrorHandler({
          data,
          inputName: "thumbnailImg",
          setErrMsg,
          setShowMsgModal,
        });
        setThumbnail(null);
      }
    }
  };

  return (
    <Title>
      <div className="flex flex-wrap items-center">
        {showMsgModal && (
          <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />
        )}
        <h1 className="font-semibold w-[10rem]">대표 이미지</h1>
        <input
          type="file"
          id="thumbnailImg"
          accept="image/jpeg, image/png, image/jpg"
          onChange={onChangeImage}
          className="w-full p-2 my-2 text-sm border-2 rounded-lg border-slate-200 sm:text-base"
        />
      </div>
      {router.pathname.includes("edit") && (
        <p className="text-sm text-gray-400">
          * 미선택시, 기존의 대표 이미지로 유지됩니다.
        </p>
      )}
    </Title>
  );
}
