import { useState } from "react";
import tw from "tailwind-styled-components";
import NavBar from "../src/components/Nav/NavBar";

export default function SignIn() {
  const Button = tw.div`
  mr-9
  hover:underline
  text-red-600
`;
  // alert("asd");
  console.log();

  const [counter, setCounter] = useState(0);
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold text-red-600 underline">
        SignIn {counter}
      </h1>
      <Button onClick={() => setCounter(el => el + 1)} className="a">
        +
      </Button>
    </div>
  );
}
