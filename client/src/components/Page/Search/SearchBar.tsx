import { useState } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { BsSearch } from "react-icons/bs";

const SearchForm = tw.form`flex items-center text-MainColor mt-6 p-2 bg-white/90 rounded-md hover:bg-white`;
const SearchInput = tw.input`w-full bg-transparent placeholder:text-MainColor/60 focus:outline-none px-2 text-sm sm:text-base`;

export default function SearchBar() {
  const [keywords, setKeywords] = useState("");
  const router = useRouter();
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (keywords.length >= 2) {
        router.push({
          pathname: "/search",
          query: { keywords },
        });
        setKeywords("");
      } else {
        alert("검색어는 2글자 이상 입력해주세요.");
      }
    }
  };

  return (
    <SearchForm
      className={`${
        router.pathname === "/search" && "border-2 border-MainColor/50"
      }`}
    >
      <BsSearch size="30px" className="block p-1" />
      <SearchInput
        type="search"
        placeholder="게시물, 블로거, 태그"
        value={keywords}
        onChange={e => {
          setKeywords(e.target.value);
        }}
        onKeyPress={e => onKeyPress(e)}
      />
    </SearchForm>
  );
}
