import { useState } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
// import axios from "axios";
import BlogList from "../List/BlogList";
import SaleList from "../List/SaleList";
import MyCommentList from "../List/Comment/MyCommentList";
import LikeList from "../List/LikeList";
import ProductstList from "../Page/MyList/ProductsList";
import MyInfoList from "../Page/MyList/MyInfoList";
import PurchaseList from "../Page/MyList/PurchaseList";
import SalesManagementList from "../Page/MyList/SalesManagementList";
import SearchBlog from "../Page/Search/SearchBlog";
import SearchSales from "../Page/Search/SearchSales";
// import { IdataProps } from "../List/BlogItem";

interface TabProps {
  Menus: {
    id: number;
    name: string;
    content: string;
  }[];
}

const TabMenu = tw.ul`flex items-center flex-row m-auto list-none bg-white text-xl`;

const TabContent = tw.div``;
const dummy = [
  {
    id: 1,
    title: "제목",
    content: "본문",
    thumbnailImage: null,
    viewCount: 100,
    likeCount: 10,
    createdAt: "2023-01-17T19:40:26.598849",
    writer: {
      id: 1,
      nickName: "잉간",
      profileImage: null,
      signedUpAt: "2023-01-17T19:40:26.598493",
      followings: 50,
      followers: 50,
    },
    comments: [
      {
        writerId: 1,
        nickName: "엘프",
        profileImage: null,
        createdAt: "2023-01-17T19:40:26.596822",
        content: "굿굿",
      },
      {
        writerId: 1,
        nickName: "호빗",
        profileImage: null,
        createdAt: "2023-01-17T19:40:26.596849",
        content: "ㄴㄴ",
      },
    ],
    tags: ["취미", "크리어처"],
    public: true,
  },
  {
    id: 2,
    title:
      "긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목 긴 제목",
    content:
      "긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. 긴 본문 내용입니다. ",
    thumbnailImage: null,
    viewCount: 100234,
    likeCount: 12345121,
    createdAt: "2023-01-17T19:40:26.598849",
    writer: {
      id: 1,
      nickName: "닉네임여섯자",
      profileImage: null,
      signedUpAt: "2023-01-17T19:40:26.598493",
      followings: 50,
      followers: 50,
    },
    comments: [
      {
        writerId: 1,
        nickName: "엘프",
        profileImage: null,
        createdAt: "2023-01-17T19:40:26.596822",
        content: "굿굿",
      },
      {
        writerId: 1,
        nickName: "호빗",
        profileImage: null,
        createdAt: "2023-01-17T19:40:26.596849",
        content: "ㄴㄴ",
      },
    ],
    tags: ["취미", "크리어처"],
    public: true,
  },
];

export default function Tab({ Menus }: TabProps) {
  const router = useRouter();
  // 어떤 Tab이 선택되어 있는지 확인하기 위한
  const [curIndex, setIndex] = useState(0);

  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  const keyword = router.query.keywords;

  // 리스트 데이터
  const [listData] = useState(dummy);
  // const [listData, setListData] = useState(dummy);

  // const getData = async () => {
  //   const res = await axios.get(`/api/post/${1}`);
  //   const listRes = res.data;
  //   if (listRes !== undefined) {
  //     setListData(listRes);
  //   }
  //   // setData(list);
  //   // console.log(`임시`, list);
  //   console.log(`임시`, listData);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <TabMenu>
        {Menus.map((section, index: number) => (
          <li
            role="presentation"
            key={index}
            className={
              curIndex === index ? "tab-submenu tab-focused" : "tab-submenu"
            }
            onClick={() => onClickMenuHandler(index)}
          >
            {section.name}
          </li>
        ))}
      </TabMenu>
      <TabContent>
        {Menus[curIndex].name === "블로그" && router.pathname === "/blog" ? (
          <BlogList list={listData} />
        ) : null}
        {Menus[curIndex].name === "판매" && router.pathname === "/blog" ? (
          <SaleList />
        ) : null}
        {Menus[curIndex].name === "블로그" && router.pathname === "/search" ? (
          <SearchBlog keyword={keyword} />
        ) : null}
        {Menus[curIndex].name === "판매" && router.pathname === "/search" ? (
          <SearchSales keyword={keyword} />
        ) : null}
        {Menus[curIndex].name === "댓글" ? <MyCommentList /> : null}
        {Menus[curIndex].name === "좋아요" ? <LikeList /> : null}
        {Menus[curIndex].name === "내 정보 관리" ? <MyInfoList /> : null}
        {Menus[curIndex].name === "판매 작품" ? <ProductstList /> : null}
        {Menus[curIndex].name === "구매 작품" ? <PurchaseList /> : null}
        {Menus[curIndex].name === "판매 관리" ? <SalesManagementList /> : null}
      </TabContent>
    </>
  );
}
