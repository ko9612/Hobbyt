import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import { PublicState } from "../../state/BlogPostState";

interface DefaultProps {
  children: string;
}

const TogleContainer = tw.div`relative cursor-pointer`;

// export default function DefalutTogle(props: DefaultProps) {
export default function DefalutTogle({ children }: DefaultProps) {
  const [isOn, setIsOn] = useRecoilState(PublicState);
  // const { children } = props;

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
