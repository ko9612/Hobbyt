import tw from "tailwind-styled-components";

export default function Home() {
  const Button = tw.div`mr-9 hover:underline text-red-600`;

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 underline">
        Hello world!
      </h1>
      <Button className="a">버튼</Button>
      <button>이름</button>
    </>
  );
}
