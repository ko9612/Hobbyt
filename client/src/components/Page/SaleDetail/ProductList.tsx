import tw from "tailwind-styled-components";
import Image from "next/image";
import { useState } from "react";
import exampleImg from "../../../image/header_ex.jpg";
import { PdContent } from "./ProductContent";
import InputForPurchase from "./InputForPurchase";

const ProductItem = tw.div`
w-full h-[5rem] bg-gray-100 rounded-lg flex items-center justify-between px-2
`;

const PMButton = tw.button`
px-2 text-gray-300 font-semibold
`;

export default function ProductList() {
  const [items, setItems] = useState([
    { id: 0, title: "제품명1", pdImg: exampleImg, price: 10000, quantity: 0 },
    { id: 1, title: "제품명2", pdImg: exampleImg, price: 11000, quantity: 0 },
    { id: 2, title: "제품명3", pdImg: exampleImg, price: 12000, quantity: 0 },
    { id: 3, title: "제품명4", pdImg: exampleImg, price: 13000, quantity: 0 },
    { id: 4, title: "제품명5", pdImg: exampleImg, price: 14000, quantity: 0 },
  ]);

  const quantityHandler = (id: number, value: number) => {
    const itemList = [...items];
    itemList[id].quantity += value;
    setItems(itemList);
  };

  const priceSum = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <PdContent className="border-none">
        <div className="font-semibold">제품 선택</div>
        <div className="pt-4 grid grid-cols-2 gap-5">
          {items.map(item => (
            <ProductItem key={item.id}>
              <div className="flex">
                <Image
                  src={item.pdImg}
                  alt="제품이미지"
                  className="w-[4rem] object-fill rounded-lg border-2 border-white"
                />
                <div className="font-semibold pl-2">
                  <p>{item.title}</p>
                  <p>{item.price} 원</p>
                  <p className="text-sm text-red-500">품절임박</p>
                </div>
              </div>
              <div className="w-[5rem] bg-white rounded-2xl py-1 flex justify-between">
                <PMButton
                  onClick={() =>
                    item.quantity > 0 && quantityHandler(item.id, -1)
                  }
                >
                  -
                </PMButton>
                <span>{item.quantity}</span>
                <PMButton onClick={() => quantityHandler(item.id, 1)}>
                  +
                </PMButton>
              </div>
            </ProductItem>
          ))}
        </div>
      </PdContent>
      <InputForPurchase priceSum={priceSum} />
    </>
  );
}
