import * as S from "./MyFavorites.style";

import { Charger } from "@/components/common/chargingInfo/ChargingInfo";
import LikeIcon from "@/components/common/icons/LikeIcon";
import ChargingInfo from "@/components/common/chargingInfo/ChargingInfo";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import IconButton from "@/components/common/iconButton/IconButton";
import ChargerMap from "@/components/pages/charger/chargerMap/ChargerMap";

const data: Charger[] = [
  {
    id: 1,
    charger_location: "서울특별시 마포구 월드컵북로 502-37",
    charger_name: "퀵차지 2000",
    charging_speed: "급속",
    status: "이용가능",
    latitude: 37.123456,
    longitude: -122.345678,
    content: "이 충전기는 전s 차량을 위한 빠른 충전을 지원합니다.",
    avg_rate: "4.5",
    company_name: "에코차지 주식회사",
    member_price: 10,
    nonmember_price: 15,
    personal_price: 12,
    charger_type: "DC차데모AC3상",
    charger_role: "개인",
  },
  {
    id: 2,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
  {
    id: 3,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
  {
    id: 4,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
  {
    id: 5,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
  {
    id: 6,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
  {
    id: 7,
    charger_location: "서울 송파구 올림픽로43길 88 서울아산병원 (풍납동 388-1)",
    charger_name: "에코차지 표준",
    charging_speed: "완속",
    status: "이용자제한",
    latitude: 37.987654,
    longitude: -122.876543,
    content: "이 충전s는 전기 차량을 위한 표준 충전을 제공합니다.",
    avg_rate: "3.8",
    company_name: "에코차지 주식회사",
    member_price: 5,
    nonmember_price: 10,
    personal_price: 8,
    charger_type: "완속",
    charger_role: "공공",
  },
];
export default function MyFavorites() {
  return (
    <>
      <TopNavigationBar
        text="즐겨찾는 충전소"
        leftBtn={<IconButton icon={"arrowLeft"} />}
      />
      <S.Container>
        <ChargerMap info={data} type="half" />

        <S.Content>
          <S.TitleWrapper>
            <S.IconWrapper>
              <LikeIcon />
            </S.IconWrapper>
            <S.Title>즐겨찾는 충전소</S.Title>
          </S.TitleWrapper>

          <S.FavoriteList>
            <S.FavoriteItem>
              {data.map((data) => {
                return (
                  <ChargingInfo
                    path={`/charger/${data.id}`}
                    info={data}
                    like={true}
                    tag={true}
                    border="bottom"
                  />
                );
              })}
            </S.FavoriteItem>
          </S.FavoriteList>
        </S.Content>
      </S.Container>
    </>
  );
}
