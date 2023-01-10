import tw from "tailwind-styled-components";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";

const PdTitle = tw.div`
flex justify-between items-center py-5 border-b-4 border-MainColor/50
`;

export default function ProductTitle() {
  return (
    <PdTitle>
      <div className="w-[30rem]">
        <h2 className="text-xl font-semibold">판매 게시글 타이틀</h2>
        <div className="text-sm text-gray-500">#솜인형&nbsp;#개인제작</div>
      </div>
      <div className="flex text-gray-400">
        <div className="px-2">
          <ViewCount>123</ViewCount>
        </div>
        <WriteDate>2022.12.15</WriteDate>
      </div>
    </PdTitle>
  );
}
