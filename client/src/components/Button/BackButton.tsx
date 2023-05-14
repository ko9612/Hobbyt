import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton() {
  const router = useRouter();

  // 뒤로가기 버튼
  const backHandler = () => {
    router.back();
  };

  return (
    <button className="mr-4" onClick={backHandler}>
      <BsArrowLeft size={30} />
    </button>
  );
}
