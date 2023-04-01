import tw from "tailwind-styled-components";
import { ButtonProps } from "./InfoEditButton";

const ModalB = tw.button`
w-full px-4 py-3 text-white duration-100 bg-MainColor hover:bg-SubColor
 focus:bg-SubColor`;

export default function ModalButton({ children, onClick }: ButtonProps) {
  return (
    <ModalB
      className={`${
        ((children === "아니오" || children === "취소") &&
          "bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 text-black") ||
        ((children === "삭제" || children === "탈퇴") &&
          " bg-red-500 hover:bg-red-600 focus:bg-red-600")
      }`}
      onClick={onClick}
    >
      {children}
    </ModalB>
  );
}
