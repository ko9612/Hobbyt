import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsBellFill, BsEnvelopeFill } from "react-icons/bs";
import { FaBlogger } from "react-icons/fa";
import {
  EmailState,
  LoginState,
  NicknameState,
  OauthState,
  UserIdState,
  UserProfileState,
} from "../../state/UserState";
import SearchBar from "../Page/Search/SearchBar";
import logo from "../../image/logo.png";
import DelModal from "../Modal/DelModal";
import { postSignout } from "../../api/signApi";
import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";

export const Logo = tw.div`
inline-flex ml-2 p-3 rounded-full hover:bg-white/40 transitions duration-300 w-[4.5rem]
`;

export const NavList = tw.ul`
px-2 pt-6
`;

export const List = tw.li`
my-3 text-white/80 flex items-center gap-x-4 p-2
hover:bg-white/40  rounded-md mt-6 
transitions duration-300 text-xl hover:text-white hover:font-bold
`;

export default function NavContent() {
  const router = useRouter();
  const [, setEmailState] = useRecoilState(EmailState);
  // 로그인 여부
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const [isNickname, setIsNickname] = useRecoilState(NicknameState);
  const [navProfileImg, setNavProfileImg] = useRecoilState(UserProfileState);
  const [userId, setIsUserId] = useRecoilState(UserIdState);
  const [, setOauthLogin] = useRecoilState(OauthState);
  // 로그아웃 모달
  const [showModal, setShowModal] = useState(false);
  // 홈 버튼 클릭
  const handleHomeClick = () => {
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("authorization")) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
  }, []);

  // 로그아웃 버튼 클릭
  const signoutClick = async () => {
    const signOutSubmit = await postSignout();

    if ((signOutSubmit as any).status === 200) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("refresh");
      setLogin(false);
      setOauthLogin(false);
      setEmailState("");
      setIsUserId(0);
      setIsNickname("");
      setNavProfileImg("");
      setShowModal(false);
      router.replace("/");
    }
  };

  const LogoutMenus = [
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

  const LoginMenus = [
    {
      id: 2,
      title: "알림",
      href: "/notice",
      icon: <BsBellFill size="35px" />,
    },
    {
      id: 3,
      title: "메세지",
      href: "/message",
      icon: <BsEnvelopeFill size="35px" />,
    },
    {
      id: 4,
      title: "내 블로그",
      href: `/blog/${userId}`,
      icon: <FaBlogger size="35px" />,
    },
  ];

  return (
    <>
      {showModal && (
        <DelModal
          msg="로그아웃 하시겠습니까?"
          subMsg={["메인화면으로 이동합니다."]}
          buttonString="로그아웃"
          setOpenModal={setShowModal}
          afterClick={signoutClick}
        />
      )}
      <Logo>
        <Image src={logo} role="button" alt="Home" onClick={handleHomeClick} />
      </Logo>
      <SearchBar />
      <NavList>
        <NavList>
          {(isLogin ? LoginMenus : LogoutMenus).map(menu => (
            <List
              key={menu.id}
              className={`${
                (router.pathname === menu.href ||
                  (menu.title === "내 블로그" &&
                    router.pathname === "/blog/[userId]")) &&
                "text-yellow-200"
              }`}
            >
              <Link href={menu.href}>
                <span className="block float-left text-2xl">{menu.icon}</span>
                <span className="p-5 text-base font-medium">{menu.title}</span>
              </Link>
            </List>
          ))}
          {isLogin && (
            <>
              <List
                className={`${
                  router.pathname.startsWith(`/mypage`) && "text-yellow-200"
                }`}
              >
                <Link href={`/mypage/${userId}`}>
                  <span className="block float-left text-2xl">
                    <DefaultProfileImg
                      profileImg={`${navProfileImg}`}
                      width={35}
                      height={35}
                      borderW={2}
                      w={2.2}
                      h={2.2}
                    />
                  </span>
                  <span className="p-5 text-base font-medium">
                    {isNickname}
                  </span>
                </Link>
              </List>
              <List>
                <span
                  role="presentation"
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer"
                >
                  <span className="block float-left text-2xl">
                    <AiOutlineLogout size="35px" />
                  </span>
                  <span className="p-5 text-base font-medium">로그아웃</span>
                </span>
              </List>
            </>
          )}
        </NavList>
      </NavList>
    </>
  );
}
