import { useState } from "react";
import Header from "../src/components/Page/UserHome/Header";
import UserProfileImage from "../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../src/components/Page/UserHome/UserProfile";
import Followig from "../src/components/Page/UserHome/Following";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import Navbar from "../src/components/Nav/NavBar";
import ProfileButton from "../src/components/Button/ProfileButton";
import Footer from "../src/components/Footer/Footer";
import { Content, BlogContent, UserContent, UserInfo } from "./blog";
import ProductTitle from "../src/components/Page/SaleDetail/ProductTitle";
import ProductContent from "../src/components/Page/SaleDetail/ProductContent";
import ProductGuide from "../src/components/Page/SaleDetail/ProductGuide";
import ProductList from "../src/components/Page/SaleDetail/ProductList";
// import InputForPurchase from "../src/components/Page/SaleDetail/InputForPurchase";
import Agreement from "../src/components/Page/SaleDetail/Agreement";
import { WideB } from "../src/components/Button/SubmitButton";
import PaymentModal from "../src/components/Modal/PaymentModal";

export default function Saledetail() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent className="px-5">
          <ProductTitle />
          <ProductContent />
          <ProductGuide />
          <ProductList />
          {/* <InputForPurchase /> productList안에서 부름 */}
          <Agreement />
          <div className="pt-10">
            {showPaymentModal && (
              <PaymentModal setOpenModal={setShowPaymentModal} />
            )}
            <WideB onClick={() => setShowPaymentModal(!showPaymentModal)}>
              주문하기
            </WideB>
          </div>
        </BlogContent>
        <UserContent>
          <UserInfo>
            <UserProfileImage />
            <UserProfile />
            <div className="w-[10rem] m-auto">
              <Followig />
              <ProfileButton />
            </div>
            <TodayCount />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
