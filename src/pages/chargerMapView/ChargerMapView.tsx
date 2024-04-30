import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./ChargerMapView.style";
import { Charger } from "@/components/common/chargingInfo/ChargingInfo";
import ChargerMap from "@/components/pages/charger/chargerMap/ChargerMap";
import Button from "@/components/common/button/Button";
import ListIcon from "@/components/common/icons/ListIcon";
import ChargerSearch from "@/components/pages/charger/ChargerSearch";
import Center from "@/components/common/input/Center/Center";

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

export default function ChargerMapView() {
    const navigate = useNavigate();
    const [mapCenter, setMapCenter] = useState<MapCenter>({
        lat: 0,
        lon: 0,
    });

    const [chargerInfo, setChargerInfo] = useState<SearchInfo>({
        address: {
            name: "",
            location: "",
            latitude: 0,
            longitude: 0,
        },
        keyword: "",
    });

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // 위도
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

    useEffect(() => {
        if (chargerInfo.address.location) {
            var geocoder = new window.kakao.maps.services.Geocoder();
            var coords: { lat: number; lon: number } = { lat: 0, lon: 0 };

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(
                chargerInfo.address.location,
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
    }, [chargerInfo]);

    useEffect(()=>{
        console.log(`api요청 : ${mapCenter.lat}, ${mapCenter.lon}`)
    },[mapCenter])

    const sampleData: Charger[] = [
        {
            id: 1,
            charger_location: "서울특별시 광진구 자양로 222",
            charger_name: "퀵차지 2000",
            charging_speed: "급속",
            status: "이용가능",
            latitude: 37.537598,
            longitude: 127.082334,
            content: "이 충전기는 전기차를 위한 빠른 충전을 지원합니다.",
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
            charger_location: "서울특별시 광진구 아차산로 200",
            charger_name: "에코차지 표준",
            charging_speed: "완속",
            status: "이용자제한",
            latitude: 37.537216,
            longitude: 127.071839,
            content: "이 충전기는 전기차를 위한 표준 충전을 제공합니다.",
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
            charger_location: "서울특별시 광진구 능동로 100",
            charger_name: "스마트차지 100",
            charging_speed: "급속",
            status: "이용가능",
            latitude: 37.543924,
            longitude: 127.075433,
            content: "이 충전기는 스마트한 기능을 제공하는 급속 충전기입니다.",
            avg_rate: "4.2",
            company_name: "스마트차지 주식회사",
            member_price: 12,
            nonmember_price: 18,
            personal_price: 15,
            charger_type: "DC차데모",
            charger_role: "개인",
        },
        {
            id: 4,
            charger_location: "서울특별시 광진구 뚝섬로 100",
            charger_name: "편의차지 500",
            charging_speed: "완속",
            status: "이용가능",
            latitude: 37.548327,
            longitude: 127.07299,
            content: "이 충전기는 편의시설과 함께 제공되는 완속 충전기입니다.",
            avg_rate: "4.0",
            company_name: "편의차지 주식회사",
            member_price: 8,
            nonmember_price: 12,
            personal_price: 10,
            charger_type: "AC3상",
            charger_role: "공공",
        },
    ];

    return (
        <div>
            <ChargerSearch
                chargerInfo={chargerInfo}
                setChargerInfo={setChargerInfo}
            />
            <S.ButtonContainer>
                <Button
                    size="md"
                    category="rounded"
                    onClick={() => {
                        navigate("/charger/list");
                    }}>
                    <ListIcon />
                    <p>목록보기</p>
                </Button>
            </S.ButtonContainer>
            <ChargerMap
                info={sampleData}
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
                key={`${mapCenter.lat}-${mapCenter.lon}`}
            />
        </div>
    );
}
