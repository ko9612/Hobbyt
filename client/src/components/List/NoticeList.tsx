// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getNotice, patchNotice } from "../../api/noticeApi";
// import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";

// function NoticeData() {
//   const [noticeData, setNoticeData] = useState([]);

//   const getData = async () => {
//     const res = await getNotice();
//     setNoticeData(res.data);
//     return console.log(`알림리스트`, res.data);
//   };

//   useEffect(() => {
//     getData();
//   }, [noticeData]);

//   console.log("NoticeList", noticeData);

//   return (
//     <div>
//       {noticeData &&
//         noticeData.alarms.map((notice, idx) => (
//           <div
//             key={idx}
//             className="flex items-center p-8 mb-5 rounded-lg bg-slate-100"
//           >
//             {/* <p className="mr-5">{notice.userprofile}</p> */}
//             <p className="font-semibold text-MainColor">{notice.sender}</p>
//             {/* <p className="mr-2">{notice.and}</p> */}
//             <p className="mr-2 font-semibold text-MainColor">{notice.title}</p>
//             {/* <p>{notice.progress}</p> */}
//           </div>
//         ))}
//     </div>
//   );
// }

// export default function NoticeList(props) {
export default function NoticeList() {
  // NoticeData();
  const router = useRouter();

  // const { noticeData } = props || {};
  const [noticeData, setNoticeData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  // const getData = async () => {
  //   const res = await getNotice();
  //   setNoticeData(res.data);
  //   return console.log(`알림리스트`, res.data);
  // };

  // useEffect(() => {
  //   if (router.isReady) {
  //     getData();
  //   }
  // }, [router.isReady]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      setIsLoding(true);
      const res = await getNotice();
      setNoticeData(res.data.alarms);
      setIsLoding(false);
    };
    getData();
    // return console.log(`알림리스트`, res.data);
  }, [noticeData.length]);

  console.log("NoticeList", noticeData);

  // 알림 리스트 클릭시 호출하는 알림 체크 api
  // const handleClick = async() => {
  //  const res = await patchNotice(1);

  // }

  const noticeClick = (notice: any) => {
    if (notice.type === "POST_COMMENT") {
      router.replace(`/blog/${notice.receiverId}/post/${notice.redirectId}`);
    }
    if (notice.type === "SALE_ORDER") {
      // router.replace(`/blog/${notice.receiverId}/sale/${notice.redirectId}`);
      router.replace(
        `/mypage/${notice.receiverId}/orderdetail/${notice.receiverId}/ordermanagement/${notice.redirectId}`,
      );
    }
    if (notice.type === "ORDER_CANCEL") {
      router.replace(
        `/mypage/${notice.receiverId}/orderdetail/${notice.receiverId}/ordermanagement/${notice.redirectId}`,
      );
    }
  };

  return (
    <div>
      {isLoding ? (
        <div>Loding...</div>
      ) : (
        <div>
          {noticeData &&
            noticeData.map((notice: any) => (
              // <Link
              //   href={
              //     notice.type === "POST_COMMENT"
              //       ? `/blog/${notice.receiverId}/post/${notice.redirectId}`
              //       : `/blog/${notice.receiverId}/sale/${notice.redirectId}`
              //   }
              //   key={notice.notificationId}
              // >
              <div
                key={notice.notificationId}
                onClick={() => noticeClick(notice)}
              >
                <div className="flex items-center p-8 mb-5 rounded-lg bg-slate-100">
                  {/* <p className="mr-5">{notice.userprofile}</p> */}
                  <p className="pr-2 font-semibold text-MainColor">
                    {notice.sender}
                  </p>
                  <p className="pr-2">님이</p>
                  <p className="mr-2 font-semibold text-MainColor">
                    {notice.title}
                  </p>
                  <p>
                    {notice.type === "POST_COMMENT"
                      ? "블로그에 댓글을 남겼습니다"
                      : null}
                    {notice.type === "SALE_ORDER"
                      ? "상품에 주문이 들어왔습니다"
                      : null}
                    {notice.type === "ORDER_CANCEL"
                      ? "상품에 주문이 취소되었습니다"
                      : null}
                  </p>
                </div>
              </div>
              // </Link>
            ))}
        </div>
      )}
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await getNotice();
//   console.log("불러와짐?", res);
//   return {
//     props: {
//       noticeData: res.data.alarms,
//     },
//   };
// }
