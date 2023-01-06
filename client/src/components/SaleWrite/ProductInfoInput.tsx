import { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { RiImageAddFill } from "react-icons/ri";
import { MdRemoveCircle } from "react-icons/md";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
  SubLabel,
} from "./PostWriteStyle";
import DefalutButton from "../Button/DefalutButton";
// import PostInput from "../Input/PostInput";

const InfoContent = tw.div`
flex items-center mb-4 bg-slate-200 py-2 px-3 rounded-xl
`;

const ImgBox = tw.div`
bg-white rounded-md w-[8rem] h-[6.5rem] flex items-center justify-center
`;

const TextInfo = tw.div`
  flex flex-wrap
`;

interface Product {
  id: number;
  name: string;
  itemImg: string;
  수량: number;
  가격: string;
}

// const priceRegex = /^-?\d+$/;
// const [isPrice, setIsPrice] = useState(0);
// const priceHandler: ComponentProps<"input">["onChange"] = e => {
//   if (priceRegex.test(e.target.value)) setIsPrice(e.target.value);
// };

export default function ProductInfoInput() {
  const nextId = useRef<number>(1);
  const [productList, setProductList] = useState<Product[]>([
    { id: 0, name: "" },
  ]);

  const handleProductAdd = () => {
    setProductList([...productList, { id: nextId.current, name: "" }]);
    nextId.current += 1;
  };

  const handleProductRemove = (index: number) => {
    setProductList(productList.filter(item => item.id !== index));
  };

  const handleProductImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const list = [...productList];
    list[index][name] = value;
    setProductList(list);
  };

  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel className="mb-2">
          제품정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        {productList.map((item, idx) => (
          <>
            <InfoContent key={idx}>
              <ImgBox>
                <label
                  htmlFor="productImg"
                  className="text-MainColor cursor-pointer"
                >
                  <RiImageAddFill size="4rem" className="hover:text-SubColor" />
                  <input
                    type="file"
                    id="productImg"
                    value={item.itemImg}
                    onChange={e => handleProductImgChange(e, idx)}
                    className="hidden"
                  />
                </label>
              </ImgBox>
              <TextInfo>
                <SubLabel className="px-5 w-3/5">
                  <PostInput
                    type="text"
                    id="productName"
                    maxLength={20}
                    placeholder="제품명"
                  />
                </SubLabel>
                <SubLabel className="w-1/5">
                  <PostInput
                    type="number"
                    id="quantity"
                    min="0"
                    max="100"
                    defaultValue={0}
                    placeholder="수량"
                  />
                </SubLabel>
                <SubLabel className="px-5">
                  <PostInput
                    type="text"
                    id="price"
                    maxLength={20}
                    placeholder="가격"
                  />
                </SubLabel>
                <span>
                  {item.id}
                  {idx}
                </span>
              </TextInfo>
              {productList.length > 1 && (
                <span>
                  <MdRemoveCircle
                    role="button"
                    onClick={() => {
                      handleProductRemove(item.id);
                    }}
                    size="2rem"
                    className="text-MainColor hover:text-SubColor focus:text-SubColor"
                  />
                </span>
              )}
            </InfoContent>
            {productList.length - 1 === idx && productList.length <= 10 && (
              <span className="text-center">
                <DefalutButton onClick={handleProductAdd}>
                  제품정보 추가
                </DefalutButton>
              </span>
            )}
          </>
        ))}
      </PostWriteList>
    </PostWriteContent>
  );
}
