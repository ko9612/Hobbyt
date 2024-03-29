import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  BsPencilSquare,
  BsLink45Deg,
  BsCalendar4,
  BsTruck,
  BsExclamationTriangleFill,
} from "react-icons/bs";
import { useRouter } from "next/router";

import { PdContent } from "./ProductContent";
import { SaleDetailProps } from "../../../type/saleType";
import { SaleDetailState } from "../../../state/SaleState";
import DelModal from "../../Modal/DelModal";
import { deleteSaleContent, postSaleLike } from "../../../api/saleApi";
import LikeHandle from "../../ViewLikeWrite/LikeHandle";
import LikeHover from "../../ViewLikeWrite/LikeHover";
import { UserIdState } from "../../../state/UserState";
import MsgModal from "../../Modal/MsgModal";

const PdGuideSeaction = tw.section`w-full`;
const ListTitle = tw.div`flex items-center`;
const TitleText = tw.div`pl-2`;

interface IdProps {
  id: number;
}

export default function ProductGuide({ id }: IdProps) {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [initalUserId] = useRecoilState(UserIdState);
  const [userId, setUserId] = useState(0);
  const [SaleData] = useRecoilState<SaleDetailProps>(SaleDetailState);
  const [deleteModal, setDeleteModal] = useState(false);

  // userId 가져오는 함수
  const getUserId = () => {
    if (typeof window !== "undefined") {
      if (initalUserId) {
        setUserId(initalUserId);
      }
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  // like api 요청
  const SaleLike = async () => {
    const LikeData = await postSaleLike(id);
    router.reload();
  };

  const onClickLike = () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("authorization")) {
        setShowMsgModal(true);
      } else {
        SaleLike();
      }
    }
  };

  // 판매글 삭제 후, 임시로 내 블로그 주소로 가게 해뒀음
  const deleteSale = async () => {
    const deleteSalepost = await deleteSaleContent(id);
    if ((deleteSalepost as any).status === 204) {
      router.replace(`/blog/${userId}`);
    } else {
      if ((deleteSalepost as any).status === 404) {
        setErrMsg("존재하지 않는 게시글입니다.");
      } else {
        setErrMsg("Server Error");
      }
      setDeleteModal(false);
      setShowModal(true);
    }
  };

  return (
    <>
      {deleteModal && (
        <DelModal
          setOpenModal={setDeleteModal}
          msg="정말 삭제하실 건가요? T.T"
          subMsg={["삭제 후엔 복원이 불가능합니다."]}
          afterClick={deleteSale}
          buttonString="삭제"
        />
      )}
      {showMsgModal && (
        <DelModal
          setOpenModal={setShowMsgModal}
          msg="로그인 후 이용 가능합니다."
          subMsg={["로그인 페이지로 이동하시겠습니까?"]}
          buttonString="페이지 이동"
          afterClick={() => {
            router.push("/signin");
          }}
        />
      )}
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      <PdGuideSeaction>
        <PdContent>
          <ListTitle className="font-semibold">
            <BsPencilSquare size="1.25rem" />
            <TitleText>환불/교환 안내</TitleText>
          </ListTitle>
          <div className="py-4 break-words">
            {SaleData.refundExchangePolicy}
          </div>
          <div className="flex flex-col items-center pt-4">
            <button onClick={onClickLike}>
              {SaleData.isLiked ? <LikeHandle /> : <LikeHover />}
            </button>
            {SaleData.likeCount}
          </div>
          {SaleData.writer.id === userId && (
            <div className="text-end">
              <button
                className="hover:text-gray-500 focus:text-gray-500"
                onClick={() => router.push(`/blog/${userId}/sale/edit/${id}`)}
              >
                수정
              </button>
              &nbsp;|&nbsp;
              <button
                className="hover:text-gray-500 focus:text-gray-500"
                onClick={() => setDeleteModal(true)}
              >
                삭제
              </button>
            </div>
          )}
        </PdContent>
        <PdContent>
          <ListTitle className="font-semibold">
            <BsLink45Deg size="1.25rem" />
            <p className="pl-2">제작과정 확인하기</p>
            {SaleData.productionProcessLink && (
              <button className="pl-2 font-medium text-MainColor hover:text-SubColor focus:text-SubColor">
                <a
                  target="_blank"
                  href={SaleData.productionProcessLink}
                  rel="noreferrer"
                >
                  Click
                </a>
              </button>
            )}
          </ListTitle>
        </PdContent>
        <PdContent className="text-sm border-none sm:text-base">
          <ListTitle>
            <BsCalendar4 size="1.25rem" />
            {!SaleData.isAlwaysOnSale ? (
              <TitleText>
                <span>{SaleData.period.startedAt} </span>~
                <span> {SaleData.period.endAt}</span>
              </TitleText>
            ) : (
              <TitleText>상시판매</TitleText>
            )}
            <TitleText />
          </ListTitle>
          <ListTitle className="py-1 ">
            <BsExclamationTriangleFill size="1.25rem" />
            <TitleText>{SaleData.caution}</TitleText>
          </ListTitle>
          <ListTitle>
            <BsTruck size="1.25rem" />
            <TitleText>
              평균{" "}
              <span className="font-semibold">
                {SaleData.delivery.deliveryTime}
              </span>
              일 소요
            </TitleText>
          </ListTitle>
        </PdContent>
      </PdGuideSeaction>
    </>
  );
}
