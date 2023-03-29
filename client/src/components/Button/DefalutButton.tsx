import tw from "tailwind-styled-components";
import { DefaultProps } from "./SubmitButton";

export const DButton = tw.button`
p-3 px-4 bg-MainColor rounded-lg text-white duration-100 hover:bg-SubColor 
focus:bg-SubColor focus:ring focus:ring-MainColor/40 whitespace-nowrap
disabled:bg-gray-400
`;

export function DefalutButton({ children, id, onClick }: DefaultProps) {
  return (
    <DButton type="button" id={id} onClick={onClick}>
      {children}
    </DButton>
  );
}
