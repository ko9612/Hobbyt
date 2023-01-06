import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LoginMenus,
  // LogoutMenus
} from "./NavArr";
import SearchBar from "./SearchBar";
import logo from "../../image/logo.png";

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
  const handleHomeClick = () => {
    router.push("/");
  };
  return (
    <>
      <Logo>
        <Image src={logo} role="button" alt="Home" onClick={handleHomeClick} />
      </Logo>
      <SearchBar />
      <NavList>
        {LoginMenus.map(menu => (
          <>
            <List
              key={menu.id}
              className={`${
                router.pathname === menu.href && "text-yellow-200"
              }`}
            >
              <Link href={menu.href}>
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span className="text-base font-medium p-5">{menu.title}</span>
              </Link>
            </List>

            {/* <SubNavList>
              {menu.submenu && (
                <>
                  {menu.submenuItems.map(submenuItem => (
                    <SubList
                      key={menu.id}
                      className={`${
                        router.pathname === submenuItem.href &&
                        "text-yellow-200"
                      }`}
                    >
                      <Link href={submenuItem.href}>{submenuItem.title}</Link>
                    </SubList>
                  ))}
                </>
              )}
            </SubNavList> */}
          </>
        ))}
        {/* <div className="bg-white rounded-lg mt-10 h-20" /> */}
      </NavList>
    </>
  );
}
