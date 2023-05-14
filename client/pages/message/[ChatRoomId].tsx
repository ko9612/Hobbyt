import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [chatRoomList, setChatRoomList] = useState([]);

  // 채팅방 목록 조회 api
  const getData = async () => {
    const res = await getChatRoomList();
    const listRes = res.data.chatrooms;
    setChatRoomList(listRes);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("authorization")) {
        setIsLogin(true);
        getData();
      } else {
        setIsLogin(false);
        alert("로그인이 필요한 페이지입니다");
        router.push("/signin");
      }
    }
  }, []);

  return (
    <div>
      {isLogin && (
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
      )}
    </div>
  );
}
