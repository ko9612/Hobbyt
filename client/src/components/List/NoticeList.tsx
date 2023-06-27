import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { getNotice } from "../../api/websocketApi";
import ScrollRoader from "../Scroll/ScrollRoader";

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

export default function NoticeList() {
  const router = useRouter();
  const [noticeData, setNoticeData] = useState<NoticeListType[]>([]);
  const [isLoding, setIsLoding] = useState(false);

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

  const noticeClick = (notice: NoticeType) => {
    if (notice.type === "POST_COMMENT") {
      router.replace(`/blog/${notice.receiverId}/post/${notice.redirectId}`);
    }
    if (notice.type === "SALE_ORDER") {
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

  const noticeTypeText = (type: string) => {
    if (type === "POST_COMMENT") {
      return <p>에 댓글을 남겼습니다.</p>;
    }
    if (type === "SALE_ORDER") {
      return <p>상품을 주문하였습니다.</p>;
    }
    if (type === "ORDER_CANCEL") {
      return <p>상품에 주문을 취소하였습니다.</p>;
    }
    return null;
  };

  return (
    <div>
      {isLoding ? (
        <div>Loding...</div>
      ) : (
        <div>
          {noticeData[0] &&
            noticeData.map((item: NoticeListType, idx: number) => (
              <div key={idx}>
                {item.alarms &&
                  item.alarms.map((notice: NoticeType) => (
                    <div key={notice.notificationId}>
                      <button
                        onClick={() => noticeClick(notice)}
                        aria-label="버튼"
                        className="w-full"
                      >
                        <div className="flex items-center justify-center w-full px-4 py-6 mb-5 text-xs bg-gray-100 rounded-lg sm:text-sm sm:p-8 sm:inline-flex md:text-base">
                          <p
                            className={`flex mr-1 font-semibold truncate text-MainColor ${
                              notice.sender.length > 6 ? "w-16" : ""
                            }`}
                          >
                            {notice.sender}
                          </p>
                          <p className="mr-2">님이</p>
                          <span
                            className={`mr-1 font-semibold text-left text-MainColor  ${
                              notice.title.length > 8
                                ? "w-24 truncate sm:w-28 md:w-auto"
                                : ""
                            }`}
                          >
                            {notice.title}
                          </span>
                          {noticeTypeText(notice.type)}
                        </div>
                      </button>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
      <div ref={ref} className="flex justify-center p-8">
        {isLoading && <ScrollRoader />}
      </div>
    </div>
  );
}
