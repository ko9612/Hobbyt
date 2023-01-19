import tw from "tailwind-styled-components";
import MobileNav, { Nav } from "./MobileNav";
import NavContent from "./NavContent";
// import dynamic from "next/dynamic";

// const DynamicNavContent = dynamic(() => import("./NavContent"), {
//   ssr: false,
// });

export const NavBar = tw.div`
  flex
`;

function Navbar() {
  return (
    <>
      <MobileNav />
      <div className="hidden lg:block">
        <NavBar>
          <Nav>
            {/* <DynamicNavContent/> */}
            <NavContent />
          </Nav>
        </NavBar>
      </div>
    </>
  );
}

export default Navbar;
