import tw from "tailwind-styled-components";
import { BsEye } from "react-icons/bs";

interface IView {
  children: number;
}

export default function ViewCount({ children }: IView) {
  const VComponent = tw.div`flex`;

  return (
    <VComponent>
      <BsEye />
      <p className="px-1">{children}</p>
    </VComponent>
  );
}
