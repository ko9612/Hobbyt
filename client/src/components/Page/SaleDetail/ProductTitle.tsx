import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";

const PdTitle = tw.div`
flex justify-between items-center py-5 border-b-4 border-MainColor/50
`;

export default function ProductTitle() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  return (
    <PdTitle>
      <div className="w-[30rem]">
        <h2 className="text-xl font-semibold">{SaleData.title}</h2>
        <div className="text-sm text-gray-500 pt-4">
          {SaleData?.tags?.map((tag: any, idx: number) => (
            <span className="pr-2" key={idx}>{`#${tag}`}</span>
          ))}
        </div>
      </div>
      <div className="flex text-gray-400">
        <div className="px-2">
          <ViewCount>{SaleData.viewCount}</ViewCount>
        </div>
        <WriteDate>{SaleData.createdAt.slice(0, 10)}</WriteDate>
      </div>
    </PdTitle>
  );
}
