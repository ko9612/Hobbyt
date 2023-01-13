import tw from "tailwind-styled-components";

export interface DefaultProps {
  children: string | JSX.Element;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const DButton = tw.button`
p-2 px-5 bg-MainColor rounded-lg text-white duration-100 hover:bg-SubColor 
focus:bg-SubColor focus:ring focus:ring-MainColor/40 whitespace-nowrap
disabled:bg-gray-400
`;

export default function DefalutButton({ children, id, onClick }: DefaultProps) {
  return (
    <DButton type="button" id={id} onClick={onClick}>
      {children}
    </DButton>
  );
}
