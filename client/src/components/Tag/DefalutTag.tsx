import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import { TagState } from "../../state/BlogPostState";

const TagInput = tw.div`
mt-3 mb-10 flex border-2 rounded-lg px-3
`;

export default function DefalutTag() {
  const [tags, setTags] = useRecoilState(TagState);

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      event.currentTarget.value !== "" &&
      !tags?.includes(event.currentTarget.value)
    ) {
      setTags([...tags, event.currentTarget.value]);
      // eslint-disable-next-line no-param-reassign
      event.currentTarget.value = "";
      console.log(`초기화 됐닝?`, event.currentTarget.value);
    }
    console.log(event);
  };

  // 태그 지우는 함수
  const removeTags = (index: number) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setTags([...tags?.filter((tag: string) => tags.indexOf(tag) !== index)]);
  };

  return (
    <div className="px-5 mt-10">
      <p className="font-semibold">
        태그 <span className="text-red-500">&#42;</span>
      </p>
      <TagInput>
        <ul className="tag-ul">
          {tags?.map((tag: string, idx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="tag" key={idx}>
              <span className="tag-title">{tag}</span>
              <button
                type="button"
                className="tag-close-icon"
                onClick={() => removeTags(idx)}
              >
                &times;
              </button>
            </li>
          ))}
           <input
          className="tag-input"
          type="text"
          onKeyUp={event => (event.key === "Enter" ? addTags(event) : null)}
          placeholder="엔터로 태그를 추가하세요"
        />
        </ul>
       
      </TagInput>
    </div>
  );
}
