import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { ThumbnailState } from "../../state/BlogPostState";
import { postThumbnailUpload } from "../../api/blogApi";

const Title = tw.div`mt-5 mb-5 px-5 flex items-center`;

export default function ThumbnailInput() {
  // atom에 title 내용 저장
  const setThumbnail = useSetRecoilState(ThumbnailState);

  // const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const thumbnailData = e.target.files[0];

  //     const formData = new FormData();
  //     formData.append("thumbnailImage", thumbnailData);

  //     try {
  //       // post 썸네일 이미지
  //       setThumbnail(thumbnailData);
  //       // const res = (req as any).data;
  //     } catch (err: unknown) {
  //       return console.log("썸네일 이미지", err);
  //     }
  //   }
  // };

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const thumbnailData = e.target.files[0];

      const formData = new FormData();
      const size = { width: 250, height: 250 };
      formData.append("image", thumbnailData);
      formData.append(
        "size",
        new Blob([JSON.stringify(size)], { type: "application/json" }),
      );
      const data = await postThumbnailUpload(formData);
      if ((data as any).status === 200) {
        setThumbnail((data as any).data);
      }
    }
  };

  console.log("thumbnail", thumbnail);

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
        className="w-full p-2 my-2 border-2 rounded-lg border-slate-200"
      />
    </Title>
  );
}
