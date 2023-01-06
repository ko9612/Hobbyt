import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import tw from "tailwind-styled-components";

const FooterDiv = tw.footer`
flex justify-between items-center flex-wrap text-gray-400 lg:ml-[18rem] mt-20
`;

const Text = tw.span`
my-1 hover:text-purple-400
`;

const FooterContent = tw.div`
py-3
`;

const Content = tw.div`
inline-flex mx-3 
`;

export default function Footer() {
  const member = [
    { id: 0, name: "고하나", github: "https://github.com/ko9612" },
    { id: 1, name: "안지은", github: "https://github.com/Heera1" },
    { id: 2, name: "박정인", github: "https://github.com/Ahrang777" },
    { id: 3, name: "조성호", github: "https://github.com/toneofrain" },
  ];

  return (
    <FooterDiv>
      <FooterContent>
        <Content>
          <Link href="https://github.com/ko9612/Hobbyt" className="flex">
            <RiGithubFill className="mr-2" size="30px" />
            <Text>Team Github</Text>
            <span className="mx-4 border-l border-solid" />
            <Text>Hobbyt</Text>
          </Link>
        </Content>
      </FooterContent>
      <FooterContent>
        {member.map(memberInfo => (
          <Content key={memberInfo.id}>
            <RiGithubFill className="mr-2" size="30px" />
            <a href={memberInfo.github}>
              <Text>{memberInfo.name}</Text>
            </a>
          </Content>
        ))}
      </FooterContent>
    </FooterDiv>
  );
}
