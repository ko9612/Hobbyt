import tw from "tailwind-styled-components";
import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";

const Main = tw.main`
w-[80rem] border ml-auto
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
