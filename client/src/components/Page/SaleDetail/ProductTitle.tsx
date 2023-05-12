import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";
import { Info, Tag, TagList, Title, VWInfo } from "../BlogWrite/BlogPostDetail";
import BackButton from "../../Button/BackButton";

const PdTitle = tw.div`
block py-5 border-b-4 border-MainColor/50
`;

export default function ProductTitle() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);

  return (
    <PdTitle>
      <Title className="w-full ">
        <BackButton />
        <div>{SaleData.title}</div>
      </Title>
      <div className="">
        <Info>
          <TagList>
            {SaleData?.tags?.map((tag: any, idx: number) => (
              <Tag className="mr-2" key={idx}>{`#${tag}`}</Tag>
            ))}
          </TagList>
          <VWInfo className="text-sm py-2">
            <ViewCount>{SaleData.viewCount}</ViewCount>
            <WriteDate>{SaleData.createdAt.slice(0, 10)}</WriteDate>
          </VWInfo>
        </Info>
      </div>
    </PdTitle>
  );
}
