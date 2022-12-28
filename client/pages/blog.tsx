import tw from "tailwind-styled-components";
import Header from "../src/components/UserHome/Header";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";

export default function Blog() {
  const UserInfo = tw.aside`
   w-[16rem] h-full
   justift-center items-center
   ml-auto
   border border-red-500 
  `;

  return (
    <>
      <Header />
      <UserInfo>
        <UserProfileImage />
        <UserProfile />
        <div className="w-[10rem] m-auto">
          <Followig />
        </div>
      </UserInfo>
    </>
  );
}
