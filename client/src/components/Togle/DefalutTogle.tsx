import { useState } from "react";
import tw from "tailwind-styled-components";

interface DefaultProps {
  children: string;
}

export default function DefalutTogle(props: DefaultProps) {
  const TogleContainer = tw.div`
    relative cursor-pointer
    `;

  const [isOn, setIsOn] = useState(false);
  const { children } = props;

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex ml-auto">
      <p className="mr-3">{children}</p>
      <TogleContainer onClick={toggleHandler}>
        <div className={`togle-container ${isOn ? "togle-checked" : ""}`} />
        <div className={`togle-circle ${isOn ? "togle-circle-checked" : ""}`} />
      </TogleContainer>
    </div>
  );
}
