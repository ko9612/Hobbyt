import tw from "tailwind-styled-components";
import Link from "next/link";

const PButton = tw.button`
p-2 px-5 bg-MainColor rounded-lg text-white
`;
export default function ProfileButton() {
  return (
    <Link href="/profile">
      <PButton>프로필 수정</PButton>
    </Link>
  );
}
