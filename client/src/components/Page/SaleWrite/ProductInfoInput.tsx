import {
  useState,
  // useRef
} from "react";
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
// import PostInput from "../Input/PostInput";
import { ProductList, ProductImg } from "../../../type/saleType";
import { SalePdImgsList, SaleProductList } from "../../../state/SaleState";

export default function ProductInfoInput() {
  // 제품 정보 Input
  const [imagePreview, setImagePreview] = useState();
  const [name, setName] = useState("");
  const [stockQuantity, setStockQuantity] = useState<
    number | undefined | string
  >();
  const [price, setPrice] = useState<number | undefined | string>();

  // 제품 정보 리스트
  const [products, setProducts] =
    useRecoilState<ProductList[]>(SaleProductList);

  // 제품 정보 이미지 리스트
  const [pdImgList, setPdImgList] = useRecoilState<any>(SalePdImgsList);

  // 제품정보 이미지 업로드 핸들러
  const handleFile = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const file: any = reader.result;
      setImagePreview(file);
    };
  };

  // 제품정보 추가 버튼 핸들러
  const handleProductAdd = () => {
    setProducts([...products, { name, stockQuantity, price }]);
    if (pdImgList) {
      setPdImgList([...pdImgList, { img: imagePreview }]);
    }
    setImagePreview(undefined);
    setName("");
    setStockQuantity("");
    setPrice("");
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
  const replaceImgAtIndex = (
    arr: ProductImg[],
    index: number,
    newValue: ProductImg,
  ): ProductImg[] => [
    ...arr.slice(0, index),
    newValue,
    ...arr.slice(index + 1),
  ];

  const editImgHandler = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const file: any = reader.result;
      if (pdImgList) {
        const newList = replaceImgAtIndex(pdImgList, index, {
          ...pdImgList[index],
          img: file,
        });
        setPdImgList(newList);
      }
    };
  };

  console.log(pdImgList);

  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel className="mb-2">
          제품정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <InfoContent>
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
            {imagePreview && (
              <Image
                src={imagePreview && imagePreview}
                alt="Thumb"
                className="object-cover w-[8rem] h-[6.5rem] rounded-md"
                width={130}
                height={105}
              />
            )}
          </ImgBox>
          <div className="  flex flex-wrap">
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
              disabled={!(imagePreview && name && stockQuantity && price)}
            >
              제품정보 추가
            </DButton>
          </span>
        )}
        <PostWriteLabel className="my-7">
          판매 제품 리스트
          <span className="text-gray-500 text-sm">
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
                  onChange={e => editImgHandler(index, e)}
                />
              </label>
              {pdImgList && (
                <Image
                  src={pdImgList && pdImgList[index].img}
                  alt="Thumb"
                  className="object-cover w-[8rem] h-[6.5rem] rounded-md"
                  width={130}
                  height={105}
                />
              )}
            </ImgBox>
            <div className="  flex flex-wrap">
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
