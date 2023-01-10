import tw from "tailwind-styled-components";

export const PdContent = tw.article`
py-5 border-b-4 border-MainColor/50
`;

export default function ProductContent() {
  return (
    <PdContent>
      <div className="w-full h-[30rem] flex justify-center items-center">
        판매 게시글 본문 toast ui viewer 사용 예정
      </div>
    </PdContent>
  );
}
