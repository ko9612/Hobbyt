import { BsThreeDots } from "react-icons/bs";
import { BLContainer, BLComponent, BLImage, BLContent } from "./BlogList";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";

export default function LikeList() {
  return (
    <BLContainer>
      <BLComponent>
        <BLImage>이미지 자리</BLImage>
        <BLContent>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">
              좋아요 누른 게시글 타이틀
            </h2>
            <BsThreeDots size="28" color="#d6d6d6" />
          </div>
          <p>
            게시글 본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다. 게시글
            본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다. 게시글 본문
            더미 데이터입니다.
          </p>
          <div className="flex justify-end ">
            <ViewCount />
            <LikeCount />
            <WriteDate />
          </div>
        </BLContent>
      </BLComponent>
    </BLContainer>
  );
}
