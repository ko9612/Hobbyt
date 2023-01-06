import tw from "tailwind-styled-components";

import NavContent from "./NavContent";

export const NavBar = tw.nav`
  flex
`;

export const Nav = tw.nav`
bg-MainColor h-full p-5 fixed z-10 overflow-y-auto scrollbar w-[18rem] top-0 
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
