import { useState } from "react";
import tw from "tailwind-styled-components";

export default function DefalutTag() {
  const initialTags = ["솜인형", "개인제작"];
  const [tags, setTags] = useState(initialTags);

  const TagInput = tw.div`
    mt-3 mb-10 flex w-[52rem] border-2 rounded-lg px-3 ml-2
    `;

  // 수정해야 함
  const addTags = (event: any) => {
    //   const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (
    //       event.key === "Enter" &&
    //       event.target.value !== "" &&
    //       !tags.includes(event.target.value)
    //     ) {
    // setTags([...tags, event.target.value]);
    //       event.target.value = "";
    //     }
    console.log(event);
  };

  const removeTags = (index: any) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };
  return (
    <div className="mt-10">
      <p>태그</p>
      <TagInput>
        <ul className="tag-ul">
          {tags.map((tag, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="tag" key={idx}>
              <span className="tag-title">{tag}</span>
              <button
                className="tag-close-icon"
                onClick={() => removeTags(idx)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          onKeyUp={event => (event.key === "Enter" ? addTags(event) : null)}
          placeholder="엔터로 태그를 추가하세요"
        />
      </TagInput>
    </div>
  );
}
