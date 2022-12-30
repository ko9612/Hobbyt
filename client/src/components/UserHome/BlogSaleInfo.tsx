import FilterButton from "../Button/FilterButton";
import DefalutButton from "../Button/DefalutButton";

export default function BlogSaleInfo() {
  return (
    <div className="flex items-center justify-between mt-2">
      <FilterButton />
      <DefalutButton>글쓰기</DefalutButton>
    </div>
  );
}
