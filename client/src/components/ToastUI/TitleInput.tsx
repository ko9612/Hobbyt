import tw from "tailwind-styled-components";

export default function TitleInput() {
  const Title = tw.div`
    mt-10 mb-5
    `;

  return (
    <Title>
      <h1 className="ml-2 mr-5">제목</h1>
      <input
        type="text"
        id="title"
        placeholder="제목을 입력하세요"
        maxLength={50}
        className="w-4/5 p-1 my-2 ml-2 border rounded-lg border-slate-300"
      />
    </Title>
  );
}
