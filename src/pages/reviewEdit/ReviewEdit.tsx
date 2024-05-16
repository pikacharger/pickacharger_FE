/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { useNavigate } from "react-router-dom";
import { reviewAtom } from "@/atoms/reviewAtom";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar.tsx";
import IconButton from "@/components/common/iconButton/IconButton.tsx";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import ReviewEditContent from "@/components/pages/reviewWrite/reviewEditContent/ReviewEditContent.tsx";
import { useValidParams } from "@/hooks/useValidParams";
import { useToast } from "@/hooks/useToast";
import reviewApi from "@/apis/review";
import MESSAGE from "@/constants/message";

export default function ReviewEdit() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [review, setReview] = useAtom(reviewAtom);
  const { id: reviewId } = useValidParams();
  const navigate = useNavigate();
  const { triggerToast } = useToast();

  const getReviewData = async () => {
    try {
      const response = await reviewApi.getEditReview(reviewId);
      const { imageUrls, ...rest } = response;
      setReview({ ...rest, imgUrl: imageUrls });
    } catch (error) {
      triggerToast(MESSAGE.ERROR.DEFAULT, "error");
    }
  };

  useEffect(() => {
    getReviewData();
    if (!review.userIdMatch) return navigate("/");
  }, [review.userIdMatch]);

  return (
    <>
      <ConfirmDialog
        open={isConfirm}
        title={MESSAGE.REVIEW.CANCEL}
        confirmButton="네"
        confirmOnClick={() => {
          navigate(-1);
        }}
        cancelButton="아니요"
        cancelOnClick={() => {
          setIsConfirm(false);
        }}
      />
      <TopNavigationBar
        text="리뷰 수정하기"
        leftBtn={
          <IconButton icon="arrowLeft" onClick={() => setIsConfirm(true)} />
        }
      />
      <ReviewEditContent
        submitType="chargerName"
        submitReview={(formData) => reviewApi.patchReview(formData, reviewId)}
      />
    </>
  );
}
