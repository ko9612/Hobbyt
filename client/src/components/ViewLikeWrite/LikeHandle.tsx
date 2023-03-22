import {
  // AioutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

interface IHover {
  isHover: boolean;
}

// export default function LikeHandle({ isHover }: IHover) {
export default function LikeHandle() {
  return (
    <AiFillHeart
      color="red"
      size={30}
      className="absolute inline-flex opacity-75"
    />
  );
}
