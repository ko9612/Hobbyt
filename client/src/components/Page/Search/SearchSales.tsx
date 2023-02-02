import tw from "tailwind-styled-components";
import FilterButton from "../../Button/FilterButton";
import { SLContainer } from "../../List/SaleList";
import { SearchSaleDataProps } from "../../../type/saleType";
import SaleItem from "../../List/SaleItem";

export const Content = tw.article`
flex items-center pt-5
`;

export const Item = tw.div`
mx-auto grid sm:grid-cols-3 grid-cols-2 gap-8
`;

interface SearchSaleProps {
  keyword: string | string[] | undefined;
  list: SearchSaleDataProps;
}

export default function SearchSales({ keyword, list }: SearchSaleProps) {
  return (
    <SLContainer>
      <div className="py-10">
        <span className="text-xl font-semibold text-MainColor">{keyword} </span>
        작품 검색결과{" "}
        <span> {list.sales ? Object.keys(list.sales).length : 0}건</span>
      </div>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      <Content>
        <Item>
          {list.sales &&
            list.sales.map(item => <SaleItem list={item} key={item.id} />)}
        </Item>
      </Content>
    </SLContainer>
  );
}
