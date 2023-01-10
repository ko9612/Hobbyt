// import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import Footer from "../src/components/Footer/Footer";
import { Main, MainContent } from "./index";
import OrderProgress from "../src/components/Page/OrderListInfo/OrderProgress";
import SellerInfo from "../src/components/Page/OrderListInfo/SellerInfo";
import PurchaserInfo from "../src/components/Page/OrderListInfo/PurChaserInfo";
import DepositInfo from "../src/components/Page/OrderListInfo/DepositInfo";
import OrderInfo from "../src/components/Page/OrderListInfo/OrderInfo";

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
