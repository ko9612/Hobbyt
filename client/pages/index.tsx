import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import Footer from "../src/components/Footer/Footer";
import BestBlog from "../src/components/List/BestList/BestBlog";
import BestBlogger from "../src/components/List/BestList/BestBlogger";
import BestProduct from "../src/components/List/BestList/BestProduct";
import Navbar from "../src/components/Nav/NavBar";
import { LoginState, UserIdState } from "../src/state/UserState";
import client from "../src/components/Websoket/stomp";

export const Main = tw.main`lg:ml-[18rem] px-6`;
export const MainSection = tw.section`max-w-[62rem]`;
export const MainContent = tw.div`max-w-[50rem] m-auto`;

export default function Home() {
  const router = useRouter();
  const isLogin = useRecoilValue(LoginState);
  const userId = useRecoilValue(UserIdState);

  if (isLogin) {
    client.onConnect = () => {
      client.subscribe("/message", message => {
        const datas = JSON.parse(message.body);
        console.log("message", datas);
      });
      client.subscribe(`/alarm/${userId}`, message => {
        const datas = JSON.parse(message.body);
        console.log("alarm", JSON.parse(message.body));
        console.log("alarm2", datas);
        const alarms = document.querySelector("#alarm");
        const alarm = document.createElement("li");

        if (alarms && datas) {
          if (datas.type === "POST_COMMENT") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title}에 댓글을 남겼습니다.`;
            alarms.addEventListener("click", () => {
              router.push(`/blog/${datas.receiverId}/post/${datas.redirectId}`);
            });
          }
          if (datas.type === "ORDER_CANCEL") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 취소하였습니다.`;
            alarms.addEventListener("click", () => {
              router.push(
                `/mypage/${datas.receiverId}/orderdetail/${datas.receiverId}/ordermanagement/${datas.redirectId}`,
              );
            });
          }
          if (datas.type === "SALE_ORDER") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 했습니다.`;
            alarms.addEventListener("click", () => {
              router.push(
                `/mypage/${datas.receiverId}/orderdetail/${datas.receiverId}/ordermanagement/${datas.redirectId}`,
              );
            });
          }
        }
        alarms?.appendChild(alarm);
        // className이 아니라 class로 적어야 됨...
        alarm.setAttribute("class", "alarm-list");
      });
    };

    // 연결 실패했을 때 실행할 함수
    client.onStompError = frame => {
      console.log(`========> Broker reported error`, frame.headers.message);
      console.log(`========> Additional details:${frame.body}`);
    };

    // 클라이언트 활성화
    client.activate();
  }

  return (
    <>
      <Navbar />
      <Main>
        <MainSection>
          <div
            id="alarm"
            className="p-2 list-none max-w-[24rem] cursor-pointer"
          />
          <MainContent>
            <BestBlog />
            <BestBlogger />
            <BestProduct />
          </MainContent>
        </MainSection>
      </Main>
      <Footer />
    </>
  );
}
