// 블로그 게시글 상세 페이지
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../../src/components/Nav/NavBar";
import Header from "../../src/components/Page/UserHome/Header";
import Footer from "../../src/components/Footer/Footer";
import UserProfile from "../../src/components/Page/UserHome/UserProfile";
import UserProfileImage from "../../src/components/Page/UserHome/UserProfileImage";
import Followig from "../../src/components/Page/UserHome/Following";
import TodayCount from "../../src/components/ViewLikeWrite/TodayCount";
import { Content, BlogContent, UserContent, UserInfo } from "../blog";
import BlogPostDetail from "../../src/components/Page/BlogWrite/BlogPostDetail";
import { PostDetailDataState } from "../../src/state/BlogPostState";
// import { getBlogContentDetail } from "../../src/api/blogApi";

const BlogDetails = tw.div`w-[43rem] m-auto`;

// export default function BlogDetail({ params }) {
export default function BlogDetail() {
  const router = useRouter();
  const { pid } = router.query;
  const [data] = useRecoilState(PostDetailDataState);
  console.log(`[id]페이지`, data);
  //   const [data, setData] = useState([]); // 나중에 useCallback 사용하기
  // const { id } = router.isPath;
  // const { pid } = params;
  // console.log(`돼용?router`, router);
  console.log(`돼용?id`, pid);

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //     // eslint-disable-next-line array-callback-return
  //     .map((item: any) => {
  //       if (item.id === pid) {
  //         setData(data);
  //       }
  //     });
  //   }, [router.query.pid, router.isReady]);

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogDetails>
            <BlogPostDetail data={data} />
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

// export function getServerSideProps(context) {
//   return {
//     props: { params: context.params },
//   };
// }

// export const getServerSideProps = async () => {
//   const response = await getBlogContentDetail(qid);
//   console.log(`돼용?respons`, response);
//   const detailData = await response.data;
//   return { props: { detailData } };
// };

// if (!pid) {
//   // eslint-disable-next-line react/jsx-no-useless-fragment
//   return <></>;
// }

// const getData = async () => {
//   const blogDetail = await getBlogContentDetail({ id });
//   if (blogDetail) {
//     console.log(`id`, id);
//     console.log(`data`, blogDetail);
//     setData(blogDetail);
//   }
// };

// useEffect(() => {
//   getData();
// }, [getData]);

// useEffect(() => {
//   const urlSearchParams = new URLSearchParams(window.location.search);
//   console.log(`urlSearchParams`, urlSearchParams);

//   const getData = async () => {
//     // const response = await getBlogContentDetail(router);
//     const response = await getBlogContentDetail(pid);
//     if (response) {
//       // console.log(`id`, id);
//       console.log(`돼용?respons`, response);
//       const detailData = response.data;
//       // setData(response);
//       setData(detailData);
//       console.log(`돼용?data`, data);
//     }
//   };
//   getData();
// }, []);
