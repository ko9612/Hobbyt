import tw from "tailwind-styled-components";
import BlogItem from "../../List/BlogItem";
import FilterButton from "../../Button/FilterButton";
import { SearchBlogDataProps, BlogItemProps } from "../../../type/blogType";

const SRContainer = tw.div`m-auto`;

interface SearchBlogProps {
  keyword: string | string[] | undefined;
  list: SearchBlogDataProps;
}

function SearchBlog({ keyword, list }: SearchBlogProps) {
  return (
    <SRContainer>
      <div className="py-10">
        <span className="text-xl font-semibold text-MainColor">{keyword} </span>
        블로그 검색결과{" "}
        <span>{list.posts ? Object.keys(list.posts).length : 0}건</span>
      </div>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      {list.posts &&
        list.posts.map((item: BlogItemProps) => (
          <BlogItem list={item} key={item.id} />
        ))}
    </SRContainer>
  );
}
export default SearchBlog;
