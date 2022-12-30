import tw from "tailwind-styled-components";

interface DefaultProps {
  children: string;
}

export default function DefalutButton(props: DefaultProps) {
  const DButton = tw.button`
    p-2 px-5 bg-MainColor rounded-lg text-white
    `;

  const { children } = props;

  return <DButton>{children}</DButton>;
}
