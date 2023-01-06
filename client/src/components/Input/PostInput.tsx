import tw from "tailwind-styled-components";
import { LoginInputProps } from "./LoginInput";

const Input = tw.input`
w-full p-2 my-2 border-2 rounded-lg border-slate-200
`;

export default function PostInput({
  type,
  id,
  placeholder,
  maxLength,
}: LoginInputProps) {
  return (
    <Input
      type={type}
      id={id}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
