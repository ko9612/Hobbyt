import { useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.div`w-100% border-2 border-red-400`;

function InfiniteScroll(): JSX.Element {
  const [page, setPage] = useState(1);
  // 요청할 페이지 번호 수

  return <Container />;
}
