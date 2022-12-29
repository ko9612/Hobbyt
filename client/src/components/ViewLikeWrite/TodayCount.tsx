import tw from "tailwind-styled-components";

export default function TodayCount() {
  const TodayContainer = tw.div`
  `;
  const TodayContent = tw.div`
  flex
  `;

  const TodayTitle = tw.p`
  `;
  return (
    <TodayContainer>
      <TodayContent>
        <TodayTitle>TODAY</TodayTitle>
        <p className="font-bold text-MainColor">315</p>
      </TodayContent>
      <TodayContent>
        <TodayTitle>TOTAL</TodayTitle>
        <p className="">123,512</p>
      </TodayContent>
    </TodayContainer>
  );
}
