import tw from "tailwind-styled-components";
import { useState } from "react";
import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Nav/NavBar";

// Modal Test
import MsgModal from "../src/components/Modal/MsgModal";
import DelModal from "../src/components/Modal/DelModal";
import UnFollowModal from "../src/components/Modal/UnFollowModal";
//

const Content = tw.main`
  max-w-[62rem] mx-auto pt-[3.75rem] sm:ml-72 h-full
`;

export default function Test() {
  // Modal Test
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const delAccount = ["정말로 떠나시는 건가요?", "다시 한 번 생각해주세요 😢"];
  //
  // const selBlog = [
  //   "정말로 삭제하시겠습니까?",
  //   "삭제된 게시글은 되돌릴 수 없습니다.",
  // ];

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
            subMsg={delAccount}
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
        {showFollowModal && <UnFollowModal setOpenModal={setShowFollowModal} />}
        <button
          onClick={() => setShowFollowModal(!showFollowModal)}
          className="text-3xl font-bold text-blue-500"
        >
          언팔 모달
        </button>
        {/* Modal test */}
        <Footer />
      </Content>
    </>
  );
}
