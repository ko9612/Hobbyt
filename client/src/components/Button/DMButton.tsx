import { useRouter } from "next/router";
import { useState } from "react";
import { BsChatLeftDots } from "react-icons/bs";
import { postChatRoomId } from "../../api/chatApi";

interface DMPropsType {
  children: string;
}

interface ResDataType {
  data: string;
}

export default function DMButton({ children }: DMPropsType) {
  const router = useRouter();
  const [roomId, setRoomId] = useState(0);
  const homeId = Number(router.query.userId);

  // 디엠하기 버튼 눌렀을 때 채팅방 id 조회 api
  const getId = async () => {
    const data = {
      partnerId: homeId,
    };
    const res = await postChatRoomId(data);
    const resID = Number((res as ResDataType).data);
    setRoomId(resID);
  };

  const handleClick = () => {
    getId();

    if (roomId !== 0) {
      router.replace(`/message/${roomId}`);
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function HandleChildren() {
    if (children === "문의하기") {
      return "문의하기";
    }
    if (children === "채팅하기") {
      return "채팅하기";
    }
    if (children === "블로그") {
      return <BsChatLeftDots className="m-auto w-[1.2rem] h-[1.2rem]" />;
    }
  }

  return (
    <button
      className={
        children === "문의하기" || children === "채팅하기"
          ? "p-2 px-4 mr-3 bg-gray-400 rounded-lg cursor-pointer"
          : "p-2 mr-3 bg-gray-400 rounded-lg cursor-pointer"
      }
      onClick={handleClick}
    >
      {children && HandleChildren()}
    </button>
  );
}
