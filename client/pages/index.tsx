import tw from "tailwind-styled-components";
import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";

export const Main = tw.main`
w-[62rem] border-2 ml-auto border-red-400
`;
// J: w-[80rem] border ml-auto
// H: lg:ml-[18rem] py-10 px-3

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <BestBlog />
        <BestBlogger />
        <BestProduct />
      </Main>
      <Footer />
    </>
  );
}
