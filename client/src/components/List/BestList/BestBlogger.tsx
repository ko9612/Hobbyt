import tw from "tailwind-styled-components";
// import Image from "next/image";
// import userProfile from "../../../image/userProfile_ex.jpeg";
import { Section, Title, BestContent, BestItem } from "./BestBlog";
import DefaultProfileImg from "../../UserHome/DefaultProfileImg";

const BloggerInfo = tw.div`
bg-slate-100 flex rounded-2xl items-center justify-center p-4
`;

export default function BestBlogger() {
  return (
    <Section>
      <Title>금주의 인기 블로거</Title>
      <BestContent className="pt-5">
        <BestItem className="grid sm:grid-cols-3 grid-cols-2 gap-8">
          {Array(6)
            .fill(null)
            .map(idx => (
              <BloggerInfo key={idx}>
                <span className="w-16 mr-4">
                  <DefaultProfileImg width={70} height={70} borderW={0} />
                </span>
                <span className="text-xl">닉네임여섯자</span>
              </BloggerInfo>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
