import ChargingInfo from "@/components/common/chargingInfo/ChargingInfo";
import IconButton from "@/components/common/iconButton/IconButton";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import { Charger } from "@/types";
import { useNavigate } from "react-router-dom";
import * as S from "./ManagingCharger.style";
import { useQuery } from "@tanstack/react-query";
import myChargerApi from "@/apis/myCharger";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";

export default function ManagingCharger() {
  const navigate = useNavigate();
  const {
    user: { id },
  } = useCheckUserInfo();
  const { data } = useQuery<Charger[], Error>({
    queryKey: ["myChargerList", id],
    queryFn: myChargerApi.getMyCharger,
  });
  return (
    <S.Container>
      <TopNavigationBar
        leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
        text="충전기 관리"
      />
      {data && data.length > 0 ? (
        <>
          <S.Title>내가 관리하는 {data.length}개의 충전기</S.Title>
          {data.map((data) => {
            return (
              <ChargingInfo
                info={data}
                like={false}
                tag={false}
                border="bottom"
                onClick={() => navigate(`/charger/detail/${data.chargerId}`)}
              />
            );
          })}
        </>
      ) : (
        <S.EmptyText>
          <p>등록된 충전기가 없습니다</p>
          <span>충전소 등록으로 수익을 창출해 보세요!</span>
        </S.EmptyText>
      )}
    </S.Container>
  );
}
