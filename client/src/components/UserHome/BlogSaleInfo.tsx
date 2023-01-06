import Link from "next/link";
import FilterButton from "../Button/FilterButton";
import DefalutButton from "../Button/DefalutButton";

interface UrlProps {
  url: string;
}

export default function BlogSaleInfo({ url }: UrlProps) {
  return (
    <div className="flex items-center justify-between mt-2">
      <FilterButton />
      <Link href={url}>
        <DefalutButton onClick={() => {}}>글쓰기</DefalutButton>
      </Link>
    </div>
  );
}
