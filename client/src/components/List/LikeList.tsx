import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BLContainer, BLComponent, BLImage, BLContent, Text } from "./BlogItem"; // 새로 추가
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import { getLikeList } from "../../api/tabApi";
import { UserIdState } from "../../state/UserState";
import { ILikeList } from "../../type/blogType";
import DefalutImage from "../../image/pictureDefalut.svg";

export default function LikeList() {
  // 블로그 주인 userId
  // const userId = useRecoilValue(UserIdState);

  // 블로그 주인 아이디
  const router = useRouter();
  const homeId = router.query.userId;

  console.log("홈아이디", homeId);

  // 불러온 데이터 저장
  const [listData, setListData] = useState<ILikeList[]>();

  // 토스트 유아이 뷰어
  const TextViewer = dynamic(() => import("../ToastUI/TextViewer"), {
    ssr: false,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await getLikeList(homeId, 0, 10);
      setListData(res.data);
      console.log(`MyLikeList`, res.data);
    };
    getData();
  }, []);

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  return (
    <BLContainer>
      {listData?.cards &&
        listData?.cards.map((item: any, idx: number) => (
          <BLComponent key={idx}>
            {/* <BLImage>{item.thumbnailImage}</BLImage> */}
            <BLImage>
              {/* <Image
                src={
                  item.thumbnailImage !== null
                    ? item.thumbnailImage
                    : DefalutImage
                }
                alt="img"
                width={150}
                height={150}
              /> */}
              <p>{item.thumbnailImage}</p>
            </BLImage>
            <BLContent>
              <Link href={`/blog/${item.writerId}/post/${item.postId}`}>
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                </div>
                <Text>
                  <TextViewer initialValue={item.content} />
                </Text>
              </Link>
              <div className="flex justify-end ">
                <ViewCount>{item.viewCount}</ViewCount>
                <LikeCount>{item.likeCount}</LikeCount>
                <WriteDate>
                  {item.createdAt && getParsedDate(item.createdAt)}
                </WriteDate>
              </div>
            </BLContent>
          </BLComponent>
        ))}
    </BLContainer>
  );
}
