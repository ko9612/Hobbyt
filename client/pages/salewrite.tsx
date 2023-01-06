import dynamic from "next/dynamic";
import Header from "../src/components/UserHome/Header";
import Navbar from "../src/components/Nav/NavBar";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import Footer from "../src/components/Footer/Footer";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import TitleInput from "../src/components/ToastUI/TitleInput";
import DefalutTag from "../src/components/Tag/DefalutTag";
import SubmitButton from "../src/components/Button/SubmitButton";
import RefundGuideInput from "../src/components/SaleWrite/RefundGuideInput";
import ProcessUrlInput from "../src/components/SaleWrite/ProcessUrlInput";
import SalePeriodInput from "../src/components/SaleWrite/SalePeriodInput";
import WarningInput from "../src/components/SaleWrite/WarningInput";
import AccountInput from "../src/components/SaleWrite/AccountInput";
import ShippingInfoInput from "../src/components/SaleWrite/ShippingInfoInput";
import SendTimeInput from "../src/components/SaleWrite/SendTimeInput";
import { Content, BlogContent, UserContent, UserInfo } from "./blog";
import ProductInfoInput from "../src/components/SaleWrite/ProductInfoInput";

export default function SaleWrite() {
  const ToastEditor = dynamic(
    () => import("../src/components/ToastUI/TextEditor"),
    { ssr: false },
  );

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <TitleInput />
          <ToastEditor />
          <RefundGuideInput />
          <ProcessUrlInput />
          <SalePeriodInput />
          <WarningInput />
          <ProductInfoInput />
          <AccountInput />
          <ShippingInfoInput />
          <SendTimeInput />
          <DefalutTag />
          <div className="flex justify-center px-5">
            <SubmitButton onClick={() => {}}>저장</SubmitButton>
          </div>
        </BlogContent>
        <UserContent>
          <UserInfo>
            <UserProfileImage />
            <UserProfile />
            <div className="w-[10rem] m-auto">
              <Followig />
            </div>
            <TodayCount />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
