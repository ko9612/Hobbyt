export default function NoticeModal({ data }: any) {
  return (
    <div className={`absolute z-100 ${data.title ? `bg-MainColor` : ``}`}>
      <p>{data?.title}</p>
    </div>
  );
}
