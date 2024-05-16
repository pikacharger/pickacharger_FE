import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import * as S from "./ChargerEdit.style";
import { searchAddress } from "@/apis/kakaoSearchAddress";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import IconButton from "@/components/common/iconButton/IconButton";
import SearchInput from "@/components/common/searchInput/SearchInput";
import SearchResultItem from "@/components/pages/registerCharger/searchResultItem/SearchResultItem";
import DetailedAddress from "@/components/pages/registerCharger/detailedAddress/DetailedAddress";
import Label from "@/components/common/label/Label";
import SpeedRadioBtn from "@/components/pages/registerCharger/speedRadioBtn/SpeedRadioBtn";
import FareInput from "@/components/pages/registerCharger/fareInput/FareInput";
import SelectCharger from "@/components/common/selectCharger/SelectCharger";
import StickButton from "@/components/common/stickyButton/StickyButton";
import Textarea from "@/components/common/textarea/Textarea";
import PhotoRegister from "@/components/common/photoRegister/PhotoRegister";
import { useNavigate } from "react-router-dom";
import { SAMPLE_USER_INFO } from "@/constants/myCharger";
import {
  IChargerInfo,
  IErrors,
  ISearchResult,
  IchargerImage,
} from "@/types/myCharger";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import myChargerApi from "@/apis/myCharger";
import MESSAGE from "@/constants/message";
import { useToast } from "@/hooks/useToast";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";

export default function ChargerEdit() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const idIndex = parts.indexOf("edit") - 1;
  const chargerId = parts[idIndex];

  const { user } = useCheckUserInfo();
  const { data } = useQuery({
    queryKey: ["chargerInfo", user.id, chargerId],
    queryFn: () => myChargerApi.getEditMyCharger(chargerId),
  });
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [chargerInfo, setChargerInfo] = useState<IChargerInfo>({
    address: {
      name: "",
      location: "",
    },
    keyword: "",
    detailed: "",
    speed: "급속",
    fare: "",
    chargerType: null,
    content: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const debouncedKeyword = useDebounce(chargerInfo.keyword);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    address: { isError: false, errorMessage: "" },
    fare: { isError: false, errorMessage: "" },
    chargerType: { isError: false, errorMessage: "" },
  });
  const { triggerToast } = useToast();

  const conversionToFileData = async (chargerImageList: IchargerImage[]) => {
    const filePromises = chargerImageList.map(async (file) => {
      const res = await fetch(file.imageUrl);
      const blob = await res.blob();
      return new File([blob], `file_${file.id}`, {
        type: blob.type,
      });
    });
    const photoList = await Promise.all(filePromises);
    setPhotos(photoList);
  };

  useEffect(() => {
    if (data) {
      const arr = data.chargerName.split("/");
      const name = arr[0];
      const detail = arr[1];
      setChargerInfo({
        address: {
          name: name,
          location: data.chargerLocation,
        },
        keyword: name,
        detailed: detail,
        speed: data.chargingSpeed,
        fare: data.personalPrice,
        chargerType: data.chargerTypeList[0].type,
        content: data.content,
      });
      conversionToFileData(data.chargerImageList);
    }
  }, [data]);

  const updateSearchItem = (name: string, location: string) => {
    setChargerInfo((info) => ({
      ...info,
      keyword: name,
      address: { name, location },
    }));
    setErrors((prev) => ({
      ...prev,
      address: { ...prev.address, isError: false },
    }));
    setShow(false);
  };

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "keyword") {
      setShow(true);
      setChargerInfo((prev) => ({
        ...prev,
        address: { name: "", location: "" },
      }));
    }
    if (name === "keyword" && value === "") {
      setShow(false);
    }
    if (name === "fare" && value !== "") {
      setErrors((prev) => ({
        ...prev,
        fare: { ...prev.fare, isError: false },
      }));
    }
    if (name === "speed") {
      setChargerInfo((prev) => ({ ...prev, chargerType: null }));
    }
    setChargerInfo((info) => ({ ...info, [name]: value }));
  };

  const updateChargerType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    if (value !== "") {
      setErrors((prev) => ({
        ...prev,
        chargerType: { ...prev.chargerType, isError: false },
      }));
    }
    setChargerInfo((prev) => ({ ...prev, chargerType: value }));
  };

  const updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setChargerInfo((prev) => ({ ...prev, content: value }));
  };

  const updatePhoto = (photo: File) => {
    setPhotos((prev) => [...prev, photo]);
  };
  const deletePhoto = (photos: File[]) => {
    setPhotos(photos);
  };

  useEffect(() => {
    searchAddress(debouncedKeyword, setSearchResults);
  }, [debouncedKeyword]);

  function createFormData() {
    const formData = new FormData();

    const jsonData = {
      chargerLocation: chargerInfo.address.location,
      chargerName: `${chargerInfo.address.name}/${chargerInfo.detailed}`,
      chargingSpeed: chargerInfo.speed,
      content: chargerInfo.content,
      personalPrice: parseInt(chargerInfo.fare),
      chargerTypeDtoList: [{ type: chargerInfo.chargerType }],
    };

    formData.append("chargerUpdate", JSON.stringify(jsonData));
    photos.forEach((photo) => {
      formData.append("imgUrl", photo);
    });

    return formData;
  }

  const onValidationValues = (): boolean => {
    if (chargerInfo.address.location === "") {
      setErrors((prev) => ({
        ...prev,
        address: { isError: true, errorMessage: "필수 입력 항목입니다." },
      }));
      return false;
    }
    if (chargerInfo.fare === "") {
      setErrors((prev) => ({
        ...prev,
        fare: { isError: true, errorMessage: "필수 입력 항목입니다." },
      }));
      return false;
    }
    if (chargerInfo.chargerType === null) {
      setErrors((prev) => ({
        ...prev,
        chargerType: { isError: true, errorMessage: "필수 입력 항목입니다." },
      }));
      return false;
    }
    return true;
  };

  const onSubmitValue = async () => {
    const isPass = onValidationValues();
    if (isPass) {
      const data = createFormData();
      myChargerApi
        .patchMyCharger(data, chargerId)
        .then((res) => navigate(`/charger/detail/${res.chargerId}`))
        .catch((error) => {
          if (error.response.status === 413) {
            triggerToast(MESSAGE.ERROR.FILE_SIZE, "error");
            return;
          }
          alert("충전소 등록이 실패하였습니다.");
        });
    }
  };

  return (
    <S.Container>
      <TopNavigationBar
        leftBtn={
          <IconButton icon="arrowLeft" onClick={() => setIsConfirm(true)} />
        }
        text="충전소 수정"
      />
      <S.Main>
        <ConfirmDialog
          open={isConfirm}
          title="충전소 수정을 취소하시겠습니까?"
          confirmButton="네"
          confirmOnClick={() => {
            navigate(-1);
          }}
          cancelButton="아니요"
          cancelOnClick={() => {
            setIsConfirm(false);
          }}
        />
        <S.ColumnBox>
          <S.Box>
            <SearchInput
              color={errors.address.isError ? "primary" : "default"}
              label="충전소 주소"
              require
              placeholder="충전소 주소를 입력해 주세요."
              error={errors.address.isError}
              errorMessage={errors.address.errorMessage}
              value={chargerInfo.keyword}
              onChange={updateInput}
              name="keyword"
            />
            {show && searchResults.length > 0 && (
              <S.SearchResultsBox>
                {searchResults.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    {...result}
                    onClick={updateSearchItem}
                  />
                ))}
              </S.SearchResultsBox>
            )}
          </S.Box>
        </S.ColumnBox>
        <DetailedAddress
          label="상세 주소"
          placeholder="아파트/건물명 동/호수 층"
          name="detailed"
          value={chargerInfo.detailed ?? ""}
          onChange={updateInput}
        />
        <Label size="lg">충전기 정보</Label>
        <S.ColumnBox>
          <Label size="md" require>
            충전 속도
          </Label>
          <S.RowBox>
            <SpeedRadioBtn
              id="fast"
              value="급속"
              onChange={updateInput}
              selectedOption={chargerInfo.speed}
            />
            <SpeedRadioBtn
              id="slow"
              value="완속"
              onChange={updateInput}
              selectedOption={chargerInfo.speed}
            />
          </S.RowBox>
        </S.ColumnBox>
        <S.ColumnBox>
          <Label size="md" require>
            요금
          </Label>
          <FareInput
            value={chargerInfo.fare ?? ""}
            onChange={updateInput}
            error={errors.fare.isError}
            errorMessage={errors.fare.errorMessage}
          />
        </S.ColumnBox>
        <SelectCharger
          label
          require
          value={chargerInfo.chargerType}
          onChange={updateChargerType}
          type={chargerInfo.speed === "급속" ? "fast" : "slow"}
          error={errors.chargerType.isError}
          errorMessage={errors.chargerType.errorMessage}
        />
        <Textarea
          label="내용"
          placeholder="이용에 대한 상세한 정보 (비용,이용 시간 등)를 작성해 주세요."
          name="content"
          value={chargerInfo.content ?? ""}
          onChange={updateContent}
        >
          {chargerInfo.content}
        </Textarea>
        <PhotoRegister
          photos={photos}
          updatePhoto={updatePhoto}
          deletePhoto={deletePhoto}
        />
      </S.Main>
      <StickButton onClick={onSubmitValue} text="작성완료" position="write" />
    </S.Container>
  );
}
