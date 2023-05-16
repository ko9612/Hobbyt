// 비밀번호 변경 링크 클릭 시, 리다이렉트될 화면
import { Content, InputDiv, LeftContent, Main } from "./signin";
import Logo from "../src/components/Page/Sign/SignLogo";
import PatchForgotPassword from "../src/components/Page/Sign/PatchForgotPassword";

export default function resetPassword() {

  return (
  <Main>
    <Content className="flex-col items-center">
        <LeftContent className=" sm:w-[30rem]">
        <Logo/>
        <InputDiv className="text-center">
            <PatchForgotPassword/>
        </InputDiv>
        </LeftContent>
    </Content>
  </Main>
  );
}
