import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Section, BestContent, BestItem } from "./BestBlog";
import SaleItem from "../SaleItem";
import FilterButton from "../../Button/FilterButton";
import { SaleItemProps } from "../../../type/saleType";
import { BlogSelectState } from "../../../state/BlogPostState";
import { getBestSaleList } from "../../../api/mainApi";

interface MainSaleItemProps {
  cards: SaleItemProps[];
}

const Title = tw.p`
text-2xl mt-12 lg:py-2 max-w-[52rem]
`;

export default function BestBlogger() {
  const [listData, setListData] = useState<MainSaleItemProps[]>();
  const select = useRecoilValue(BlogSelectState);

  const getBestSaleData = async () => {
    if (select === "최신순") {
      const res = await getBestSaleList("SALE_NEWEST");
      const listRes = (res as any).data;
      setListData([listRes]);
    } else {
      const res = await getBestSaleList("SALE_MOST_LIKE");
      const listRes = (res as any).data;
      setListData([listRes]);
    }
  };

  useEffect(() => {
    getBestSaleData();
  }, [select]);

  return (
    <Section>
      <Title>금주의 작품</Title>
      <div className="flex justify-end py-4">
        <FilterButton />
      </div>
      <BestContent className="pt-5 mb-14">
        <BestItem className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-6 md:gap-14 sm:grid-cols-3">
          {listData &&
            listData[0] &&
            listData[0].cards.map((item: SaleItemProps) => (
              <SaleItem list={item} key={item.id} />
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
