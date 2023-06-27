import tw from "tailwind-styled-components";
import { GrGallery } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import stomp from "./stomp";
import { LoginState, UserIdState } from "../../state/UserState";
import { getChatRoomMessage } from "../../api/websocketApi";

const UserInfo = tw.div`flex border-2 border-blue-500 text-2xl font-black items-center`;
const ChatView = tw.div`border-2 border-red-500 h-[28rem] my-6`;
const Textarea = tw.div`border-2 border-MainColor rounded-xl flex`;
const Gallery = tw.div`border-2 border-green-500 p-2`;
const Send = tw.div`border-2 border-orange-500`;

export default function ChatRoom({ chatRoomList, oldChatMsg }: any) {
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
  // const { chatRoomId } = chatRoomList;
  const userId = useRecoilValue(UserIdState);
  const isLogin = useRecoilValue(LoginState);

  // console.log("체크", chatRoomList);
  // // 불러온 메세지 내역 저장
  const [oldMsg, setOldMsg] = useState([]);

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

  // 채팅방 구독하기
  const chatRoomSubscibe = () => {
    if (isLogin) {
      stomp.onConnect = () => {
        stomp.subscribe(`/chat/${chatRoomList?.chatRoomId}`, message => {
          const datas = JSON.parse(message.body);
          console.log("채팅방 연결 완료");
          console.log("채팅방 구독?", datas);
        });
      };
      // 연결 실패했을 때 실행할 함수
      stomp.onStompError = frame => {
        console.log(`========> Broker reported error`, frame.headers.message);
        console.log(`========> Additional details:${frame.body}`);
      };

      // 클라이언트 활성화
      stomp.activate();
    }
  };

  // 채팅 내역 조회 api
  const getMessage = async () => {
    console.log("채팅 내역 조회 checkRoomId", checkRoomId);
    const res = await getChatRoomMessage(checkRoomId);
    const listRes = (res as any).data;
    console.log("가져온 메세지 내역", listRes);
    setOldMsg(listRes);
  };

  // 메세지 보내는 함수
  const sendValue = () => {
    // const chatMessage = {
    //   senderName: userData.username,
    //   message: userData.message,
    //   status: "MESSAGE",
    // };
    const chatMessage = {
      message: newMsg,
    };
    stomp.onConnect = () => {
      stomp.publish({
        destination: `/pub/chat/${chatRoomList?.chatRoomId}`,
        body: newMsg,
      });
    };
    console.log("===>메세지 보내는 함수", chatMessage);
    setNewMsg("");

    // setUserData({ ...userData, message: "" });
  };

  useEffect(() => {
    if (router.isReady) {
      chatRoomSubscibe();
      getMessage();
    }
  }, [router.isReady]);

  return (
    <div className="container">
      {/* {userData.connected ? ( */}
      {/* {oldMsg && oldMsg.chatroomId === checkRoomId ? ( */}
      {router.asPath === "/message" ? (
        <div>채팅을 시작해 보세요1111</div>
      ) : null}
      {chatRoomList && oldChatMsg && chatRoomList.chatRoomId === checkRoomId ? (
        <div>
          <UserInfo>
            <Image
              src={oldChatMsg.profileImage}
              width={45}
              height={45}
              alt="채팅방 유저 프로필 사진"
              className="rounded-full"
            />
            <p className="ml-2">{oldChatMsg.partnerNickname}</p>
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
