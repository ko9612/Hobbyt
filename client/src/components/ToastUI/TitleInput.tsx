import tw from "tailwind-styled-components";
import DefalutTogle from "../Togle/DefalutTogle";

export default function TitleInput() {
  const Title = tw.div`
    mt-10 mb-5
    `;

  return (
    <Title>
      <div className="flex">
        <h1 className="ml-2 mr-5">제목</h1>
        <DefalutTogle>공개 할래요</DefalutTogle>
      </div>
      <input
        type="text"
        id="title"
        placeholder="제목을 입력하세요"
        maxLength={50}
        className="w-4/5 p-2 my-2 ml-2 border-2 rounded-lg border-slate-200"
      />
    </Title>
  );
}
