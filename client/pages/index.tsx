import tw from "tailwind-styled-components";
import { useState } from "react";
import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Nav/NavBar";
import MsgModal from "../src/components/Modal/MsgModal";
import DelModal from "../src/components/Modal/DelModal";

const Content = tw.main`
  max-w-[62rem] mx-auto pt-[3.75rem] sm:ml-72 h-full
`;

export default function Home() {
  // Modal Test
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  return (
    <>
      <Navbar />
      <Content>
        {/* Modal test */}
        {showModal && (
          <MsgModal msg="메세지 내용입니다" setOpenModal={setShowModal} />
        )}
        <button
          onClick={() => setShowModal(!showModal)}
          className="text-3xl font-bold"
        >
          메세지 모달
        </button>
        {showDelModal && (
          <DelModal
            msg="Hobbyt 회원을 정말 탈퇴하시겠습니까?"
            subMsg="정말로 떠나시는 건가요?
            다시 한 번만 생각해주세요😢"
            buttonString="탈퇴"
            setOpenModal={setShowDelModal}
          />
        )}
        <button
          onClick={() => setShowDelModal(!showDelModal)}
          className="text-3xl font-bold text-red-600"
        >
          삭제/탈퇴 모달
        </button>
        {/* Modal test */}
        <Footer />
      </Content>
    </>
  );
}
