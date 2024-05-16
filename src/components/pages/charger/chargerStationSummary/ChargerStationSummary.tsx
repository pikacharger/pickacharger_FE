import { ChargerStation,  ViewStyle} from "@/types"
import * as S from "./ChargerStationSummary.style"


interface SummaryProps {
    chargerStation : ChargerStation;
    open? : ()=> void;
    viewstyle:ViewStyle;
}

export default function ChargerStationSummary (
    {chargerStation, open, viewstyle} : SummaryProps
) {
    return <S.SummaryContainer onClick={open} viewstyle={viewstyle}>
        <S.DetailTitle>{chargerStation.chargerName}</S.DetailTitle>
                    <S.DetailLocation>
                        {chargerStation.chargerLocation}
                    </S.DetailLocation>
                    <S.DetailLocation>
                        {chargerStation.chargers.length}개의 충전기가 있습니다.
                    </S.DetailLocation>
    </S.SummaryContainer>
}