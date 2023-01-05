import tw from "tailwind-styled-components";

interface ICategory {
  Menus: {
    title: string;
  }[];
}

export default function MyPageCategory({ Menus }: ICategory) {
  const Container = tw.div`
    flex bg-MainColor w-[52rem] p-4 justify-between items-center m-auto mt-10 rounded-2xl text-white
    `;

  return (
    <Container>
      {Menus.map((category, index) => (
        <li
          role="presentation"
          key={index}
          className="px-16 text-lg font-semibold list-none"
        >
          {category.title}
        </li>
      ))}
    </Container>
  );
}

// {
//   /* <p className="ml-20 text-2xl font-semibold">{Menus.first}</p>
// <p className="ml-20 text-2xl font-semibold">{second}</p>
// <p className="text-2xl font-semibold">{third}</p>
// <p className="mr-16 text-2xl font-semibold">{fourth}</p> */
// }
