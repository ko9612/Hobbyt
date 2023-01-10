import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";

const arr = [
  {
    userprofile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    username: "페레로",
    and: "님이",
    title: "심플 피어싱 제작기",
    progress: "블로그에 댓글을 등록했습니다.",
  },
  {
    userprofile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    username: "안지은",
    and: "님으로부터",
    title: "자체제작 무속성 20cm 솜인형",
    progress: "작품에 대한 주문이 접수되었습니다.",
  },
  {
    userprofile: <DefaultProfileImg width={50} height={50} borderW={0} />,
    username: "고하나",
    and: "님이",
    title: "내가 원하는 탑꾸 만들기",
    progress: "블로그를 좋아합니다.",
  },
];

export default function NoticeList() {
  const noticeArr = arr;
  return (
    <>
      {noticeArr.map((notice, idx) => (
        <div
          key={idx}
          className="flex items-center p-8 mb-5 rounded-lg bg-slate-100"
        >
          <p className="mr-5">{notice.userprofile}</p>
          <p className="font-semibold text-MainColor">{notice.username}</p>
          <p className="mr-2">{notice.and}</p>
          <p className="mr-2 font-semibold text-MainColor">{notice.title}</p>
          <p>{notice.progress}</p>
        </div>
      ))}
    </>
  );
}
