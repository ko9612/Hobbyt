import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiOutlineLogout } from "react-icons/ai";
import { EmailState, PasswordState, LoginState } from "../../state/UserState";
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

export const SubNavList = tw.ul`
rounded-md
`;

export const SubList = tw.li`
text-white/80 text-sm flex items-center gap-x-4 p-4 
hover:bg-white/30 rounded-md transitions duration-300 hover:text-white
`;

export default function NavContent() {
  const router = useRouter();
  const setEmailState = useSetRecoilState(EmailState);
  const setPasswordState = useSetRecoilState(PasswordState);
  // 로그인 여부
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  // 로그아웃 모달
  const [showModal, setShowModal] = useState(false);

  // 홈 버튼 클릭
  const handleHomeClick = () => {
    router.push("/");
  };

  // 로그아웃 버튼 클릭
  const signoutClick = async () => {
    const signOutSubmit = await postSignout();

    if ((signOutSubmit as any).status === 200) {
      localStorage.removeItem("access-token");
      setIsLogin(false);
      setEmailState("");
      setPasswordState("");
      setShowModal(false);
      router.push("/");
    }
  };

  console.log(`로그인 여부`, isLogin);

  // const [butWord, setButWord] = useState("");
  // useEffect(() => {
  //   setIsLogin(getCookie("user"));
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
          {/* {(isLogin === true ? LoginMenus : LogoutMenus).map(menu => ( */}
          {(isLogin ? LoginMenus : LogoutMenus).map(menu => (
            // {/* {LoginMenus.map(menu => ( */}
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
