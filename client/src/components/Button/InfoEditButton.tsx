import tw from "tailwind-styled-components";
import { ButtonProps } from "./DefalutButton";

const DButton = tw.button`
p-2 px-5 bg-slate-500 text-white rounded-lg duration-100 hover:bg-slate-600
focus:bg-slate-600
`;

export default function InfoEditButton({ children, onClick }: ButtonProps) {
  return <DButton onClick={onClick}>{children}</DButton>;
}
