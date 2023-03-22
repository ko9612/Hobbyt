import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";

export const PdThumbnail = tw.article`
py-5
`;

export default function ProductThumbnail() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  console.log(SaleData.thumbnailImage);
  return (
    <PdThumbnail>
      {SaleData && SaleData.thumbnailImage !== "기본 이미지" ? (
        <Image
          src={`/api/images/${SaleData.thumbnailImage}`}
          alt="유저 프로필 사진"
          width={500}
          height={500}
          priority
          className="object-cover w-full h-[20rem]"
        />
      ) : null}
    </PdThumbnail>
  );
}
