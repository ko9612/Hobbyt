import { useRouter } from "next/router";
import { RiKakaoTalkFill, RiGoogleFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function SocialLoginButton() {
  const router = useRouter();

  const handleClick = async (name: string) => {
    router.push(`https://hobbyt.saintho.dev/oauth2/authorization/${name}`);
  };

  return (
    <div className="flex justify-between my-10">
      <RiKakaoTalkFill
        role="button"
        onClick={() => handleClick("kakao")}
        className="w-14 h-14 sm:w-16 sm:h-16 p-2 text-black bg-yellow-300 rounded-full hover:ring-4 hover:ring-yellow-300/40 duration-100"
      />

      <RiGoogleFill
        role="button"
        onClick={() => handleClick("google")}
        className="w-14 h-14 sm:w-16 sm:h-16 p-2 text-white bg-red-500 rounded-full hover:ring-4 hover:ring-red-500/40 duration-100"
      />

      <SiNaver
        role="button"
        onClick={() => handleClick("naver")}
        className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 rounded-full hover:ring-4 hover:ring-green-500/40 duration-100"
      />
    </div>
  );
}
