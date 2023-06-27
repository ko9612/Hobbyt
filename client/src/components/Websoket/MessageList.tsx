import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { BsEnvelope } from "react-icons/bs";
// import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatRoom from "./ChatRoom";
import { getChatRoomMessage } from "../../api/websocketApi";

const MContainer = tw.div`flex w-[62rem] content-start`;
const List = tw.li`flex m-auto mb-6 w-[22rem] border-2`;
const Info = tw.div`w-[14rem]`;
const Title = tw.div`flex`;

const MList = tw.ul`w-[31rem] mt-5 cursor-pointer`;
const MContent = tw.div`w-[31rem] text-center m-auto border-2 border-red-400`;
const HR = tw.div`bg-gray-200 p-0.5 h-[40rem]`;

const NotList = tw.div`m-auto w-[22rem]`;

export default function MessageList({ chatRoomList }: any) {
  // 클릭한 리스트가 배열의 몇번째인지 저장
  const [curIndex, setIndex] = useState(0);
  const router = useRouter();
  // 불러온 메세지 내역 저장
  const [oldChatMsg, setOldChatMsg] = useState();

  // 채팅 내역 조회 api
  const getMessage = async (roomId: number) => {
    const res = await getChatRoomMessage(roomId);
    const listRes = (res as any).data;
    setOldChatMsg(listRes);
  };

  // 클릭한 채팅방 chatRoomId 저장
  // const onClickChatRoom = (idx: number) => {
  //   setIndex(idx);
  // };

  // // 채팅방 구독하기
  // const chatRoomSubscibe = () => {
  //   //   client.onConnect = () => {
  //   console.log("STOMP Connection");

  //   client.subscribe(`/chat/${chatRoomList[curIndex].chatRoomId}`, message => {
  //     const datas = JSON.parse(message.body);
  //     console.log("채팅방 연결 완료");
  //     console.log("채팅방 구독?", datas);
  //   });
  // };
  // // // 연결 실패했을 때 실행할 함수
  // // client.onStompError = frame => {
  // //   console.log(`========> Broker reported error`, frame.headers.message);
  // //   console.log(`========> Additional details:${frame.body}`);
  // // };

  // // // 클라이언트 활성화
  // // client.activate();
  // // };

  // 채팅방 리스트에서 클릭한 채팅방의 idx와 roomId를 저장하고,
  // 저장한 roomId를 채팅 내역 조회 api 함수의 매개변수로 넘겨줘서 내역을 조회하게 함
  const onClickHandler = (index: number, roomId: number) => {
    setIndex(index);
    getMessage(roomId);
    // chatRoomSubscibe();
  };

  useEffect(() => {}, [router.isReady]);

  return (
    <MContainer>
      <MList>
        {chatRoomList.length !== 0 ? (
          chatRoomList.map((user: any, idx: number) => (
            <List
              key={idx}
              onClick={() => onClickHandler(idx, user.chatRoomId)}
            >
              <Link
                href={`/message/${user.chatRoomId}`}
                // onClick={() => onClickChatRoom(user.chatRoomId)}
              >
                <div className="flex">
                  <Image
                    src={user.profileImage}
                    width={45}
                    height={45}
                    alt="메세지 리스트 유저 프로필 사진"
                    className="object-cover w-[3rem] h-[3rem] rounded-full"
                  />
                  <Info>
                    <Title>
                      <p className="ml-2 font-semibold">
                        {user.partnerNickname}
                      </p>
                      <p>{user.lastSentAt}</p>
                    </Title>
                    <p className="w-[14rem] truncate">{user.lastMessage}</p>
                  </Info>
                </div>
              </Link>
            </List>
          ))
        ) : (
          <NotList>채팅중인 멤버가 없습니다.</NotList>
        )}
      </MList>
      <HR />
      <MContent>
        <ChatRoom
          chatRoomList={chatRoomList[curIndex]}
          oldChatMsg={oldChatMsg}
        />
        {/* {chatRoomList[curIndex].chatRoomId === curIndex ? (
          <ChatRoom />
        ) : ({DefaultMessageText()}
        )} */}
      </MContent>
    </MContainer>
  );
}

// function DefaultMessageText() {
//   return (
//     <div>
//       <BsEnvelope size={100} color="#B37DD1" className="m-auto" />
//       <p className="text-gray-500">
//         기존의 메세지를 선택하거나 <br />
//         팔로우하는 유저 페이지를 통해 새로운 메세지를 전송하세요.
//       </p>
//     </div>
//   );
// }
