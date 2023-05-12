import tw from "tailwind-styled-components";
import * as StompJS from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
// import { useRouter } from "next/router";
// import { useRef } from "react";
import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";
import { LoginState, UserIdState } from "../src/state/UserState";

export const Main = tw.main`lg:ml-[18rem] px-6`;
export const MainSection = tw.section`max-w-[62rem]`;

export const MainContent = tw.div`max-w-[50rem] m-auto`;

export default function Home() {
  // const router = useRouter();

  // 아래부터 웹소켓 연결 함수 // 콘솔에 계속 찍히는 거 보기 싫어서 잠시 지워둠

  // const isLogin = useRecoilValue(LoginState);
  // const userId = useRecoilValue(UserIdState);

  // if (isLogin) {
  //   const token = localStorage.getItem("authorization");
  //   const webSocket = new WebSocket("wss://hobbyt.saintho.dev/websocket");
  //   webSocket.onopen = function () {
  //     console.log("웹소켓 연결 성공");
  //   };

  //   const client = new StompJS.Client({
  //     brokerURL: "wss://hobbyt.saintho.dev/websocket",
  //     beforeConnect: () => {
  //       console.log("beforeConnect");
  //     },
  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     debug(str) {
  //       console.log(`str`, str);
  //     },
  //     reconnectDelay: 5000, // 자동 재연결
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   // 연결됐을 때 실행할 함수
  //   client.onConnect = () => {
  //     client.subscribe("/message", message => {
  //       const datas = JSON.parse(message.body);
  //       console.log("message", datas);
  //     });
  //     client.subscribe(`/alarm/${userId}`, message => {
  //       const datas = JSON.parse(message.body);
  //       console.log("alarm", JSON.parse(message.body));
  //       console.log("alarm2", datas);
  //       const alarms = document.querySelector("#alarm");
  //       const alarm = document.createElement("li");

  //       if (datas) {
  //         if (datas.type === "POST_COMMENT") {
  //           alarm.innerText = `${datas.sender} 님께서 ${datas.title}에 댓글을 남겼습니다.`;
  //         } else if (datas.type === "ORDER_CANCEL") {
  //           alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 취소하였습니다.`;
  //         } else if (datas.type === "SALE_ORDER") {
  //           alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 했습니다.`;
  //         }
  //       }
  //       // alarm.innerText = `${message.body.sender}님께서 ${message.body.title}에 댓글을 남겼습니다.`;
  //       alarms?.appendChild(alarm);

  //       // alarm에 id 만들어서 getElementById로 찾아서 onClick 달려고 했는데 안 되는 듯...
  //       // alarm.setAttribute("id", "onClickId");
  //       // className이 아니라 class로 적어야 됨...
  //       alarm.setAttribute("class", "alarm-list");
  //     });
  //   };

  //   // 연결 실패했을 때 실행할 함수
  //   client.onStompError = frame => {
  //     console.log(`Broker reported error`, frame.headers.message);
  //     console.log(`Additional details:${frame.body}`);
  //   };

  //   // 클라이언트 활성화
  //   client.activate();
  // }
  return (
    <>
      <Navbar />
      <Main>
        <MainSection>
          <div
            id="alarm"
            className="p-2 list-none max-w-[24rem] cursor-pointer"
          />
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

// export const Client = (router, userId, clear, chatRoomId, newMsg) => {
// export const Client = () => {
//   const router = useRouter();
//   const userId = useRecoilValue(UserIdState);
//   const token = localStorage.getItem("authorization");
//   const webSocket = new WebSocket("wss://hobbyt.saintho.dev/websocket");
//   webSocket.onopen = function () {
//     console.log("웹소켓 연결 성공");
//   };

//   const client = new StompJS.Client({
//     brokerURL: "wss://hobbyt.saintho.dev/websocket",
//     beforeConnect: () => {
//       console.log("beforeConnect");
//     },
//     connectHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//     debug(str) {
//       console.log(`str`, str);
//     },
//     reconnectDelay: 5000, // 자동 재연결
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });

//   // 연결됐을 때 실행할 함수
//   client.onConnect = () => {
//     client.subscribe("/message", message => {
//       const datas = JSON.parse(message.body);
//       console.log("message", datas);
//     });
//     client.subscribe(`/alarm/${userId}`, message => {
//       const datas = JSON.parse(message.body);
//       console.log("alarm", JSON.parse(message.body));
//       console.log("alarm2", datas);
//       const alarms = document.querySelector("#alarm");
//       const alarm = document.createElement("li");
//       // const alarm = document.createElement("li");
//       // // 부모요소 id #alarm에 alarm 이라는 자식 요소 추가하기
//       // const alarms = document.querySelector("#alarm")?.append(alarm);

//       if (datas) {
//         if (datas.type === "POST_COMMENT") {
//           alarm.innerText = `${datas.sender} 님께서 ${datas.title}에 댓글을 남겼습니다.`;
//         } else if (datas.type === "ORDER_CANCEL") {
//           alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 취소하였습니다.`;
//         } else if (datas.type === "SALE_ORDER") {
//           alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 했습니다.`;
//         }
//       }
//       // alarm.innerText = `${message.body.sender}님께서 ${message.body.title}에 댓글을 남겼습니다.`;
//       alarms?.appendChild(alarm);
//       // alarm에 id 만들어서 getElementById로 찾아서 onClick 달려고 했는데 안 되는 듯...
//       // alarm.setAttribute("id", "onClickId");

//       // className이 아니라 class로 적어야 됨...
//       alarm.setAttribute("class", "alarm-list");

//       alarm.onclick = e => {
//         e.preventDefault();
//         router.replace("/notice");
//         if (alarms !== null) {
//           alarms.remove();
//         }
//       };
//     });

//     if (clear === true) {
//       client.subscribe(`/chat/${chatRoomId}`, message => {
//         const datas = JSON.parse(message.body);
//         console.log("채팅", datas);
//         // const senderId = JSON[Symbol]p
//       });
//     }

//     client.publish({
//       destination: `/chat/room/${chatRoomId}`,
//       body: newMsg,
//     });
//   };

//   // 연결 실패했을 때 실행할 함수
//   client.onStompError = frame => {
//     console.log(`Broker reported error`, frame.headers.message);
//     console.log(`Additional details:${frame.body}`);
//   };

//   // 클라이언트 활성화
//   client.activate();
// };
