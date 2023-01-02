import tw from "tailwind-styled-components";
import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Nav/NavBar";

const Content = tw.main`
  max-w-[62rem] mx-auto pt-[3.75rem] sm:ml-72 h-full
`;

export default function Home() {
  return (
    <>
      <Navbar />
      <Content>
        <h1 className="text-3xl font-bold text-red-600 underline">
          Hello world!
        </h1>
        <Footer />
      </Content>
    </>
  );
}
