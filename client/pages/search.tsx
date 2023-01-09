// import {useLocation}
// import SearchProduct from './SearchProduct';
// import SearchReview from './SearchReview';
import tw from "tailwind-styled-components";
import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Nav/NavBar";
import Tab from "../src/components/Tab/Tab";
import { SearchMenus } from "../src/components/Tab/TabArr";
import { Main, MainContent } from "./index";
import SearchBar from "../src/components/Search/SearchBar";

const BlogTab = tw.div`w-[52rem] m-auto`;

export default function search() {
  return (
    <>
      <Navbar />
      <Main>
        <MainContent className=" flex flex-col items-center">
          <div className="w-[52rem] mt-[5rem]">
            <SearchBar />
          </div>
          <BlogTab className="mt-[5rem]">
            <Tab Menus={SearchMenus} />
          </BlogTab>
        </MainContent>
      </Main>
      <Footer />
    </>
  );
}
