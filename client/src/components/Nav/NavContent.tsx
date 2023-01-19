import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { AiOutlineLogout } from "react-icons/ai";
import {
  EmailState,
  PasswordState,
  LoginState,
} from "../../../state/UserState";
import { LoginMenus, LogoutMenus } from "./NavArr";
import SearchBar from "../Page/Search/SearchBar";
import logo from "../../image/logo.png";
import DelModal from "../Modal/DelModal";
import { postSignout } from "../../api/signApi";

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
  const setEmailState = useSetRecoilState(EmailState);
  const setPasswordState = useSetRecoilState(PasswordState);
  const setLoginState = useSetRecoilState(LoginState);
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);
  // 로그아웃 모달
  const [showModal, setShowModal] = useState(false);
  // 홈 버튼 클릭
  const handleHomeClick = () => {
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("authorization")) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  // 로그아웃 버튼 클릭
  const signoutClick = async () => {
    const signOutSubmit = await postSignout();

    if ((signOutSubmit as any).status === 200) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("refresh");
      setLoginState(false);
      setEmailState("");
      setPasswordState("");
      setShowModal(false);
      router.replace("/");
    }
  };

  console.log(`로그인 여부`, isLogin);

  // const [butWord, setButWord] = useState("");
  // useEffect(() => {
  //   setIsLogin(true);
  // }, []);

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
                router.pathname === menu.href && "text-yellow-200"
              }`}
            >
              <Link href={menu.href}>
                <span className="block float-left text-2xl">{menu.icon}</span>
                <span className="p-5 text-base font-medium">{menu.title}</span>
              </Link>
            </List>
          ))}
          {isLogin && (
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
          )}
        </NavList>
      </NavList>
    </>
  );
}
