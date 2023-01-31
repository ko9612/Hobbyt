import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";

export const PdContent = tw.article`
py-5 border-b-4 border-MainColor/50
`;

const TextViewer = dynamic(() => import("../../ToastUI/TextViewer"), {
  ssr: false,
});

export default function ProductContent() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  return (
    <PdContent>
      <div className="w-full h-[30rem]">
        <TextViewer initialValue={SaleData?.content} />
      </div>
    </PdContent>
  );
}
