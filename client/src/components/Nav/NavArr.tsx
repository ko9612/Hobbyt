import { BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";

export const LogoutMenus = [
  {
    id: 0,
    title: "로그인",
    href: "/sigin",
    icon: <AiOutlineLogin size="35px" />,
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
    icon: <FaUserCircle size="35px" />,
  },
  {
    id: 3,
    title: "더 보기",
    href: "",
    icon: <CgMoreO size="35px" />,
    submenu: true,
    submenuItems: [
      {
        id: 4,
        title: "로그아웃",
        href: "/#",
      },
      {
        id: 5,
        title: "회원 탈퇴",
        href: "/#",
      },
      {
        id: 6,
        title: "내 정보",
        href: "/#",
      },
      {
        id: 7,
        title: "판매 관리",
        href: "/#",
      },
      {
        id: 8,
        title: "구매한 작품",
        href: "/#",
      },
      {
        id: 9,
        title: "판매한 작품",
        href: "/#",
      },
    ],
  },
];
