import {
  // AioutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

interface IHover {
  isHover: boolean;
}

export default function LikeHandle({ isHover }: IHover) {
  if (isHover === true) {
    return (
      <AiFillHeart
        color="red"
        size={30}
        className="absolute inline-flex opacity-75 animate-ping"
      />
    );
  }
  return null;
}
