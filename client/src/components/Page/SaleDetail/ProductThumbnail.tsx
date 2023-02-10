import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";
import saleDImage from "../../../image/saleDImage.svg";

export const PdThumbnail = tw.article`
py-5 border-b-4 border-MainColor/50
`;

export default function ProductThumbnail() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  return (
    <PdThumbnail>
        <Image
          src={SaleData && SaleData.thumbnailImage ? `/api/images/${SaleData.thumbnailImage}` : saleDImage}
          alt="유저 프로필 사진"
          width={500}
          height={500}
          className="object-cover w-full h-[20rem]"
        />
    </PdThumbnail>
  );
}
