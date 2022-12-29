import tw from "tailwind-styled-components";
import { BsPencil } from "react-icons/bs";

export default function WriteDate() {
  const WComponent = tw.div`flex`;

  return (
    <WComponent>
      <BsPencil />
      <p className="px-1">2022.12.29</p>
    </WComponent>
  );
}
