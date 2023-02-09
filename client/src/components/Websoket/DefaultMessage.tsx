import { BsEnvelope } from "react-icons/bs";

export default function DefaultMessage() {
  return (
    <>
      <BsEnvelope size={100} color="#B37DD1" className="m-auto" />
      <p className="text-gray-500">
        기존의 메세지를 선택하거나 <br />
        팔로우하는 유저 페이지를 통해 새로운 메세지를 전송하세요.
      </p>
    </>
  );
}
