/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./SearchChargerInput.style";

import { useAtom } from "jotai";
import { reviewAtom } from "@/atoms/reviewAtom";

import SearchInput, {
  SearchInputProps,
} from "@/components/common/searchInput/SearchInput";
interface SearchChargerInputProps extends SearchInputProps {
  error: string | boolean;
  onChange: (e: any) => void;
}

export default function SearchChargerInput({
  error = false,
  onChange,
}: SearchChargerInputProps) {
  const [review] = useAtom(reviewAtom);

  return (
    <S.Wrapper>
      <SearchInput
        require
        name="keyword"
        placeholder="주소를 입력해 주세요."
        label="충전소"
        onChange={onChange}
        error={error}
        value={review.chargerName}
      />
    </S.Wrapper>
  );
}
