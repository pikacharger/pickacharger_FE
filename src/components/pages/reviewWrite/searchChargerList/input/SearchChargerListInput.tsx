import * as S from "./SearchChargerListInput.style";

import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { searchAddress } from "@/apis/kakaoSearchAddress";
import { useNavigate } from "react-router-dom";

import SearchResultItem from "@/components/pages/registerCharger/searchResultItem/SearchResultItem";
import { ISearchResult } from "@/types/myCharger";
import { useDebounce } from "@/hooks/useDebounce";
import Input from "@/components/common/input/input";
import ArrowLeftIcon from "@/components/common/icons/ArrowLeftIcon";

interface ChargerInfoType {
  road_address_name: string;
  address_name: string;
  keyword: string;
}
interface SearchChargerListInputProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  chargerInfo: ChargerInfoType;
  setChargerInfo: Dispatch<SetStateAction<ChargerInfoType>>;
  onChange: (name: string, location: string) => void;
}

export default function SearchChargerListInput({
  show,
  setShow,
  chargerInfo,
  setChargerInfo,
  onChange,
}: SearchChargerListInputProps) {
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const navigate = useNavigate();
  const debouncedKeyword = useDebounce(chargerInfo.keyword);

  useEffect(() => {
    searchAddress(debouncedKeyword, setSearchResults);
  }, [debouncedKeyword]);

  const handleUpdateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "keyword") {
      setShow(true);
    }
    setChargerInfo((info) => ({ ...info, [name]: value }));
  };

  return (
    <>
      <S.Input>
        <S.Wrapper>
          <Input.Left onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </Input.Left>
          <Input.Center
            name="keyword"
            value={chargerInfo.keyword}
            placeholder="내 주변 충전소를 검색해 보세요."
            onChange={handleUpdateInput}
          />
        </S.Wrapper>
      </S.Input>

      {show && searchResults.length > 0 && (
        <S.SearchResultsBox>
          {searchResults.map((result) => (
            <SearchResultItem key={result.id} {...result} onClick={onChange} />
          ))}
        </S.SearchResultsBox>
      )}
    </>
  );
}
