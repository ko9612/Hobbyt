import tw from "tailwind-styled-components";

export default function TodayCount() {
  const TodayContainer = tw.div`w-[8rem] m-auto mt-32`;
  const TodayContent = tw.div`flex justify-between`;
  const TodayTitle = tw.p`
  text-gray-400
  `;
  return (
    <TodayContainer>
      <TodayContent>
        <TodayTitle>TODAY</TodayTitle>
        <p className="font-bold text-MainColor">315</p>
      </TodayContent>
      <TodayContent>
        <TodayTitle>TOTAL</TodayTitle>
        <p>123,512</p>
      </TodayContent>
    </TodayContainer>
  );
}
