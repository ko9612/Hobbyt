import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";

export const PdThumbnail = tw.article`py-5`;

export default function ProductThumbnail() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  return (
    <PdThumbnail>
      {SaleData && SaleData.thumbnailImage !== null ? (
        <Image
          src={SaleData.thumbnailImage}
          alt="썸네일사진"
          width={500}
          height={500}
          priority
          className="object-cover w-full h-[20rem]"
        />
      ) : null}
    </PdThumbnail>
  );
}
