import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import React from "react";
import client from "./stomp";
import { LoginState, UserIdState } from "../../state/UserState";

export default function StompAlarmSubscibe() {
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
        const alarmList = document.querySelectorAll(".alarm-list");

        if (alarms && datas) {
          if (datas.type === "POST_COMMENT") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title}에 댓글을 남겼습니다.`;
            alarm.addEventListener("click", (e: any) => {
              const { id } = e.currentTarget;
              const clickList = document.getElementById(`${id}`);
              clickList?.parentNode?.removeChild(clickList);
              router.push(`/blog/${datas.receiverId}/post/${datas.redirectId}`);
            });
          } else if (datas.type === "ORDER_CANCEL") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 취소하였습니다.`;
            alarm.addEventListener("click", (e: any) => {
              const { id } = e.currentTarget;
              const clickList = document.getElementById(`${id}`);
              clickList?.parentNode?.removeChild(clickList);
              router.push(
                `/mypage/${datas.receiverId}/orderdetail/${datas.receiverId}/ordermanagement/${datas.redirectId}`,
              );
            });
          } else if (datas.type === "SALE_ORDER") {
            alarm.innerText = `${datas.sender} 님께서 ${datas.title} 주문을 했습니다.`;
            alarm.addEventListener("click", (e: any) => {
              const { id } = e.currentTarget;
              const clickList = document.getElementById(`${id}`);
              clickList?.parentNode?.removeChild(clickList);
              router.push(
                `/mypage/${datas.receiverId}/orderdetail/${datas.receiverId}/ordermanagement/${datas.redirectId}`,
              );
            });
          }
        }
        alarms?.appendChild(alarm);
        // className이 아니라 class로 적어야 됨...
        alarm.setAttribute("class", "alarm-list");
        console.log("alarmList", alarmList.length);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        alarm.setAttribute("id", randomId(1, 10));
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

  const randomId = (min: number, max: number) => {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return `${num}`;
  };

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
