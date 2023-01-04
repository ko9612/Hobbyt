import tw from "tailwind-styled-components";
// import { useState } from "react";
import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";

import Navbar from "../src/components/Nav/NavBar";

// const Content = tw.main`
// sm:ml-[18rem]
// `;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="lg:ml-[18rem] py-10 px-3">
        <BestBlog />
        <BestBlogger />
        <BestProduct />
      </main>
      <Footer />
    </>
  );
}
