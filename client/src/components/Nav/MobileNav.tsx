import tw from "tailwind-styled-components";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import logoText from "../../image/logoText.png";
import Navbar from "./PcNav";

const Header = tw.header`
flex items-center justify-center px-4 pt-4 pb-2 sm:hidden text-MainColor z-10 sticky h-16
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

export default function BurgerNav() {
  const [menu, setMenu] = useState(false);
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
        <button className="px-1" onClick={onBurgerClicked}>
          <BurgerLine className={menu ? "rotate-45 translate-y-2" : ""} />
          <BurgerLine className={menu ? "opacity-0 " : ""} />
          <BurgerLine className={menu ? "-rotate-45 -translate-y-2" : ""} />
        </button>
      </Button>
      <Image
        src={logoText}
        alt="Home"
        role="button"
        width={120}
        onClick={handleHomeClick}
      />
      {menu ? (
        <>
          <div
            role="presentation"
            onClick={onBurgerClicked}
            className="fixed bottom-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm"
          />
          <NavOpen>
            <Navbar />
          </NavOpen>
        </>
      ) : null}
    </Header>
  );
}
