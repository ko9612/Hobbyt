// 블로그 게시글 상세 페이지
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../src/components/Nav/NavBar";
import Header from "../../src/components/Page/UserHome/Header";
import Footer from "../../src/components/Footer/Footer";
import UserProfile from "../../src/components/Page/UserHome/UserProfile";
import UserProfileImage from "../../src/components/Page/UserHome/UserProfileImage";
import Followig from "../../src/components/Page/UserHome/Following";
import TodayCount from "../../src/components/ViewLikeWrite/TodayCount";
import { Content, BlogContent, UserContent, UserInfo } from "../blog";
import BlogPostDetail from "../../src/components/Page/BlogWrite/BlogPostDetail";
import { getBlogDetail } from "../../src/api/blogApi";

const BlogDetails = tw.div`w-[43rem] m-auto`;

export default function BlogDetail() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [getNewData, setGetNewData] = useState([]);

  const getData = async () => {
    const blogDetail = await getBlogDetail(pid);
    setGetNewData(blogDetail.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogDetails>
            <BlogPostDetail list={getNewData} key={0} />
          </BlogDetails>
        </BlogContent>
        <UserContent>
          <UserInfo>
            <UserProfileImage />
            <UserProfile />
            <div className="w-[10rem] m-auto">
              <Followig />
            </div>
            <TodayCount />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
