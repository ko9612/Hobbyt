import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
// import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatRoom from "./ChatRoom";
import { getChatRoomMessage } from "../../api/chatApi";

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
  // const checkRoomId = Number(router.query.ChatRoomId);
  // 불러온 메세지 내역 저장
  const [oldMsg, setOldMsg] = useState();

  console.log("chatRoomList", chatRoomList);

  // 채팅 내역 조회 api
  const getMessage = async (roomId: number) => {
    console.log("채팅내역조회 checkRoomId", roomId);
    const res = await getChatRoomMessage(roomId);
    const listRes = res.data;
    console.log("가져온 메세지 내역", listRes);
    setOldMsg(listRes);
  };

  // 채팅방 리스트에서 클릭한 채팅방의 idx와 roomId를 저장하고,
  // 저장한 roomId를 채팅 내역 조회 api 함수의 매개변수로 넘겨줘서 내역을 조회하게 함
  const onClickHandler = (index: number, roomId: number) => {
    setIndex(index);
    getMessage(roomId);
  };

  // 클릭한 채팅방 chatRoomId 저장
  // const onClickChatRoom = (idx: number) => {
  //   setIndex(idx);
  //   console.log("idx", idx);
  // };

  useEffect(() => {}, [router.isReady]);
  console.log("curIndex", curIndex);

  return (
    <MContainer>
      <MList>
        {chatRoomList.length !== 0 ? (
          chatRoomList.map((user, idx: number) => (
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
                    alt="유저 프로필 사진"
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
        <ChatRoom chatRoomList={chatRoomList[curIndex]} oldMsg={oldMsg} />
        {/* {chatRoomList[curIndex].chatRoomId === curIndex ? (
          <ChatRoom />
        ) : (
          <DefaultMessage />
        )} */}
      </MContent>
    </MContainer>
  );
}
