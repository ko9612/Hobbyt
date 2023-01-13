import tw from "tailwind-styled-components";
import DefalutButton from "../../Button/DefalutButton";

export default function ProfileEdit() {
  const ProfileContainer = tw.div`
  w-[40rem] m-auto
    `;

  const ProfileContent = tw.div`
  mb-20
 `;

  return (
    <ProfileContainer>
      <ProfileContent>
        <h1 className="mt-10 text-2xl font-bold">프로필 수정</h1>
        <h3 className="text-xl font-semibold mt-14">닉네임</h3>
        <p className="text-gray-400">
          &#42; 닉네임은 최대 6글자까지 가능합니다.
        </p>
        <input
          type="text"
          className="p-2 mt-2 bg-gray-200 rounded-lg w-80"
          placeholder="닉네임"
        />
        <h3 className="mt-10 text-xl font-semibold">자기소개</h3>
        <textarea
          cols={50}
          rows={2}
          className="p-2 mt-2 bg-gray-200 rounded-lg w-80"
        />
      </ProfileContent>
      <DefalutButton onClick={() => {}}>저장</DefalutButton>
    </ProfileContainer>
  );
}
