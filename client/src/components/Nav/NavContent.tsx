import tw from "tailwind-styled-components";
import Image from "next/image";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginMenus } from "./NavArr";
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
bg-SubColor rounded-md
`;

export const SubList = tw.li`
text-white/60 text-sm flex items-center gap-x-4 p-2 p-5 
hover:bg-white/30 rounded-md transitions duration-300 hover:text-white
`;

export default function NavContent() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
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
            <Link href={menu.href}>
              <List
                key={menu.id}
                className={`${
                  router.pathname === menu.href && "text-yellow-200"
                }`}
              >
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span className="text-base font-medium flex-1 duration-200 w-">
                  {menu.title}
                </span>
                {menu.submenu && (
                  <BsFillCaretDownFill
                    size="25px"
                    role="button"
                    className={`transtions duration-300 ${
                      submenuOpen && "rotate-180"
                    }`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </List>
            </Link>
            <SubNavList
              className={`${
                menu.submenu && submenuOpen ? "translate-y-1" : ""
              } duration-300 relative`}
            >
              {menu.submenu && submenuOpen && (
                <>
                  {menu.submenuItems.map(submenuItem => (
                    <SubList key={menu.id}>
                      <Link href={submenuItem.href}>{submenuItem.title}</Link>
                    </SubList>
                  ))}
                </>
              )}
            </SubNavList>
          </>
        ))}
      </NavList>
    </>
  );
}
