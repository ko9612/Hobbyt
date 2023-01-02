import tw from "tailwind-styled-components";

interface WideProps {
  children: string;
}

const WideB = tw.button`
w-full px-4 py-2 text-white duration-100 bg-MainColor rounded-lg hover:bg-SubColor focus:bg-SubColor focus:ring focus:ring-MainColor/40
  `;

export default function WideButton(props: WideProps) {
  const { children } = props;

  return <WideB>{children}</WideB>;
}
