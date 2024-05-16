import DeleteIcon from "@/components/common/icons/DeleteIcon";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import * as S from "./ChatBottomSheet.style";
import { useToggle } from "@/hooks/useToggle";
import { useNavigate } from "react-router-dom";

export interface ChatBottomSheetProps {
  close: () => void;
  open: boolean;
}

export default function ChatBottomSheet({ close, open }: ChatBottomSheetProps) {
  const navigate = useNavigate();
  const handleDelete = () => {
    try {
      // 채팅방 삭제 api 호출
      navigate("/chat-list");
    } catch (err) {
      console.log(err);
    }
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
          <S.Item onClick={confirmOpen}>
            <DeleteIcon width="15" height="15" color="#000" />
            <p>채팅방 나가기</p>
          </S.Item>
        </S.List>
      </BottomSheet>
      <ConfirmDialog
        open={confirmIsOpen}
        title="채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요. 채팅방에서 나가시겠어요?"
        type="confirm"
        confirmOnClick={handleDelete}
        confirmButton="네, 나갈래요."
        cancelButton="취소"
        cancelOnClick={confirmClose}
      />
    </>
  );
}
