import { memo } from "react";
import ReactLoading from "react-loading";
import tw from "tailwind-styled-components";

const LoaderWrap = tw.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 35px;
`;

function ScrollLoader() {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="rgb(179 125 209)" />
    </LoaderWrap>
  );
}
export default memo(ScrollLoader);
