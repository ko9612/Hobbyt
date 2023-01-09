// import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import Footer from "../src/components/Footer/Footer";
import { Main, MainContent } from "./index";
import OrderProgress from "../src/components/OrderListInfo/OrderProgress";
import SellerInfo from "../src/components/OrderListInfo/SellerInfo";
import PurchaserInfo from "../src/components/OrderListInfo/PurChaserInfo";
import DepositInfo from "../src/components/OrderListInfo/DepositInfo";
import OrderInfo from "../src/components/OrderListInfo/OrderInfo";

export default function orderdetail() {
  return (
    <>
      <Navbar />
      <Main>
        <MainContent className="py-10">
          <OrderProgress />
          <SellerInfo />
          <PurchaserInfo />
          <DepositInfo />
          <OrderInfo />
        </MainContent>
      </Main>
      <Footer />
    </>
  );
}
