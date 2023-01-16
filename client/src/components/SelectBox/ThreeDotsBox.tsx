import React, { useState } from "react";
import tw from "tailwind-styled-components";
import {
  BsThreeDots,
  BsFillFileEarmarkFill,
  BsFillTrashFill,
} from "react-icons/bs";
// import { useRouter } from "next/router";
import { CommentType } from "../../type/blogType";
import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";

const SelectBox = tw.div`bg-gray-300 p-4 absolute rounded-xl z-10`;

export default function ThreeDotsBox({
  children,
  item,
}: {
  children: React.ReactNode;
  item: CommentType;
}) {
  const [onClick, setOnClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentData, setCommentData] = useState("");
  const { id } = item || {};
  // const router = useRouter();

  // 도트 3개 클릭 시 div 보임
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ButValue = Number(e.currentTarget.value);
    setOnClick(!onClick);
    if (id === ButValue) {
      setCommentData(item.content);
    }
    console.log(`id`, id);
  };

  // 수정 클릭시 모달 창
  const onClickEdit = () => {
    // if (children === "블로그") {
    //   router.push("/blogedit");
    // }
    if (children === "댓글") {
      setShowModal(!showModal);
    }
  };

  // 삭제 클릭시 모달창
  const onClickDelete = () => {
    if (children === "댓글") {
      setDeleteModal(!deleteModal);
    }
  };

  console.log(`같은것만`, commentData);
  return (
    <div className="">
      {showModal === false ? null : (
        <EditModal content={commentData} id={id}>
          {children}
        </EditModal>
      )}
      {deleteModal === false ? null : (
        <DeleteModal
          setOpenModal={setDeleteModal}
          msg="댓글을 삭제하시겠습니까?"
          id={id}
        >
          {children}
        </DeleteModal>
      )}
      <button onClick={onClickHandler} value={id}>
        <BsThreeDots className="cursor-pointer" size={25} color="#d6d6d6" />
      </button>
      {onClick && (
        <SelectBox>
          <button className="flex text-center" onClick={onClickEdit} value={id}>
            {children} 수정
            <BsFillFileEarmarkFill className="mt-1 ml-10" />
          </button>
          <hr className="my-2" />
          <button
            className="flex text-center"
            onClick={onClickDelete}
            value={id}
          >
            {children} 삭제
            <BsFillTrashFill className="mt-1 ml-10" />
          </button>
        </SelectBox>
      )}
    </div>
  );
}
