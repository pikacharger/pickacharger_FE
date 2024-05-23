import { Charger } from "@/types";
import { useNavigate } from "react-router-dom";
import * as S from "./ManagingCharger.style";
import { useQuery } from "@tanstack/react-query";
import myChargerApi from "@/apis/myCharger";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import {
  ChargingInfo,
  IconButton,
  TopNavigationBar,
} from "@/components/common";

export default function ManagingCharger() {
  const navigate = useNavigate();
  const {
    user: { id },
  } = useCheckUserInfo();
  const { data: list } = useQuery({
    queryKey: ["myChargerList", id],
    queryFn: myChargerApi.getMyCharger,
    staleTime: 60 * 1000 * 5,
  });
  return (
    <S.Container>
      <TopNavigationBar
        leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
        text="충전기 관리"
      />
      {list && list.length > 0 ? (
        <S.Contents>
          <S.Title>내가 관리하는 {list.length}개의 충전기</S.Title>
          {list.map((data: Charger) => {
            return (
              <ChargingInfo
                key={data.chargerId}
                info={data}
                like={false}
                tag={false}
                border="bottom"
                onClick={() => navigate(`/charger/detail/${data.chargerId}`)}
              />
            );
          })}
        </S.Contents>
      ) : (
        <S.EmptyText>
          <p>등록된 충전기가 없습니다</p>
          <span>충전소 등록으로 수익을 창출해 보세요!</span>
        </S.EmptyText>
      )}
    </S.Container>
  );
}
