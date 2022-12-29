import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";

export default function LikeCount() {
  const LComponent = tw.div`flex`;

  return (
    <LComponent>
      <BsHeart />
      <p className="px-1">0</p>
    </LComponent>
  );
}
