import * as StompJS from "@stomp/stompjs";

let token;

if (typeof window !== "undefined") {
  token = localStorage.getItem("authorization");

  const webSocket = new WebSocket("wss://hobbyt.saintho.dev/websocket");
  webSocket.onopen = function () {
    console.log("웹소켓 연결 성공");
  };
}

const client = new StompJS.Client({
  brokerURL: "wss://hobbyt.saintho.dev/websocket",
  beforeConnect: () => {
    console.log("beforeConnect");
  },
  connectHeaders: {
    Authorization: `Bearer ${token}`,
  },
  debug(str) {
    console.log(`str`, str);
  },
  reconnectDelay: 15000, // 자동 재연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default client;
