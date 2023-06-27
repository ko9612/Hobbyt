import tw from "tailwind-styled-components";

import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";

export const Main = tw.main`lg:ml-[18rem] px-6`;
export const MainSection = tw.section`max-w-[62rem]`;
export const MainContent = tw.div`max-w-[50rem] m-auto`;

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <MainSection>
          <MainContent>
            <BestBlog />
            <BestBlogger />
            <BestProduct />
          </MainContent>
        </MainSection>
      </Main>
      <Footer />
    </>
  );
}
