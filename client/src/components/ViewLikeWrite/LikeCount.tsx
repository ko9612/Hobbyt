import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";

interface ILike {
  children: number;
}

export default function LikeCount({ children }: ILike) {
  const LComponent = tw.div`flex`;

  return (
    <LComponent>
      <BsHeart />
      <p className="px-1">{children}</p>
    </LComponent>
  );
}
