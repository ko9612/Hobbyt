import tw from "tailwind-styled-components";
import Image from "next/image";
import userProfile from "../../../image/userProfile_ex.jpeg";
import { Section, Title, BestContent, BestItem } from "./BestBlog";

const BloggerInfo = tw.div`
bg-slate-100 flex max-w-[17.5rem] rounded-2xl my-3 items-center justify-center p-4
`;

export default function BestBlogger() {
  return (
    <Section>
      <Title>금주의 인기 블로거</Title>
      <BestContent>
        <BestItem className="grid grid-cols-3">
          {Array(6)
            .fill(null)
            .map(idx => (
              <BloggerInfo key={idx}>
                <span className="w-16 mr-4">
                  <Image
                    src={userProfile}
                    alt="유저 프로필 사진"
                    className="rounded-full"
                  />
                </span>
                <span className="text-xl">닉네임여섯자</span>
              </BloggerInfo>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
