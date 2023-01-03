import tw from "tailwind-styled-components";

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
}

const Input = tw.input`
w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400
bg-white border border-slate-300 rounded-lg focus:border-MainColor focus:outline-none focus:ring focus:ring-MainColor/40 duration-200
`;

export default function LoginInput({ type, id, placeholder }: InputProps) {
  return <Input type={type} id={id} placeholder={placeholder} />;
}
