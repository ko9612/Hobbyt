import tw from "tailwind-styled-components";

import NavContent from "./NavContent";

export const NavBar = tw.nav`
    flex
`;

export const Nav = tw.nav`
bg-MainColor h-full p-5 fixed z-10
`;

export const Logo = tw.div`
    inline-flex ml-2 p-3 rounded-full hover:bg-white/40 transitions duration-300
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

export default function Navbar() {
  return (
    <NavBar>
      <Nav>
        <NavContent />
      </Nav>
    </NavBar>
  );
}
