import tw from "tailwind-styled-components";

export interface InputProps {
  type: string;
  id: string;
  maxLength: number;
}

const Input = tw.input`
w-full px-2 py-1 text-gray-700 border <border-slate-3></border-slate-3>00
bg-slate-100 rounded-lg focus:outline-none
`;

export default function DefaultInput({ type, id, maxLength }: InputProps) {
  return <Input type={type} id={id} maxLength={maxLength} />;
}
