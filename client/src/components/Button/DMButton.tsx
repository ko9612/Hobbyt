import { useRouter } from "next/router";
import { useState } from "react";
import { BsChatLeftDots } from "react-icons/bs";
import { postChatRoomId } from "../../api/chatApi";

export default function DMButton() {
  const router = useRouter();
  const [roomId, setRoomId] = useState(0);
  const homeId = Number(router.query.userId);

  // 디엠하기 버튼 눌렀을 때 채팅방 id 조회 api
  const getId = async () => {
    const data = {
      partnerId: homeId,
    };

    console.log("데이타", data);
    const res = await postChatRoomId(data);
    const resID = Number(res.data);
    setRoomId(resID);
    console.log("왜안됨", res);
  };

  const handleClick = () => {
    getId();

    if (roomId !== 0) {
      router.replace(`/message/${roomId}`);
    }
  };
  console.log("roomid", roomId);
  return (
    <button
      className="p-3 bg-gray-400 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <BsChatLeftDots className="m-auto w-[1.2rem] h-[1.2rem]" />
    </button>
  );
}
