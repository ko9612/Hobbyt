import { RiKakaoTalkFill, RiGoogleFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function SocialLoginButton() {
  return (
    <div className="flex justify-between my-10">
      <RiKakaoTalkFill
        role="button"
        className="w-16 h-16 p-2 text-black bg-yellow-300 rounded-full hover:ring-4 hover:ring-yellow-300/40 duration-100"
      />
      <RiGoogleFill
        role="button"
        className="w-16 h-16 p-2 text-white bg-red-500 rounded-full hover:ring-4 hover:ring-red-500/40 duration-100"
      />
      <SiNaver
        role="button"
        className="w-16 h-16 text-green-500 rounded-full hover:ring-4 hover:ring-green-500/40 duration-100"
      />
    </div>
  );
}
