import { BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";

export const LogoutMenus = [
  {
    id: 0,
    title: "로그인",
    href: "/signin",
    icon: <AiOutlineLogin size="35px" />,
  },
  {
    id: 1,
    title: "회원가입",
    href: "/signup",
    icon: <AiOutlineUserAdd size="35px" />,
  },
];

export const LoginMenus = [
  {
    id: 0,
    title: "알림",
    href: "/notice",
    icon: <BsBellFill size="35px" />,
  },
  {
    id: 1,
    title: "메세지",
    href: "/message",
    icon: <BsEnvelopeFill size="35px" />,
  },
  {
    id: 2,
    title: "내 블로그",
    href: "/blog",
    icon: <FaBlogger size="35px" />,
  },
  {
    id: 3,
    title: "user_name",
    href: "/mypage",
    icon: <DefaultProfileImg width={35} height={35} borderW={2} />,
    // <div className="bg-white rounded-full w-9 h-9" />,
  },
];
