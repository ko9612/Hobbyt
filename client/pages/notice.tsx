import tw from "tailwind-styled-components";
import NavBar from "../src/components/Nav/NavBar";
import { Main } from "./index";
import NoticeList from "../src/components/List/NoticeList";
import Footer from "../src/components/Footer/Footer";

export default function Notice() {
  const NTitle = tw.div`
  w-[52rem] m-auto mt-20 mb-10
  `;

  const NContent = tw.div`
  border-2 border-green-500 w-[52rem] m-auto
  `;

  const HR = tw.div`
  p-0.5 bg-gray-200 mb-20
  `;

  return (
    <>
      <NavBar />
      <Main>
        <NTitle>
          <h1 className="text-3xl font-bold">알림</h1>
        </NTitle>
        <HR />
        <NContent>
          <NoticeList />
        </NContent>
        <Footer />
      </Main>
    </>
  );
}
