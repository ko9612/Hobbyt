export const BlogMenus = [
  { id: 0, name: "블로그", idx: 0, content: "Tab menu 블로그" },
  { id: 1, name: "판매", idx: 1, content: "Tab menu 판매" },
  { id: 2, name: "댓글", idx: 2, content: "Tab menu 댓글" },
  { id: 3, name: "좋아요", idx: 3, content: "Tab menu 좋아요" },
];

export const SaleMenus = [
  { id: 4, name: "내 정보 관리", idx: 4, content: "Tab 내정보 관리" },
  { id: 5, name: "판매 작품", idx: 5, content: "Tab 판매 작품" },
  { id: 6, name: "구매 작품", idx: 6, content: "Tab 구매 작품" },
  { id: 7, name: "판매 관리", idx: 7, content: "Tab 판매 관리" },
];

export const SearchMenus = [
  { name: "블로그", idx: 8, content: "Tab 검색 블로그" },
  { name: "판매", idx: 9, content: "Tab 검색 판매" },
];

export type TabType = {
  id: number;
  name: string;
  idx: number;
  content: string;
};
