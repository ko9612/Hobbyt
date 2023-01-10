import tw from "tailwind-styled-components";
import { BsPencil } from "react-icons/bs";

interface IDate {
  children: string;
}

export default function WriteDate({ children }: IDate) {
  const WComponent = tw.div`flex items-center`;

  return (
    <WComponent>
      <BsPencil />
      <p className="px-1">{children}</p>
    </WComponent>
  );
}
