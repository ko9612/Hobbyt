import tw from "tailwind-styled-components";

const Container = tw.div`
flex bg-MainColor w-[52rem] p-4 justify-between items-center m-auto mt-10 rounded-2xl text-white
`;
interface ICategory {
  Menus: {
    title: string;
  }[];
}

export default function MyPageCategory({ Menus }: ICategory) {
  return (
    <Container>
      {Menus.map((category, index) => (
        <li
          role="presentation"
          key={index}
          className="justify-between px-16 text-lg font-semibold list-none"
        >
          {category.title}
        </li>
      ))}
    </Container>
  );
}
