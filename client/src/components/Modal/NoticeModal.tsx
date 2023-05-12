// import { useRecoilState } from "recoil";
// import { NoticeState } from "../../state/Socket";

export default function NoticeModal({ data }: any) {
  //   const [notice, setNotice] = useRecoilState(NoticeState);

  console.log("노티스 모달", data);
  return (
    <div className={`absolute z-100 ${data.title ? `bg-MainColor` : ``}`}>
      <p>{data?.title}</p>
    </div>
  );
}
