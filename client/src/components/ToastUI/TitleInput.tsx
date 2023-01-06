import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import DefalutTogle from "../Togle/DefalutTogle";

export default function TitleInput() {
  const router = useRouter();
  const Title = tw.div`
    mt-10 mb-5 px-5
    `;

  return (
    <Title>
      <div className="flex">
        <h1 className="font-semibold">
          제목 <span className="text-red-500">&#42;</span>
        </h1>
        {router.pathname === "/blogwrite" ? (
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
        className="w-full p-2 my-2 border-2 rounded-lg border-slate-200"
      />
      {/* <PostInput
        type="text"
        id="title"
        placeholder="제목을 입력하세요"
        maxLength={50}
      /> */}
    </Title>
  );
}
