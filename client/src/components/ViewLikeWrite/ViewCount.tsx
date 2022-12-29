import tw from "tailwind-styled-components";
import { BsEye } from "react-icons/bs";

export default function ViewCount() {
  const VComponent = tw.div`flex`;

  return (
    <VComponent>
      <BsEye />
      <p className="px-1">0</p>
    </VComponent>
  );
}
