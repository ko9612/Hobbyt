import {
  useState,
  // useRef
} from "react";
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
import { DefalutButton } from "../../Button/DefalutButton";
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

// const priceRegex = /^-?\d+$/;
// const [isPrice, setIsPrice] = useState(0);
// const priceHandler: ComponentProps<"input">["onChange"] = e => {
//   if (priceRegex.test(e.target.value)) setIsPrice(e.target.value);
// };

export default function ProductInfoInput() {
  // const [productList, setProductList]=({});

  const [products, setProducts] = useState([
    { pdName: "", itemImg: "", quantity: 0, price: "" },
  ]);

  const handleProductAdd = () => {
    setProducts([
      ...products,
      { pdName: "", itemImg: "", quantity: 0, price: "" },
    ]);
  };

  const handleProductRemove = (index: number) => {
    const filteredPd = [...products];
    filteredPd.splice(index, 1);
    setProducts(filteredPd);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const list = [...products] as any;
    list[index][e.target.id] = e.target.value;
    setProducts(list);
  };
  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel className="mb-2">
          제품정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        {products.map((item, index) => (
          <>
            <InfoContent key={index}>
              {/* key값 그냥 uuid 사용할까 */}
              <ImgBox>
                <label
                  htmlFor="itemImg"
                  className="cursor-pointer text-MainColor"
                >
                  <RiImageAddFill size="4rem" className="hover:text-SubColor" />
                  <input
                    type="file"
                    id="itemImg"
                    className="hidden"
                    value={item.itemImg}
                    onChange={e => handleChange(index, e)}
                  />
                </label>
              </ImgBox>
              <TextInfo>
                <SubLabel className="w-3/5 px-5">
                  <PostInput
                    type="text"
                    id="pdName"
                    maxLength={20}
                    placeholder="제품명"
                    value={item.pdName}
                    onChange={e => handleChange(index, e)}
                  />
                </SubLabel>
                <SubLabel className="w-1/5">
                  <PostInput
                    type="number"
                    id="quantity"
                    min="0"
                    max="100"
                    placeholder="수량"
                    value={item.quantity}
                    onChange={e => handleChange(index, e)}
                  />
                </SubLabel>
                <SubLabel className="px-5">
                  <PostInput
                    type="text"
                    id="price"
                    maxLength={20}
                    placeholder="가격"
                    value={item.price}
                    onChange={e => handleChange(index, e)}
                  />
                </SubLabel>
              </TextInfo>
              {products.length > 1 && (
                <span>
                  <MdRemoveCircle
                    role="button"
                    onClick={() => handleProductRemove(index)}
                    size="2rem"
                    className="text-MainColor hover:text-SubColor focus:text-SubColor"
                  />
                </span>
              )}
            </InfoContent>
            {products.length - 1 === index && products.length <= 10 && (
              <span className="text-center">
                <DefalutButton id="" onClick={handleProductAdd}>
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
