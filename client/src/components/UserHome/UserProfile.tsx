import { BsCalendar4 } from "react-icons/bs";

export default function UserProfile() {
  return (
    <div className="items-center justify-center block m-auto text-center">
      <h1 className="mb-2 text-3xl font-bold">닉네임여섯자</h1>
      <div className="inline-flex mb-5">
        <BsCalendar4 className="mt-1" />
        <p className="ml-2 text-gray-400">2022년 12월 28일</p>
      </div>
      <p className="mb-7">
        건담을 좋아하는 건담 마니아 주로 무슨 건담을 만들고 있습니다.
      </p>
      <div className="inline-flex mb-7">
        <p className="mr-2">100 팔로잉</p>
        <p>99 팔로우</p>
      </div>
    </div>
  );
}
