import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import {
  BsThreeDots,
  BsFillFileEarmarkFill,
  BsFillTrashFill,
} from "react-icons/bs";
// import { useRouter } from "next/router";
import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
import { CommentType } from "../../type/blogType";
import EditModal from "../Modal/EditModal";
import DelModal from "../Modal/DelModal";
import { deleteBlogComment, deleteBlogContent } from "../../api/blogApi";
import { deleteSaleContent } from "../../api/saleApi";
// import { BlogEditState } from "../../state/BlogPostState";

const SelectBox = tw.div`bg-gray-300 p-4 absolute rounded-xl z-10 whitespace-nowrap`;

export default function ThreeDotsBox({
  children,
  item,
}: {
  children: React.ReactNode;
  item: CommentType;
}) {
  const router = useRouter();
  const [onClick, setOnClick] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentData, setCommentData] = useState("");
  const popRef = useRef<HTMLButtonElement>(null);
  // const [, setBlogEdit] = useRecoilState(BlogEditState);
  // 포스트의 id 이거나 아니면 댓글 id 이거나
  const { id } = item || {};
  // const router = useRouter();

  // 도트 3개 클릭 시 div 보임
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ButValue = Number(e.currentTarget.value);
    setOnClick(!onClick);
    if (id === ButValue) {
      setCommentData(item.content);
    }
  };

  // 모달 밖 클릭 시, 닫히는 함수
  const closeHandler = ({ target }: any) => {
    if (popRef.current && !popRef.current.contains(target)) {
      setOnClick(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => {
      window.removeEventListener("click", closeHandler);
    };
  }, []);

  // 수정 클릭시 모달 창
  const onClickEdit = () => {
    if (children === "블로그") {
      router.push(`/post/edit/${id}`);
      // setBlogEdit(item);
    } else if (children === "댓글") {
      setEditModal(!editModal);
    } else if (children === "작품") {
      router.push(`/sale/edit/${id}`);
    }
    setOnClick(!onClick);
  };

  // 삭제 클릭시 모달창
  const onClickDelete = () => {
    if (children === "블로그") {
      setDeleteModal(!deleteModal);
      // setBlogEdit(item);
    } else if (children === "댓글") {
      setDeleteModal(!deleteModal);
    } else if (children === "작품") {
      setDeleteModal(!deleteModal);
    }
    setOnClick(!onClick);
  };

  // 삭제하는 api
  const deleteApi = async () => {
    if (children === "블로그") {
      try {
        const deleteBlog = await deleteBlogContent(id);
        router.reload();
        return deleteBlog;
      } catch {
        console.error();
      }
    } else if (children === "댓글") {
      try {
        const deleteComment = await deleteBlogComment(id);
        router.reload();
        return deleteComment;
      } catch {
        return console.error();
      }
    } else if (children === "작품") {
      try {
        const deleteBlog = await deleteSaleContent(id);
        router.reload();
        return deleteBlog;
      } catch {
        console.error();
      }
    }
  };

  // console.log(`수정 아이디`, id);
  // console.log(`수정 컨텐츠`, commentData);

  return (
    <div className="">
      {editModal === false ? null : (
        <EditModal content={commentData} id={id} setEditModal={setEditModal}>
          {children}
        </EditModal>
      )}
      {deleteModal === false ? null : (
        <DelModal
          setOpenModal={setDeleteModal}
          msg="정말 삭제하실 건가요? T.T"
          subMsg={["삭제 후엔 복원이 불가능합니다."]}
          // id={id}
          afterClick={deleteApi}
          buttonString="삭제"
        />
      )}
      <button ref={popRef} onClick={onClickHandler} value={id}>
        <BsThreeDots
          className="cursor-pointer"
          size={25}
          color={router.pathname === "/" ? "#ffffff" : "#d6d6d6"}
        />
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
