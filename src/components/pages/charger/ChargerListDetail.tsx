import { Link } from "react-router-dom";

import * as S from "./ChargerListDetail.style";
import { Charger } from "@/types";
import ChargingRoleCard from "@/components/common/chargingRoleCard/ChargingRoleCard";
import ChargerStatus from "@/components/common/chargerStatus/ChargerStatus";
import RatingWithStar from "@/components/common/ratingWithStar/RatingWithStar";
import FastChargerIcon from "@/components/common/icons/FastChargerIcon";
import SlowChargerIcon from "@/components/common/icons/SlowChargerIcon";
import OverLay from "@/components/common/overLay/OverLay";

interface ChargerListDetailProps {
  chargers: Charger[];
  close: () => void;
  open: boolean;
}

export default function ChargerListDetail({
  chargers,
  close,
  open,
}: ChargerListDetailProps) {
  return (
    <OverLay open={open} handleOpen={close}>
      <S.ChargerStaitionDetail>
        <S.CloseButtonWrapper>
          <S.CloseButton onClick={close}>X</S.CloseButton>
        </S.CloseButtonWrapper>
        <S.ChargerStaitionDetailList>
          {chargers.map((charger) => {
            return (
              <Link
                to={`/charger/detail/${charger.chargerId}`}
                key={charger.chargerId}
              >
                <S.DetailRole>
                  <ChargingRoleCard role={charger.chargerRole} />
                  <RatingWithStar rating={charger.avgRate} />
                </S.DetailRole>
                <S.DetailTitle>{charger.chargerName}</S.DetailTitle>
                <S.DetailLocation>{charger.chargerLocation}</S.DetailLocation>
                <S.ChargerDetail>
                  <S.StatusContainer>
                    {charger.chargingSpeed === "급속" ? (
                      <FastChargerIcon />
                    ) : (
                      <SlowChargerIcon />
                    )}
                    <p>{charger.chargingSpeed}</p>
                    <ChargerStatus status={charger.chargerStatus} />
                  </S.StatusContainer>
                  <S.TypeContainer>
                    {charger.chargerTypeList.map((type) => {
                      return (
                        <S.DetailType key={type.id}>{type.type}</S.DetailType>
                      );
                    })}
                  </S.TypeContainer>
                </S.ChargerDetail>
              </Link>
            );
          })}
        </S.ChargerStaitionDetailList>
      </S.ChargerStaitionDetail>
    </OverLay>
  );
}
