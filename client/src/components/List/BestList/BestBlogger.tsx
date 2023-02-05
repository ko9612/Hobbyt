import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { Section, Title, BestContent, BestItem } from "./BestBlog";
import DefaultProfileImg from "../../Page/UserHome/DefaultProfileImg";
import { BestBloggerProps } from "../../../type/userTypes";
import { getBestBloggerList } from "../../../api/MainApi";

const BloggerInfo = tw.div`
bg-slate-100 flex rounded-2xl items-center justify-center p-4
`;

interface BloggerProps {
  hotBloggers: BestBloggerProps[];
}

export default function BestBlogger() {
  const [listData, setListData] = useState<BloggerProps[]>();

  const getBestBloggerData = async () => {
    const res = await getBestBloggerList();
    const listRes = (res as any).data;
    setListData([listRes]);
  };
  console.log(listData);
  useEffect(() => {
    getBestBloggerData();
  }, []);

  return (
    <Section>
      <Title>금주의 인기 블로거</Title>
      <BestContent className="pt-5">
        <BestItem className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {listData &&
            listData[0] &&
            listData[0].hotBloggers.map(item => (
              <BloggerInfo key={item.bloggerId}>
                <span className="w-16 mr-4">
                  <DefaultProfileImg
                    profileImg={item.profileImage}
                    width={70}
                    height={70}
                    borderW={0}
                  />
                </span>
                <span className="text-xl">{item.nickname}</span>
              </BloggerInfo>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
