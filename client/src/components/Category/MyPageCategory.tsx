import tw from "tailwind-styled-components";

interface ICategory {
  Menus: {
    title: string;
  }[];
}

const Container = tw.div`
flex bg-MainColor p-4 justify-between items-center m-auto mt-10 rounded-2xl text-white
`;

export default function MyPageCategory({ Menus }: ICategory) {
  return (
    <Container>
      {Menus.map((category, index) => (
        <li
          role="presentation"
          key={index}
          className="justify-between px-2 font-semibold list-none text-md md:text-lg md:pl-12 md:pr-10"
        >
          {category.title}
        </li>
      ))}
    </Container>
  );
}
