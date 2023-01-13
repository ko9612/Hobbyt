import tw from "tailwind-styled-components";
import { DefaultProps } from "./DefalutButton";

export const WideB = tw.button`
w-full px-4 py-2 text-white duration-100 bg-MainColor rounded-lg hover:bg-SubColor
 focus:bg-SubColor focus:ring focus:ring-MainColor/40 h-[4rem] text-xl font-semibold
 disabled:bg-gray-400
`;

export default function SubmitButton({ children, onClick, id }: DefaultProps) {
  return (
    <WideB type="submit" id={id} onClick={onClick}>
      {children}
    </WideB>
  );
}
