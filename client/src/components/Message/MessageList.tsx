import tw from "tailwind-styled-components";
import { useState } from "react";
import DefaultProfileImg from "../UserHome/DefaultProfileImg";
import DefaultMessage from "./DefaultMessage";
import ChatRoom from "./ChatRoom";

const arr = [
  {
    profile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    name: "닉네임여섯자",
    message:
      "메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. ",
    date: "23.01.01",
    idx: 0,
  },
  {
    profile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    name: "닉네임",
    message:
      "메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. ",
    date: "23.01.01",
  },
  {
    profile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    name: "안지은",
    message:
      "메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. ",
    date: "23.01.01",
  },
  {
    profile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    name: "고하나",
    message:
      "메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. ",
    date: "23.01.01",
  },
  {
    profile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    name: "user12",
    message:
      "메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. 메세지 내용입니다. ",
    date: "23.01.01",
  },
];

export default function MessageList() {
  const [curIndex, setIndex] = useState(0);
  const messageArr = arr;

  const MContainer = tw.div`flex w-[62rem] content-start`;
  const List = tw.li`flex m-auto mb-6 w-[22rem] border-2`;
  const Info = tw.div`w-[14rem]`;
  const Title = tw.div`flex`;

  const MList = tw.ul`w-[31rem] mt-5 cursor-pointer`;
  const MContent = tw.div`w-[31rem] text-center m-auto`;
  const HR = tw.div`bg-gray-200 p-0.5 h-[40rem]`;

  const onClickHandler = (index: number) => {
    setIndex(index);
  };

  return (
    <MContainer>
      <MList>
        {messageArr.map((user, idx) => (
          <List key={idx} onClick={() => onClickHandler(idx)}>
            <p className="w-[4rem]">{user.profile}</p>
            <Info>
              <Title>
                <p className="mr-2 font-semibold">{user.name}</p>
                <p>{user.date}</p>
              </Title>
              <p className="w-[14rem] truncate">{user.message}</p>
            </Info>
          </List>
        ))}
      </MList>
      <HR />
      <MContent>
        {messageArr[curIndex].idx === curIndex ? (
          <ChatRoom />
        ) : (
          <DefaultMessage />
        )}
      </MContent>
    </MContainer>
  );
}
