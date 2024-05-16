import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as S from "./Charger.style";
import ChargerSearch from "@/components/pages/charger/ChargerSearch";
import { ChargerStation, ViewStyle } from "@/types";
import { useChargerList } from "@/hooks/queries/charger";
import ChargerMap from "@/components/pages/charger/chargerMap/ChargerMap";
import Button from "@/components/common/button/Button";
import ListIcon from "@/components/common/icons/ListIcon";
import SolidMapIcon from "@/components/common/icons/SolidMapIcon";
import ChargerStationSummary from "@/components/pages/charger/chargerStationSummary/ChargerStationSummary";
import { useToggle } from "@/hooks/useToggle";
import ChargerListDetail from "@/components/pages/charger/ChargerListDetail";
import ArrowRotateIcon from "@/components/common/icons/ArrowRotateIcon";

export interface SearchInfo {
    address: {
        name: string;
        location: string;
        latitude: number;
        longitude: number;
    };
    keyword: string;
}

export interface MapCenter {
    lat: number;
    lon: number;
}

export default function Charger() {
    const navigate = useNavigate();
    const { viewType } = useParams<{ viewType: ViewStyle }>();
    const [location, setLocation] = useState("");
    const [stationId, setStationId] = useState(-1);
    const { open, close, isOpen } = useToggle(false);
    const {
        open: searchButtonOpen,
        close: searchButtonClose,
        isOpen: searchButtonIsOpen,
    } = useToggle(false);
    const [searchInfo, setSearchInfo] = useState<SearchInfo>({
        address: {
            name: "",
            location: "",
            latitude: 0,
            longitude: 0,
        },
        keyword: "",
    });
    const [mapCenter, setMapCenter] = useState<MapCenter>({
        lat: 0,
        lon: 0,
    });
    const [chargerInfo, setChargerInfo] = useState<ChargerStation[]>([]);

    const { data, isLoading, isError } = useChargerList(location);

    useEffect(() => {
        if (!isLoading && !isError) {
            setChargerInfo(data);
        }
    }, [data, isLoading, isError]);

    // 현재위치로 mapCenter 설정
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude,
                    lon = position.coords.longitude;

                setMapCenter({
                    lat,
                    lon,
                });
            });
        } else {
            console.log("geolocation을 사용할수 없어요..");
        }
    }, []);

    // mapCenter 변경시 좌표 이용해서 주소 구하기
    useEffect(() => {
        if (!searchButtonIsOpen) {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.coord2Address(
                mapCenter.lon,
                mapCenter.lat,
                async function (result: any, status: string) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const detailAddr = !!result[0].road_address
                            ? result[0].road_address.address_name
                            : result[0].address.address_name;
                        setLocation(detailAddr);
                    }
                }
            );
        }
    }, [mapCenter, searchButtonIsOpen]);

    useEffect(() => {
        setLocation(searchInfo.address.location);
    }, [searchInfo]);

    useEffect(() => {
        if (searchInfo.address.location) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            let coords: { lat: number; lon: number } = { lat: 0, lon: 0 };

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(
                searchInfo.address.location,
                function (result: any, status: string) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === window.kakao.maps.services.Status.OK) {
                        coords = {
                            lat: Number(result[0].y),
                            lon: Number(result[0].x),
                        };
                        setMapCenter({
                            lat: coords.lat,
                            lon: coords.lon,
                        });
                    } else {
                        console.log("위도/경도를 구할 수 없습니다.");
                    }
                }
            );
        }
    }, [searchInfo]);

    const updateSearchInfo: React.Dispatch<React.SetStateAction<SearchInfo>> = (
        updatedInfo
    ) => {
        setSearchInfo(updatedInfo);
    };

    return (
        <S.ChargerContainer>
            <ChargerSearch
                searchInfo={searchInfo}
                searchInfoHandler={updateSearchInfo}
                viewType={viewType}
            />
            {viewType === "map" ? (
                <>
                    {searchButtonIsOpen && (
                        <S.SearchButtonContainer>
                            <Button
                                size="md"
                                category="outline"
                                onClick={searchButtonClose}>
                                <ArrowRotateIcon />
                                현 지도에서 검색
                            </Button>
                        </S.SearchButtonContainer>
                    )}
                    <ChargerMap
                        info={chargerInfo}
                        mapCenter={mapCenter}
                        setMapCenter={setMapCenter}
                        searchButtonOpen={searchButtonOpen}
                    />
                    <S.ButtonContainer viewtype="map">
                        <Button
                            size="md"
                            category="rounded"
                            onClick={() => {
                                navigate("/charger/list");
                            }}>
                            <ListIcon />
                            <p>목록보기</p>
                        </Button>
                    </S.ButtonContainer>{" "}
                </>
            ) : (
                <>
                    <S.listViewContainer>
                        {chargerInfo?.map((chargerStation) => {
                            return (
                                <div
                                    key={chargerStation.chargerGroupId}
                                    onClick={() => {
                                        setStationId(
                                            chargerStation.chargerGroupId - 1
                                        );
                                    }}>
                                    <ChargerStationSummary
                                        viewstyle="list"
                                        chargerStation={chargerStation}
                                        open={open}
                                    />
                                </div>
                            );
                        })}
                        {isOpen && chargerInfo[stationId] && (
                            <ChargerListDetail
                                chargers={chargerInfo[stationId].chargers}
                                close={close}
                                open={isOpen}
                            />
                        )}
                    </S.listViewContainer>
                    <S.ButtonContainer viewtype="list">
                        <Button
                            size="md"
                            category="normal"
                            onClick={() => {
                                navigate("/charger/map");
                            }}>
                            <SolidMapIcon />
                            <p>지도보기</p>
                        </Button>
                    </S.ButtonContainer>
                </>
            )}
        </S.ChargerContainer>
    );
}
