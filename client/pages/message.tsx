import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import Footer from "../src/components/Footer/Footer";
import { Main } from "./index";
import { Title, HR } from "./notice";
import MessageList from "../src/components/Message/MessageList";

export default function Message() {
  const MContent = tw.div`
  w-full m-auto flex items-start content-start
  `;

  return (
    <>
      <Navbar />
      <Main>
        <Title>
          <h1 className="text-3xl font-bold">메세지</h1>
        </Title>
        <HR />
        <MContent>
          <MessageList />
        </MContent>
      </Main>
      <Footer />
    </>
  );
}
