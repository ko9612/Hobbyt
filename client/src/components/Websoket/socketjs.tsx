/* eslint-disable react-hooks/rules-of-hooks */
import SockJS from "sockjs-client";
import tw from "tailwind-styled-components";
import * as StompJs from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { LoginState, UserIdState } from "../../state/UserState";
import NoticeModal from "../Modal/NoticeModal";

export default function WebSoketConnect(isLogin, userId) {
  // const isLogin = useRecoilValue(LoginState);
  // const userId = useRecoilValue(UserIdState);
  // 알림 왔는 지 안 왔는지 상태 저장
  // const [notice, setNotice] = useState([]);

  if (isLogin) {
    const token = localStorage.getItem("authorization");
    // 웹 소켓 연결
    const webSocket = new WebSocket("ws://59.12.62.150:8080/websocket");

    webSocket.onopen = function () {
      console.log("웹소켓 연결 성공");
    };

    const client = new StompJs.Client({
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

    // 연결됐을 때 실행할 함수, 에러 처리 담당 함수 구현
    client.onConnect = function (frame) {
      client.subscribe("/message", message => {
        const datas = JSON.parse(message.body);
        console.log("message", datas);
      });
      client.subscribe(`/alarm/${userId}`, message => {
        const datas = JSON.parse(message.body);
        console.log("alarm", datas);
        // setNotice(datas);
        const notice = datas;
        return (
          <div className="absolute z-50 border-black border-5 bg-slate-400">
            {notice && notice.title}
          </div>
        );
      });
      // client.subscribe(`/chat/${chatRoomId}`, message => {
      //   const datas = JSON.parse(message.body);
      //   console.log("alarm", datas);
      // });
    };

    client.onStompError = function (frame) {
      console.log(`Broker reported error`, frame.headers.message);
      console.log(`Additional details:${frame.body}`);
    };

    // 클라이언트 활성화
    client.activate();
  }
}

// 클라이언트 비활성화하고 싶을 때는 아래와 같이 입력,
// 활성화 연결이 있는 경우 => 다시 연결 및 연결 중지함
// client.deactivate();

// // SoketJS으로 소켓 미지원 브라우저 대응
// if (typeof WebSocket !== "function") {
//   client.webSocketFactory = function () {
//     return new SockJS();
//   };
// }
