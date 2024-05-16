import * as S from "./ReviewBottomSheet.style";

import { useNavigate } from "react-router-dom";
import EditIcon from "@/components/common/icons/EditIcon";
import DeleteIcon from "@/components/common/icons/DeleteIcon";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";

import MESSAGE from "@/constants/message";
import { useToggle } from "@/hooks/useToggle";
import { useToast } from "@/hooks/useToast";
import reviewApi from "@/apis/review";
export interface ReviewBottomSheetProps {
  close: () => void;
  open: boolean;
  reviewId: string;
}

export default function ReviewBottomSheet({
  close,
  open,
  reviewId,
}: ReviewBottomSheetProps) {
  const navigate = useNavigate();
  const { triggerToast } = useToast();

  const handleDelete = async () => {
    try {
      await reviewApi.deleteReview(reviewId);
      triggerToast(MESSAGE.REVIEW.DELETE, "success");
      navigate(-2);
      confirmClose();
    } catch (err) {
      triggerToast(MESSAGE.ERROR.DEFAULT, "error");
    }
  };

  const handleEdit = () => {
    navigate(`/review/${reviewId}/edit`);
  };

  const {
    open: confirmOpen,
    close: confirmClose,
    isOpen: confirmIsOpen,
  } = useToggle(false);

  return (
    <>
      <BottomSheet close={close} open={open}>
        <S.List>
          <S.Item onClick={handleEdit}>
            <EditIcon />
            <p>수정하기</p>
          </S.Item>
          <S.Item onClick={confirmOpen}>
            <DeleteIcon width="15" height="15" color="#000" />
            <p>삭제하기</p>
          </S.Item>
        </S.List>
      </BottomSheet>
      {confirmIsOpen && (
        <ConfirmDialog
          title="삭제할까요?"
          type="confirm"
          open={confirmIsOpen}
          confirmOnClick={handleDelete}
          confirmButton="확인"
          cancelButton="취소"
          cancelOnClick={confirmClose}
        />
      )}
    </>
  );
}
