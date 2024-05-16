import { ISearchResult } from "@/types/myCharger";
import * as S from "./SearchResultItem.style";

export interface ISearchResultItemProps extends ISearchResult {
  onClick: (name: string, address: string) => void;
}

export default function SearchResultItem({
  place_name,
  category_name,
  road_address_name,
  address_name,
  onClick,
}: ISearchResultItemProps) {
  const handleClick = () => {
    const name = place_name || "";
    const address = road_address_name || address_name || "";
    onClick(name, address);
  };

  return (
    <S.Item onClick={handleClick}>
      <S.Top>
        <S.Name>{place_name || "정보 없음"}</S.Name>
        <S.Category>
          {category_name.split(">").pop()?.trim() || "정보 없음"}
        </S.Category>
      </S.Top>
      <S.Address>{road_address_name || address_name || "정보 없음"}</S.Address>
    </S.Item>
  );
}
