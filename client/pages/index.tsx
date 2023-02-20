import tw from "tailwind-styled-components";
import * as StompJS from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";
import { LoginState, UserIdState } from "../src/state/UserState";

export const Main = tw.main`w-[62rem] border-2 ml-auto border-red-400`;

export const MainContent = tw.div`w-[50rem] m-auto`;
// J: w-[80rem] border ml-auto
// H: lg:ml-[18rem] py-10 px-3

export default function Home() {
  const isLogin = useRecoilValue(LoginState);
  const userId = useRecoilValue(UserIdState);

  if (isLogin) {
    const token = localStorage.getItem("authorization");
    const webSocket = new WebSocket("ws://59.12.62.150:8080/websocket");
    webSocket.onopen = function () {
      console.log("웹소켓 연결 성공");
    };

    const client = new StompJS.Client({
      brokerURL: "ws://59.12.62.150:8080/websocket",
      beforeConnect: () => {
        console.log("beforeConnect");
      },
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug(str) {
        console.log(`str`, str);
      },
      reconnectDelay: 5000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결됐을 때 실행할 함수
    client.onConnect = () => {
      client.subscribe("/message", message => {
        const datas = JSON.parse(message.body);
        console.log("message", datas);
      });
      client.subscribe(`/alarm/${userId}`, message => {
        const datas = JSON.parse(message.body);
        console.log("alarm", JSON.parse(message.body));
        console.log("alarm2", datas);
        const alarms = document.querySelector("#alarm");
        const alarm = document.createElement("li");

        if (datas) {
          if (datas.type === "POST_COMMENT") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title}에 댓글을 남겼습니다.`;
          } else if (datas.type === "ORDER_CANCEL") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 취소하였습니다.`;
          } else if (datas.type === "SALE_ORDER") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 했습니다.`;
          }
        }
        // alarm.innerText = `${message.body.sender}님께서 ${message.body.title}에 댓글을 남겼습니다.`;
        alarms?.appendChild(alarm);
      });
    };

    // 연결 실패했을 때 실행할 함수
    client.onStompError = frame => {
      console.log(`Broker reported error`, frame.headers.message);
      console.log(`Additional details:${frame.body}`);
    };

    // 클라이언트 활성화
    client.activate();
  }
  return (
    <>
      <Navbar />
      <Main>
        <div
          id="alarm"
          className="ml-10 list-none bg-gray-400 border-2 border-red-500"
        />
        <MainContent>
          <BestBlog />
          <BestBlogger />
          <BestProduct />
        </MainContent>
      </Main>
      <Footer />
    </>
  );
}
