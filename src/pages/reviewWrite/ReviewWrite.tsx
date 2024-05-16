import { useNavigate } from "react-router-dom";
import { useState } from "react";

import reviewApi from "@/apis/review";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar.tsx";
import IconButton from "@/components/common/iconButton/IconButton.tsx";
import ReviewEditContent from "@/components/pages/reviewWrite/reviewEditContent/ReviewEditContent.tsx";
import MESSAGE from "@/constants/message";
export interface ReviewType {
  chargerName: string;
  chargerId: number | null;
  rating: number;
  content: string;
  userId?: number;
  imgUrl?: string[];
  userIdMatch?: boolean;
}

export default function ReviewWrite() {
  const [isConfirm, setIsConfirm] = useState(false);

  const navigate = useNavigate();

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
        text="리뷰 작성하기"
        leftBtn={
          <IconButton icon="arrowLeft" onClick={() => setIsConfirm(true)} />
        }
      />
      <ReviewEditContent
        submitReview={(formData) => reviewApi.postReview(formData)}
      />
    </>
  );
}
