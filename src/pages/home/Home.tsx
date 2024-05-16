import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as S from "./Home.style";
import MenuCard from "@/components/pages/home/MenuCard";
import SearchInput from "@/components/common/searchInput/SearchInput";
import logo from "@/assets/imgs/logo_small.png";
import ChatIcon from "@/components/common/icons/ChatIcon";
import SolidMapIcon from "@/components/common/icons/SolidMapIcon";
import EditIcon from "@/components/common/icons/EditIcon";
import FlashIcon from "@/components/common/icons/FlashIcon";
import ArrowRightIcon from "@/components/common/icons/ArrowRightIcon";
import { useFavoritesCharger } from "@/hooks/queries/charger";
import { ChargerStation } from "@/types";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import ChargingInfo from "@/components/common/chargingInfo/ChargingInfo";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useCheckUserInfo();
  const [chargerInfo, setChargerInfo] = useState<ChargerStation[]>([]);
  const { data, isError, isLoading } = useFavoritesCharger(!!user.id);

  useEffect(() => {
    if (!isLoading && !isError) {
      setChargerInfo(data);
    }
  }, [data, isLoading, isError]);

  const FavoriteChager = () => {
    if (!chargerInfo || chargerInfo.length === 0) {
      return (
        <S.EmptyFavorite>자주가는 충전소를 등록해 보세요!</S.EmptyFavorite>
      );
    }
    if (chargerInfo.length > 2) {
      return (
        <>
          {chargerInfo.slice(0, 2).map((chargerStation) => {
            return (
              <ChargingInfo
                key={chargerStation.chargers[0].chargerId}
                info={chargerStation.chargers[0]}
                border="full"
                like={false}
                tag={true}
                onClick={() => {
                  navigate(
                    `/charger/detail/${chargerStation.chargers[0].chargerId}`
                  );
                }}
              />
            );
          })}
        </>
      );
    }
    return (
      <>
        {chargerInfo.map((chargerStation) => {
          return (
            <ChargingInfo
              key={chargerStation.chargers[0].chargerId}
              info={chargerStation.chargers[0]}
              border="full"
              like={false}
              tag={true}
              onClick={() => {
                navigate(
                  `/charger/detail/${chargerStation.chargers[0].chargerId}`
                );
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <S.HomeContainer>
      <img src={logo} alt="logo" />
      <S.SearchDiv>
        <p>어디서 </p>
        <p>
          <span>전기차 충전소</span>를 찾아볼까요?
        </p>
        <SearchInput
          readOnly={true}
          placeholder="충전소 찾아보기"
          onFocus={() => {
            navigate("/charger/list");
          }}
        />
      </S.SearchDiv>
      <S.MenuDiv>
        <S.MenuRow>
          <div className="menuColumn">
            <MenuCard
              path="/charger/map"
              title="내 주변 찾기"
              describe="가까운 전기차 충전소를 바로 찾아보세요!"
              shape="halfSquare"
            >
              <SolidMapIcon />
            </MenuCard>
          </div>
          <div className="menuList">
            <MenuCard
              path="/review/write"
              title="리뷰 작성하기"
              describe="충전소 리뷰를 남길 수 있어요"
              shape="halfRectangle"
            >
              <EditIcon />
            </MenuCard>
            <MenuCard
              path="/chat-list"
              title="채팅하기"
              describe="충전소를 문의해보세요"
              shape="halfRectangle"
            >
              <ChatIcon />
            </MenuCard>
          </div>
        </S.MenuRow>
        <S.MenuRow>
          <MenuCard
            path="/register-charger"
            title="나의 충전기 등록하기"
            describe="충전소 지도에 나의 충전기를 등록할 수 있어요"
            shape="fullRectangle"
          >
            <FlashIcon />
          </MenuCard>
        </S.MenuRow>
      </S.MenuDiv>

      <S.FavoritesCharger>
        <p>즐겨찾는 충전소</p>
        <Link to={"/mypage/favorites"}>
          전체보기
          <ArrowRightIcon />
        </Link>
      </S.FavoritesCharger>
      {user.id ? (
        <S.FavoriteChargerWrapper>
          <FavoriteChager />
        </S.FavoriteChargerWrapper>
      ) : (
        <S.EmptyFavorite>
          <Link to="/login">로그인 후 자주가는 충전소를 등록해보세요!</Link>
        </S.EmptyFavorite>
      )}
    </S.HomeContainer>
  );
}
