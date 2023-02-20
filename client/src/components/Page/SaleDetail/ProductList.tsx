import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { PdContent } from "./ProductContent";

import { SelectPdList } from "../../../type/OrderType";
import { SelectdPdList } from "../../../state/SaleState";
import exampleImg from "../../../image/header_ex.jpg";

const ProductItem = tw.div`w-full h-[5rem] bg-gray-100 rounded-lg flex items-center justify-between px-2`;

const PMButton = tw.button`px-2 text-gray-300 font-semibold`;

export default function ProductList() {
  // 제품 선택 state
  const [selectItem, setSelectItem] =
    useRecoilState<SelectPdList[]>(SelectdPdList);

  // 동적으로 판매 제품 리스트의 제품 정보 state들 변경하는 핸들러
  const replaceItemAtIndex = (
    arr: SelectPdList[],
    index: number,
    newValue: SelectPdList,
  ): SelectPdList[] => [
    ...arr.slice(0, index),
    newValue,
    ...arr.slice(index + 1),
  ];

  // 제품 선택 - 수량 핸들러
  const quantityMinusHandler = (
    idx: number,
    // e: React.ChangeEvent<HTMLInputElement>,
    value: number,
  ) => {
    const newList = replaceItemAtIndex(selectItem, idx, {
      ...selectItem[idx],
      quantity: selectItem[idx].quantity - value,
    });
    setSelectItem(newList);
  };

  const quantityPlusHandler = (
    idx: number,
    // e: React.ChangeEvent<HTMLInputElement>,
    value: number,
  ) => {
    if (selectItem[idx].stockQuantity === 0) {
      alert("품절된 제품입니다.");
    } else if (selectItem[idx].stockQuantity === selectItem[idx].quantity) {
      alert(
        `선택하신 제품의 재고가 ${selectItem[idx].stockQuantity}개 남았습니다.`,
      );
    } else {
      const newList = replaceItemAtIndex(selectItem, idx, {
        ...selectItem[idx],
        quantity: selectItem[idx].quantity + value,
      });
      setSelectItem(newList);
    }
  };

  return (
    <PdContent className="border-none">
      <div className="font-semibold">제품 선택</div>
      <div className="pt-4 grid grid-cols-2 gap-5">
        {selectItem &&
          selectItem.map((item, idx) => (
            <ProductItem key={idx}>
              <div className="flex items-center">
                {/* 서버 에러 처리 후 */}
                <Image
                  //  src={item.imageUrl || exampleImg}
                  src={item.image.slice(26) || exampleImg}
                  // src={exampleImg}
                  alt="제품이미지"
                  width={200}
                  height={200}
                  className="w-[4rem] h-[4rem] object-fill rounded-lg border-2 border-white"
                />
                <div className="font-semibold pl-2">
                  <p>{item.name}</p>
                  <p>{item.price} 원</p>
                  {item.stockQuantity > 0 ? (
                    item.stockQuantity < 5 && (
                      <p className="text-sm text-red-500">품절임박</p>
                    )
                  ) : (
                    <p className="text-sm text-red-500">품절</p>
                  )}
                </div>
              </div>
              <div className="text-center">
                <div className="w-[5rem] bg-white rounded-2xl py-1 flex justify-between">
                  <PMButton
                    disabled={item.quantity === 0}
                    onClick={() =>
                      item.stockQuantity > 0 && quantityMinusHandler(idx, 1)
                    }
                  >
                    -
                  </PMButton>

                  <span>{item.quantity}</span>
                  <PMButton onClick={() => quantityPlusHandler(idx, 1)}>
                    +
                  </PMButton>
                </div>
              </div>
            </ProductItem>
          ))}
      </div>
    </PdContent>
  );
}
