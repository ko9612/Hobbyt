import tw from "tailwind-styled-components";
import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Nav/NavBar";
import Tab from "../src/components/Tab/Tab";
import { SearchMenus } from "../src/components/Tab/TabArr";
import { Main, MainContent } from "./index";
import SearchBar from "../src/components/Page/Search/SearchBar";

const BlogTab = tw.div`m-auto`;

export default function search() {
  return (
    <>
      <Navbar />
      <Main>
        <MainContent className=" flex flex-col items-center w-[50rem]">
          <div className="w-4/5 mt-[5rem]">
            <SearchBar />
          </div>
          <BlogTab className="w-full mt-[5rem]">
            <Tab Menus={SearchMenus} />
          </BlogTab>
        </MainContent>
      </Main>
      <Footer />
    </>
  );
}
