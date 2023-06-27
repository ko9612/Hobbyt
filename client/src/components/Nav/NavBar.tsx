import tw from "tailwind-styled-components";
import MobileNav, { Nav } from "./MobileNav";
import NavContent from "./NavContent";

export const NavBar = tw.div`flex`;

function Navbar() {
  return (
    <>
      <MobileNav />
      <div className="hidden lg:block">
        <NavBar>
          <Nav>
            <NavContent />
          </Nav>
        </NavBar>
      </div>
    </>
  );
}

export default Navbar;
