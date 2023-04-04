import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { getNotice, patchNotice } from "../../api/noticeApi";
import ScrollRoader from "../Scroll/ScrollRoader";
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

interface NoticeListType {
  hasNext: boolean;
  alarms: NoticeType[];
}

interface NoticeType {
  createdAt: string;
  notificationId: number;
  receiverId: number;
  redirectId: number;
  sender: string;
  title: string;
  type: string;
}

// export default function NoticeList(props) {
export default function NoticeList() {
  // NoticeData();
  const router = useRouter();

  // const { noticeData } = props || {};
  const [noticeData, setNoticeData] = useState<NoticeListType[]>([]);
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

  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음 이후 : 알림 리스트 api 요청
  const moreGetData = async () => {
    const res = await getNotice(offset, limit);
    const moreListRes = (res as any).data;
    setNoticeData([...noticeData, moreListRes]);
    setHasNext(moreListRes.hasNext);
    setOffset(offset + limit);
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      // 처음 : 알림 리스트 api 요청
      const getData = async () => {
        setIsLoding(true);
        const res = await getNotice(0, limit);
        const listRes = (res as any).data;
        setNoticeData([listRes]);
        setOffset(limit);
        setHasNext(listRes.hasNext);
        setIsLoding(false);
      };
      getData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {
        moreGetData();
      }, 1000);
    }
  }, [inview]);

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

  console.log("알림", noticeData);

  return (
    <div>
      {isLoding ? (
        <div>Loding...</div>
      ) : (
        <div>
          {noticeData[0] &&
            noticeData.map((item: any) => (
              <div key={item.id}>
                {item.alarms &&
                  item.alarms.map((notice: NoticeType) => (
                    <div key={notice.notificationId}>
                      <button
                        onClick={() => noticeClick(notice)}
                        aria-label="버튼"
                        className="w-full"
                      >
                        <div className="flex items-center p-8 mb-5 bg-gray-100 rounded-lg">
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
                      </button>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
      <div ref={ref} className="flex justify-center p-8 border-4 border-black">
        {isLoading && <ScrollRoader />}
      </div>
    </div>
  );
}

// <Link
//   href={
//     notice.type === "POST_COMMENT"
//       ? `/blog/${notice.receiverId}/post/${notice.redirectId}`
//       : `/blog/${notice.receiverId}/sale/${notice.redirectId}`
//   }
//   key={notice.notificationId}
// >

// export async function getServerSideProps() {
//   const res = await getNotice();
//   console.log("불러와짐?", res);
//   return {
//     props: {
//       noticeData: res.data.alarms,
//     },
//   };
// }
