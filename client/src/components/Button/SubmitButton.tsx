import tw from "tailwind-styled-components";
import { DefaultProps } from "./DefalutButton";

export const WideB = tw.button`
w-full px-4 py-2 text-white duration-100 bg-MainColor rounded-lg hover:bg-SubColor focus:bg-SubColor focus:ring focus:ring-MainColor/40
`;

export default function WideButton({ children, onClick }: DefaultProps) {
  return (
    <WideB
      className={`${children === "내 정보 저장하기"} && h-[4rem]`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </WideB>
  );
}