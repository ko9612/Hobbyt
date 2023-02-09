import tw from "tailwind-styled-components";

const TodayContainer = tw.div`w-[8rem] m-auto mt-32`;
const TodayContent = tw.div`flex justify-between`;
const TodayTitle = tw.p`text-gray-400`;

interface Iprops {
  total: number;
  today: number;
}

export default function TodayCount({ total, today }: Iprops) {
  return (
    <TodayContainer>
      <TodayContent>
        <TodayTitle>TODAY</TodayTitle>
        <p className="font-bold text-MainColor">{today}</p>
      </TodayContent>
      <TodayContent>
        <TodayTitle>TOTAL</TodayTitle>
        <p>{total}</p>
      </TodayContent>
    </TodayContainer>
  );
}
