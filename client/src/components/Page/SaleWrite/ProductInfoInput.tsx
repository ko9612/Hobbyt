import { useState } from "react";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import { MdRemoveCircle } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
  SubLabel,
  InfoContent,
  ImgBox,
} from "./PostWriteStyle";
import { DButton } from "../../Button/DefalutButton";
import { ProductList } from "../../../type/saleType";
import { SaleProductList } from "../../../state/SaleState";
// 이미지 처리 전, 제품 정보의 default img 필요해서
import exampleImg from "../../../image/pictureDefalut.svg";
import { postImageUpload } from "../../../api/blogApi";
import MsgModal from "../../Modal/MsgModal";
import { imageErrorHandler } from "../../../util/ErrorHandler";

export default function ProductInfoInput() {
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // 제품 정보 Input
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [stockQuantity, setStockQuantity] = useState<
    number | undefined | string
  >();
  const [price, setPrice] = useState<number | undefined | string>();

  // 제품 정보 리스트
  const [products, setProducts] =
    useRecoilState<ProductList[]>(SaleProductList);

  // 제품 정보 이미지 리스트(미리보기)
  const [pdImgList, setPdImgList] = useState<any>([]);

  // 제품정보 이미지 업로드 핸들러
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageData = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageData);
      const data = await postImageUpload(formData);

      if ((data as any).status === 200) {
        setImage((data as any).data);
      } else {
        imageErrorHandler({
          data,
          inputName: "itemImg",
          setErrMsg,
          setShowMsgModal,
        });
      }
    }
  };

  // 제품정보 추가 버튼 핸들러
  const handleProductAdd = () => {
    setProducts([...products, { name, stockQuantity, price, image }]);
    setName("");
    setStockQuantity("");
    setPrice("");
    setImage("");
  };

  // 제품정보 삭제 버튼 핸들러
  const handleProductRemove = (index: number) => {
    setProducts([...products.filter(el => products.indexOf(el) !== index)]);
    if (pdImgList) {
      setPdImgList([
        ...pdImgList.filter((el: any) => pdImgList.indexOf(el) !== index),
      ]);
    }
  };

  // 동적으로 판매 제품 리스트의 제품 정보 state들 변경하는 핸들러
  const replaceItemAtIndex = (
    arr: ProductList[],
    index: number,
    newValue: ProductList,
  ): ProductList[] => [
    ...arr.slice(0, index),
    newValue,
    ...arr.slice(index + 1),
  ];

  const editItemHandler = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newList = replaceItemAtIndex(products, index, {
      ...products[index],
      [e.target.id]: e.target.value,
    });

    setProducts(newList);
  };

  // 리스트의 제품 정보 이미지 변경 핸들러

  const editImgHandler = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      // post APi 작성 후, setImage((data as any).data)
      const imageData = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageData);
      const data = await postImageUpload(formData);
      if ((data as any).status === 200) {
        if (products) {
          const newList = replaceItemAtIndex(products, index, {
            ...products[index],
            image: (data as any).data,
          });
          setProducts(newList);
        }
      } else {
        imageErrorHandler({
          data,
          inputName: `ListitemImg${index}`,
          setErrMsg,
          setShowMsgModal,
        });
      }
    }
  };

  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel className="mb-2">
          제품정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <InfoContent>
          {showMsgModal && (
            <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />
          )}
          <ImgBox>
            <label htmlFor="itemImg" className="cursor-pointer text-MainColor">
              <RiImageAddFill
                size="3rem"
                className="hover:text-SubColor absolute top-1/4 left-[30%] bg-white/50 rounded-md"
              />
              <input
                type="file"
                id="itemImg"
                className="hidden"
                onChange={handleFile}
                accept="image/jpeg, image/png, image/jpg"
              />
            </label>
            {image && (
              <Image
                src={image.slice(26)}
                alt="Thumb"
                className="object-cover w-[8rem] h-[6.5rem] rounded-md"
                width={130}
                height={105}
              />
            )}
          </ImgBox>
          <div className="flex flex-wrap ">
            <SubLabel className="w-3/5 px-5">
              <PostInput
                type="text"
                id="name"
                maxLength={15}
                placeholder="제품명"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </SubLabel>
            <SubLabel className="w-1/5">
              <PostInput
                type="number"
                id="stockQuantity"
                min="0"
                placeholder="수량"
                value={stockQuantity}
                onChange={e => setStockQuantity(Number(e.target.value))}
              />
            </SubLabel>
            <SubLabel className="px-5">
              <PostInput
                type="number"
                id="price"
                min="0"
                max={999999}
                placeholder="가격"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
              />
            </SubLabel>
          </div>
        </InfoContent>
        {products.length <= 10 && (
          <span className="text-center">
            <DButton
              id=""
              onClick={handleProductAdd}
              disabled={
                !(
                  // imagePreview &&
                  (name && stockQuantity && price)
                )
              }
            >
              제품정보 추가
            </DButton>
          </span>
        )}
        <PostWriteLabel className="my-7">
          판매 제품 리스트
          <span className="text-sm text-gray-500">
            {" "}
            (총 {products.length}개의 제품)
          </span>
          <Sign> &#42;</Sign>
        </PostWriteLabel>
        {products.map((item, index) => (
          <InfoContent key={index}>
            <ImgBox>
              <label
                htmlFor={`ListitemImg${index}`}
                className="cursor-pointer text-MainColor"
              >
                <RiImageAddFill
                  size="3rem"
                  className="hover:text-SubColor absolute top-1/4 left-[30%] bg-white/50 rounded-md"
                />
                <input
                  type="file"
                  id={`ListitemImg${index}`}
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={e => editImgHandler(index, e)}
                />
              </label>
              {products[index]?.image ? (
                <Image
                  src={products[index].image.slice(26)}
                  alt="Thumb"
                  className="object-cover w-[8rem] h-[6.5rem] rounded-md"
                  width={130}
                  height={105}
                />
              ) : (
                <Image
                  src={exampleImg}
                  alt="Thumb"
                  className="object-cover w-[8rem] h-[6.5rem] rounded-md"
                  width={130}
                  height={105}
                />
              )}
            </ImgBox>
            <div className="flex flex-wrap ">
              <SubLabel className="w-3/5 px-5">
                <PostInput
                  type="text"
                  id="name"
                  maxLength={20}
                  placeholder="제품명"
                  value={item.name}
                  onChange={e => editItemHandler(index, e)}
                />
              </SubLabel>
              <SubLabel className="w-1/5">
                <PostInput
                  type="number"
                  id="stockQuantity"
                  min="0"
                  placeholder="수량"
                  value={item.stockQuantity}
                  onChange={e => editItemHandler(index, e)}
                />
              </SubLabel>
              <SubLabel className="px-5">
                <PostInput
                  type="number"
                  id="price"
                  maxLength={20}
                  placeholder="가격"
                  value={item.price}
                  onChange={e => editItemHandler(index, e)}
                />
              </SubLabel>
            </div>
            <span>
              <MdRemoveCircle
                role="button"
                onClick={() => handleProductRemove(index)}
                size="2rem"
                className="text-MainColor hover:text-SubColor focus:text-SubColor"
              />
            </span>
          </InfoContent>
        ))}
      </PostWriteList>
    </PostWriteContent>
  );
}
