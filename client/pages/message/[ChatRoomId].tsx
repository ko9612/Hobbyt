import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import Navbar from "../../src/components/Nav/NavBar";
import Footer from "../../src/components/Footer/Footer";
import { Main } from "../index";
import { Title, HR } from "../notice";
import MessageList from "../../src/components/Websoket/MessageList";
import { getChatRoomList } from "../../src/api/chatApi";

const MContent = tw.div`
w-full m-auto flex items-start content-start
`;

export default function Messages() {
  const [chatRoomList, setChatRoomList] = useState([]);

  // 채팅방 목록 조회 api
  const getData = async () => {
    const res = await getChatRoomList();
    const listRes = res.data.chatrooms;
    setChatRoomList(listRes);
    console.log("채팅방 리스트", listRes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Main>
        <Title>
          <h1 className="text-3xl font-bold"> 메세지 채팅방 </h1>
        </Title>
        <HR />
        <MContent>
          <MessageList chatRoomList={chatRoomList} />
        </MContent>
      </Main>
      <Footer />
    </>
  );
}
