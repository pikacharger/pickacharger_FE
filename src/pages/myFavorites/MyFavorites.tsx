import * as S from "./MyFavorites.style";
import { useState, useEffect } from "react";

import LikeIcon from "@/components/common/icons/LikeIcon";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import IconButton from "@/components/common/iconButton/IconButton";
import ChargerMap from "@/components/pages/charger/chargerMap/ChargerMap";
import { ChargerStation } from "@/types";
import { useFavoritesCharger } from "@/hooks/queries/charger";
import { MapCenter } from "../charger/Charger";
import ChargingInfo from "@/components/common/chargingInfo/ChargingInfo";
import ChargerStationSummary from "@/components/pages/charger/chargerStationSummary/ChargerStationSummary";
import { useToggle } from "@/hooks/useToggle";
import ChargerListDetail from "@/components/pages/charger/ChargerListDetail";
import { useNavigate } from "react-router-dom";

export default function MyFavorites() {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    lat: 0,
    lon: 0,
  });
  const [chargerInfo, setChargerInfo] = useState<ChargerStation[]>([]);

  const { data, isError, isLoading } = useFavoritesCharger(true);

  useEffect(() => {
    if (!isLoading && !isError) {
      setChargerInfo(data);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        setMapCenter({
          lat,
          lon,
        });
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      console.log("geolocation을 사용할수 없어요..");
    }
  }, []);

  const handleStationClick = (chargerStation: ChargerStation) => {
    setMapCenter({
      lat: chargerStation.chargers[0].latitude,
      lon: chargerStation.chargers[0].longitude,
    });
  };

  return (
    <>
      <TopNavigationBar
        text="즐겨찾는 충전소"
        leftBtn={
          <IconButton
            icon={"arrowLeft"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <S.Container>
        <ChargerMap
          info={data}
          type="half"
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          key={`${mapCenter.lat}-${mapCenter.lon}`}
        />

        <S.Content>
          <S.TitleWrapper>
            <S.IconWrapper>
              <LikeIcon />
            </S.IconWrapper>
            <S.Title>즐겨찾는 충전소</S.Title>
          </S.TitleWrapper>

          <S.FavoriteList>
            {!chargerInfo || chargerInfo.length === 0 ? (
              <span>자주가는 충전소를 등록해 보세요!</span>
            ) : (
              <S.FavoriteItem>
                {chargerInfo.map((chargerStation) => {
                  return (
                    <div
                      key={chargerStation.chargerGroupId}
                      onClick={() => {
                        handleStationClick(chargerStation);
                      }}
                    >
                      <ChargerStationSummary
                        viewstyle="list"
                        chargerStation={chargerStation}
                      />
                    </div>
                  );
                })}
              </S.FavoriteItem>
            )}
          </S.FavoriteList>
        </S.Content>
      </S.Container>
    </>
  );
}
