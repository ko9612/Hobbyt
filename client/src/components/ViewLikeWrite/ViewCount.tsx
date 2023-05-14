import tw from "tailwind-styled-components";
import { BsEye } from "react-icons/bs";

interface IView {
  children: number | string | undefined;
}

export default function ViewCount({ children }: IView) {
  const VComponent = tw.div`flex items-center`;

  return (
    <VComponent>
      <BsEye />
      <p className="px-1">{children}</p>
    </VComponent>
  );
}
