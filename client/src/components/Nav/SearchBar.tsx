import tw from "tailwind-styled-components";
import { BsSearch } from "react-icons/bs";

const SearchForm = tw.form`
flex px-2 items-center text-MainColor mt-6 
`;
const SearchInput = tw.input`
px-4 py-2 w-full rounded-md bg-white/90 placeholder:text-MainColor/60 focus:bg-white focus:border 
focus:border-white focus:outline-none focus:ring-4 focus:ring-white/40 transitions duration-300 
`;

export default function SearchBar() {
  return (
    <SearchForm>
      <SearchInput
        type="text"
        aria-label="search "
        placeholder="게시물, 블로거, 태그"
      />
      <BsSearch role="button" size="30px" className="p-1 absolute right-8" />
    </SearchForm>
  );
}
