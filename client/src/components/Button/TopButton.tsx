import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const TButton = tw.button`
p-3 border border-white rounded-full cursor-pointer text-MainColor bg-white/70 shadow-[0_2px_4px_rgba(0,0,0,0.3)] 
hover:bg-MainColor/10 hover:border-none hover:shadow-none
`;

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const topButtonHandler = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", topButtonHandler);
    return () => {
      window.removeEventListener("scroll", topButtonHandler);
    };
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {showButton && (
        <TButton id="top" onClick={scrollToTop} type="button">
          <BsArrowUp className="text-2xl" />
        </TButton>
      )}
    </div>
  );
}
