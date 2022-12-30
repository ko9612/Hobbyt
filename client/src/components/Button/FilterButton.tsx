export default function FilterButton() {
  return (
    <div className="flex">
      <button className="mr-2">최신순</button>
      <p>|</p>
      <button className="ml-2">인기순</button>
    </div>
  );
}

// 블로그 게시글이랑 판매 게시글 정렬 기본을 최신순으로 할 것인지,
// 인기순으로 할 것인지 정하고 css 마저 수정하기
