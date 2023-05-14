import tw from "tailwind-styled-components";
import { DefaultProps } from "./SubmitButton";

interface FButtonProps extends DefaultProps {
  value: number;
}

const FButton = tw.button`
 rounded-lg text-white duration-100 whitespace-nowrap
disabled:bg-gray-400 w-[6rem] h-[3rem] m-auto
`;

export default function FollowButton({
  children,
  id,
  onClick,
  value,
}: FButtonProps) {
  return (
    <FButton
      type="button"
      id={id}
      onClick={onClick}
      value={value}
      className={
        id === "팔로잉"
          ? `bg-MainColor focus:bg-SubColor focus:ring focus:ring-MainColor/40 hover:bg-SubColor `
          : `border-2 border-MainColor text-MainColor focus:bg-MainColor/40 focus:ring-MainColor/40 hover:bg-SubColor/30`
      }
    >
      {children}
    </FButton>
  );
}
