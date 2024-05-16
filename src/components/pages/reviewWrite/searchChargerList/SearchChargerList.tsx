/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "./SearchChargerList.style";

import { useState } from "react";
import { useAtom } from "jotai";

import { reviewAtom } from "@/atoms/reviewAtom";

import { useChargerList } from "@/hooks/queries/charger";
import ChargingInfo from "@/components/common/chargingInfo/ChargingInfo";
import SearchChargerListInput from "./input/SearchChargerListInput";
import { ChargerStation } from "@/types/charger";
import Loading from "@/components/common/loading/Loading";

export default function SearchChargerList() {
  const [, setReview] = useAtom(reviewAtom);
  const [show, setShow] = useState(false);
  const [chargerInfo, setChargerInfo] = useState({
    road_address_name: "",
    address_name: "",
    keyword: "",
  });
  const { data: chargerList, isLoading } = useChargerList(
    chargerInfo.road_address_name
  );

  const updateSearchItem = (name: string, location: string) => {
    setChargerInfo((info) => ({
      ...info,
      keyword: name,
      address_name: name,
      road_address_name: location,
    }));
    setShow(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleChargerClick = (chargerId: number, chargerName: string) => {
    setReview((prev) => ({
      ...prev,
      chargerName: chargerName,
      chargerId: chargerId,
    }));
    handleGoBack();
  };

  return (
    <>
      <SearchChargerListInput
        chargerInfo={chargerInfo}
        setChargerInfo={setChargerInfo}
        show={show}
        setShow={setShow}
        onChange={updateSearchItem}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <S.List>
          {chargerList?.map((chargerStation: ChargerStation) => {
            return chargerStation.chargers.map((charger) => {
              return (
                <ChargingInfo
                  key={charger.chargerId}
                  info={charger}
                  like={false}
                  tag={true}
                  border="bottom"
                  onClick={() =>
                    handleChargerClick(charger.chargerId, charger.chargerName)
                  }
                />
              );
            });
          })}
        </S.List>
      )}
    </>
  );
}
