import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";
import DefaultImg from "../../../image/userProfile_ex.jpeg";

export const PdThumbnail = tw.article`
py-5 border-b-4 border-MainColor/50
`;

export default function ProductThumbnail() {
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  return (
    <PdThumbnail>
      <Image
        // src={SaleData.thumbnailImage || DefaultImg}
        src={DefaultImg}
        alt="유저 프로필 사진"
        width={500}
        height={500}
        className="object-cover w-full h-[20rem]"
      />
    </PdThumbnail>
  );
}
