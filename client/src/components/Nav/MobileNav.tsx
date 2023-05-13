import tw from "tailwind-styled-components";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import logoText from "../../image/logoText.png";
import NavContent from "./NavContent";

const Header = tw.div`
flex items-center justify-center px-4 pt-4 pb-2 lg:hidden z-10 sticky top-0 h-16 bg-white
`;
const Button = tw.span`
rounded-full p-2 flex hover:bg-MainColor/10 absolute left-2
`;
const BurgerLine = tw.div`
h-1 w-6 my-1 rounded-full bg-MainColor transition ease transform duration-300
`;
const NavOpen = tw.div`
absolute top-0 bottom-0 left-0
`;

export const Nav = tw.div`
bg-MainColor h-full p-5 fixed z-10 overflow-y-auto scrollbar w-[18rem] max-[340px]:w-[12rem] top-0 
`;

export default function MobileNav() {
  const [menu, setMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const onBurgerClicked = () => {
    setMenu(!menu);
  };

  return (
    <Header>
      <Button>
        <button
          aria-label="menu"
          type="button"
          className="px-1"
          onClick={onBurgerClicked}
        >
          <BurgerLine className={`${menu && "rotate-45 translate-y-2"}`} />
          <BurgerLine className={`${menu && "opacity-0 "}`} />
          <BurgerLine className={`${menu && "-rotate-45 -translate-y-2"}`} />
        </button>
      </Button>
      <div className="w-40">
        <Image
          src={logoText}
          alt="Home"
          role="button"
          onClick={handleHomeClick}
        />
      </div>
      <NavOpen>
        <Nav
          className={`transitions duration-300 ${
            menu ? "left-0" : "left-[-72rem]"
          }`}
        >
          <NavContent />
        </Nav>
      </NavOpen>
      {menu ? (
        <div
          role="presentation"
          onClick={onBurgerClicked}
          className="fixed bottom-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm"
        />
      ) : null}
    </Header>
  );
}
