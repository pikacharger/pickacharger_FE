/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./ReviewEditContent.style";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { reviewAtom } from "@/atoms/reviewAtom";
import { useToast } from "@/hooks/useToast";
import MESSAGE from "@/constants/message";
import SearchChargerInput from "../searchChargerInput/SearchChargerInput";
import Label from "@/components/common/label/Label";
import PhotoRegister from "@/components/common/photoRegister/PhotoRegister";
import StickButton from "@/components/common/stickyButton/StickyButton";
import Textarea from "@/components/common/textarea/Textarea";
import Rating from "@/components/pages/reviewWrite/rating/Rating";
import { isAxiosError } from "axios";

interface ReviewData {
  content: string;
  rating: number;
  chargerName?: string | null;
  chargerId?: number | null;
}

export interface ReviewEditContentProps {
  submitReview: (formData: FormData) => Promise<any>;
  submitType?: "chargerName" | "chargerId";
}

export default function ReviewEditContent({
  submitReview,
  submitType = "chargerId",
}: ReviewEditContentProps) {
  const [review, setReview] = useAtom(reviewAtom);
  const [error, setError] = useState({
    chargerId: "",
    chargerName: "",
    content: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const navigate = useNavigate();
  const { triggerToast } = useToast();

  const { chargerId, content, rating, chargerName } = review;

  const conversionToFileData = async (chargerImageList: any) => {
    const filePromises = chargerImageList.map(
      async (file: RequestInfo | URL, idx: number) => {
        // const res = await fetch(file);
        const res = await fetch(file + "?" + new Date().getTime());
        const blob = await res.blob();
        return new File([blob], `image_${idx}`, {
          type: blob.type,
        });
      }
    );
    const photoList = await Promise.all(filePromises);
    setPhotos(photoList);
  };

  useEffect(() => {
    if (submitType === "chargerName" && review.imgUrl) {
      conversionToFileData(review.imgUrl);
    }
  }, [review.imgUrl, submitType]);

  const updatePhoto = (photo: File) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const deletePhoto = (photos: File[]) => {
    setPhotos(photos);
  };

  const createFormData = (data: object) => {
    const formData = new FormData();
    if (submitType == "chargerName") {
      formData.append("reviewModifyPayload", JSON.stringify(data));
    } else {
      formData.append("reviewPayload", JSON.stringify(data));
    }
    photos.forEach((photo) => {
      formData.append("imgUrl", photo);
    });

    return formData;
  };

  const handleUpdateValue = (value: string | number, name: string) => {
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    submitType && content && content.trim().length && content.length <= 200;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError({
        chargerId: chargerId ? "" : MESSAGE.REVIEW.REQUIRE,
        chargerName: chargerName ? "" : MESSAGE.REVIEW.REQUIRE,
        content: content && content.trim().length ? "" : MESSAGE.REVIEW.REQUIRE,
      });
      return;
    }

    try {
      const data: ReviewData = {
        content: review.content,
        rating: review.rating,
      };

      if (submitType == "chargerName") {
        data.chargerName = review.chargerName;
      } else if (submitType == "chargerId") {
        data.chargerId = review.chargerId;
      }

      const response = await submitReview(createFormData(data));

      setReview((prev) => ({
        ...prev,
        rating: 1,
        chargerName: "",
        content: "",
        imgUrl: [],
      }));
      setPhotos([]);

      triggerToast(MESSAGE.REVIEW.SUCCESS, "success");
      navigate(`/review/${response}`, { replace: true });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status == 413) {
          triggerToast(MESSAGE.ERROR.FILE_SIZE, "error");
          return;
        }
        triggerToast(MESSAGE.REVIEW.FAILURE, "error");
      }
    }
  };

  return (
    <>
      <S.Container>
        <S.Box>
          <Link to="/review/write/list">
            <SearchChargerInput
              error={
                submitType === "chargerId"
                  ? error.chargerId
                  : submitType === "chargerName"
                  ? error.chargerName
                  : ""
              }
              value={review.chargerName}
              onChange={(e) => handleUpdateValue(e.target.value, submitType)}
            />
          </Link>
        </S.Box>
        <S.Box>
          <Label>별점</Label>
          <Rating name="rating" onChange={handleUpdateValue} value={rating} />
        </S.Box>
        <S.Box>
          <Textarea
            maxLength={200}
            require
            name="content"
            label="내용"
            value={content}
            error={error.content}
            placeholder="리뷰 내용을 입력해 주세요."
            onChange={(e) => handleUpdateValue(e.target.value, "content")}
          />
        </S.Box>
        <PhotoRegister
          photos={photos}
          updatePhoto={updatePhoto}
          deletePhoto={deletePhoto}
        />
      </S.Container>
      <StickButton position="write" text="작성완료" onClick={handleSubmit} />
    </>
  );
}
