import tw from "tailwind-styled-components";
import { GrGallery } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
import React, { useState } from "react";
import Image from "next/image";

// import * as StompJS from "@stomp/stompjs";
// import SockJS from "sockjs-client";
import { useRouter } from "next/router";
// import { useRecoilValue } from "recoil";
// import { CompatClient } from "@stomp/stompjs";
// import { getChatRoomMessage } from "../../api/chatApi";
// import { Client } from "../../../pages";
// import { LoginState, UserIdState } from "../../state/UserState";

const UserInfo = tw.div`flex border-2 border-blue-500 text-2xl font-black items-center`;
const ChatView = tw.div`border-2 border-red-500 h-[28rem] my-6`;
const Textarea = tw.div`border-2 border-MainColor rounded-xl flex`;
const Gallery = tw.div`border-2 border-green-500 p-2`;
const Send = tw.div`border-2 border-orange-500`;

// const stompClient: any = null;

export default function ChatRoom({ chatRoomList, oldMsg }: any) {
  // export default function ChatRoom() {
  // 이미지를 추가했는지, 안했는지 여부
  const [checkImage, setCheckImage] = useState(false);
  // 추가한 이미지 저장
  const [newImage, setNewImage] = useState("/images");
  // 메세지 입력 저장
  const [newMsg, setNewMsg] = useState("");
  // props로 받은 chatRoomList와 현재 클릭한 chatRoomList가 같은지 확인
  const router = useRouter();
  const checkRoomId = Number(router.query.ChatRoomId);
  // const userId = useRecoilValue(UserIdState);
  // const isLogin = useRecoilValue(LoginState);

  console.log("라우터", router);

  // console.log("체크", checkRoomId);
  // // 불러온 메세지 내역 저장
  // const [oldMsg, setOldMsg] = useState([]);

  // 사용자 이름, 보낸 사람 이름, 연결 여부,
  // const [userData, setUserData] = useState({
  //   username: "",
  //   recievername: "",
  //   connected: true,
  //   message: "",
  // });
  // const [publicChats, setPublicChats] = useState();

  // 아래 이미지 올리는 함수 수정해야함 작동안함
  const handleChangeImage = (e: any) => {
    const reader = new FileReader();
    if (e.target.file[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage: any = reader.result;
      setNewImage(resultImage);
      setCheckImage(true);
    };

    console.log("이미지요", newImage);
  };

  // 메시지 입력 본문
  const handleChangeMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMsg(e.target.value);
  };

  // const handleClickSend = e => {
  //   if (newMsg.length !== 0) {
  //     console.log("나중에할게...");
  //   }
  // };

  // ㅋㅋ...

  // // 채팅방 연결
  // Client(router, userId, true, checkRoomId);

  // // 채팅 내역 조회 api
  // const getMessage = async () => {
  //   console.log("왜???????/", checkRoomId);
  //   const res = await getChatRoomMessage(checkRoomId);
  //   const listRes = res.data;
  //   console.log("가져온 메세지 내역", listRes);
  //   setOldMsg(listRes);
  // };

  // const Web = () => {
  // if (isLogin) {
  //   const token = localStorage.getItem("authorization");
  //   const webSocket = new WebSocket("wss://hobbyt.saintho.dev/websocket");
  //   webSocket.onopen = function () {
  //     console.log("웹소켓 연결 성공");
  //   };
  //   // eslint-disable-next-line prefer-const
  //   let client = new StompJS.Client({
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
  // // 라우터가 메세지일 경우 = 메세지 페이지로 접속했을 경우 채팅룸 구독
  // if (router.asPath === `/message/${checkRoomId}`) {
  //   client.subscribe(`/chat/${checkRoomId}`, message => {
  //     const datas = JSON.parse(message.body);
  //     console.log("채팅", datas);
  //     // const senderId = JSON[Symbol]p
  //   });
  // }
  // client.publish({
  //   destination: `/pub/chat/${checkRoomId}`,
  //   body: newMsg,
  // });
  // };
  //   // 연결 실패했을 때 실행할 함수
  //   client.onStompError = frame => {
  //     console.log(`Broker reported error`, frame.headers.message);
  //     console.log(`Additional details:${frame.body}`);
  //   };
  //   // 클라이언트 활성화
  //   client.activate();
  // }

  // // 메세지 보내는 함수
  const sendValue = () => {};
  //   // if (stompClient) {
  //   //   const chatMessage = {
  //   //     senderName: userData.username,
  //   //     message: userData.message,
  //   //     status: "MESSAGE",
  //   //   };
  //   //   console.log(chatMessage);
  //   //   stompClient.send(
  //   //     `/chat/room/${checkRoomId}`,
  //   //     {},
  //   //     JSON.stringify(chatMessage),
  //   //   );
  //   //   setUserData({ ...userData, message: "" });
  //   // }
  //   // Client(router, userId, true, checkRoomId, newMsg);
  // };
  // // console.log("oldMsg", oldMsg);
  // // console.log("oldMsg.chatroomId", oldMsg.chatroomId);
  // // console.log("checkRoomId", checkRoomId);

  // console.log("챗룸 페이지 oldMsg", oldMsg);

  // useEffect(() => {}, [router.isReady]);

  return (
    <div className="container">
      {/* {userData.connected ? ( */}
      {/* {oldMsg && oldMsg.chatroomId === checkRoomId ? ( */}
      {router.asPath === "/message" ? (
        <div>채팅을 시작해 보세요1111</div>
      ) : null}
      {chatRoomList && oldMsg && chatRoomList.chatRoomId === checkRoomId ? (
        <div>
          <UserInfo>
            <Image
              src={oldMsg.profileImage}
              width={45}
              height={45}
              alt="채팅방 유저 프로필 사진"
            />
            <p className="ml-2">{oldMsg.partnerNickname}</p>
          </UserInfo>
          <ChatView>
            {oldMsg.messages &&
              oldMsg.messages.map((item: any, idx: number) => (
                <div key={idx}>
                  <p>{item.senderId}</p>
                  <span>{item.content}</span>
                  <span>{item.sentAt}</span>
                </div>
              ))}
            <div id="chatVeiw" />
            {checkImage && newImage === undefined ? (
              <Image
                src={newImage}
                width={150}
                height={150}
                alt="채팅이미지?"
              />
            ) : null}
          </ChatView>
          <Textarea>
            <Gallery>
              <input
                type="file"
                id="GalleryImage"
                className="hidden p-2 mt-2 bg-gray-200 rounded-lg w-60"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleChangeImage}
              />
              <label role="presentation" htmlFor="GalleryImage">
                <GrGallery size={40} />
              </label>
            </Gallery>
            <textarea
              className="border-2 border-MainColor w-[24rem] m-2"
              onChange={handleChangeMsg}
              value={newMsg}
            />
            <Send>
              {/* <BsSend size={40} /> */}
              <button onClick={sendValue}>보내기</button>
            </Send>
          </Textarea>
        </div>
      ) : // <div className="register">
      //   <input
      //     id="user-name"
      //     placeholder="Enter the user name"
      //     value={userData.username}
      //     onChange={handleUserName}
      //   />
      //   <button type="button" onClick={registerUser}>
      //     connect
      //   </button>
      // </div>
      null}
    </div>
  );
}

// const onMessageReceived = payload => {
//   const payloadData = JSON.parse(payload.body);
//   if (payloadData.status === 200 || payloadData.status === 201) {
//     publicChats.push(payloadData);
//     setPublicChats([...publicChats]);
//   }
//   // switch
// };

// const onConnected = () => {
//   setUserData({ ...userData, connected: true });
//   stompClient.subscribe(`/chat/${checkRoomId}`, onMessageReceived);
// };

// const onError = err => {
//   console.log(err);
// };

// const connect = () => {
//   const Sock = new SockJS("https://hobbyt.saintho.dev/websocket");
//   stompClient = over(Sock);
//   stompClient.connect({}, onConnected, onError);
// };

// const sendValue = () => {
//   if (stompClient) {
//     const chatMessage = {
//       senderName: userData.username,
//       message: userData.message,
//       status: "MESSAGE",
//     };
//     console.log(chatMessage);
//     stompClient.send(
//       `/chat/room/${checkRoomId}`,
//       {},
//       JSON.stringify(chatMessage),
//     );
//     setUserData({ ...userData, message: "" });
//   }
// };

// const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { value } = e.target;
//   // 이름만 바뀐 거기 때문에 username만 변경됨
//   setUserData({ ...userData, username: value });
// };

// const registerUser = () => {
//   connect();
// };

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// import tw from "tailwind-styled-components";
// import { GrGallery } from "react-icons/gr";
// // import { BsSend } from "react-icons/bs";
// import React, { useState } from "react";
// import Image from "next/image";

// const UserInfo = tw.div`flex border-2 border-blue-500 text-2xl font-black`;
// const ChatView = tw.div`border-2 border-red-500 h-[28rem] my-6`;
// const Textarea = tw.div`border-2 border-MainColor rounded-xl flex`;
// const Gallery = tw.div`border-2 border-green-500 p-2`;
// const Send = tw.div`border-2 border-orange-500`;

// export default function ChatRoom() {
//   // 이미지를 추가했는지, 안했는지 여부
//   const [checkImage, setCheckImage] = useState(false);
//   // 추가한 이미지 저장
//   const [newImage, setNewImage] = useState("/images");
//   // 메세지 입력 저장
//   const [newMsg, setNewMsg] = useState("");

//   // 아래 이미지 올리는 함수 수정해야함 작동안함
//   const handleChangeImage = (e: any) => {
//     const reader = new FileReader();
//     if (e.target.file[0]) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//     reader.onloadend = () => {
//       const resultImage: any = reader.result;
//       setNewImage(resultImage);
//       setCheckImage(true);
//     };

//     console.log("이미지요", newImage);
//   };

//   // 메시지 입력 본문
//   const handleChangeMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewMsg(e.target.value);
//   };

//   const handleClickSend = e => {
//     if (newMsg.length !== 0) {
//       console.log("나중에할게...");
//     }
//   };

//   return (
//     <div>
//       <UserInfo>
//         <p className="">유저 사진</p>
//         <p>유저이름</p>
//       </UserInfo>
//       <ChatView>
//         <div id="chatVeiw" />
//         {checkImage && newImage === undefined ? <Image src={newImage} /> : null}
//       </ChatView>
//       <Textarea>
//         <Gallery>
//           <input
//             type="file"
//             id="GalleryImage"
//             className="hidden p-2 mt-2 bg-gray-200 rounded-lg w-60"
//             accept="image/jpeg, image/png, image/jpg"
//             onChange={handleChangeImage}
//           />
//           <label role="button" htmlFor="GalleryImage">
//             <GrGallery size={40} />
//           </label>
//         </Gallery>
//         <textarea
//           className="border-2 border-MainColor w-[24rem] m-2"
//           onChange={handleChangeMsg}
//           value={newMsg}
//         />
//         <Send>
//           {/* <BsSend size={40} /> */}
//           <button onClick={handleClickSend}>보내기</button>
//         </Send>
//       </Textarea>
//     </div>
//   );
// }
