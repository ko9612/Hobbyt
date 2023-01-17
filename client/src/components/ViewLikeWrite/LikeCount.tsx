import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";

interface ILike {
  children: number | string | undefined;
}

export default function LikeCount({ children }: ILike) {
  const LComponent = tw.div`flex items-center`;

  return (
    <LComponent>
      <BsHeart />
      <p className="px-1">{children}</p>
    </LComponent>
  );
}
