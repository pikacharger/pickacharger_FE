import * as S from "./MyInfo.style";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import ArrowLeftIcon from "@/components/common/icons/ArrowLeftIcon";
import profile from "@/assets/imgs/profile_big.png";
import LabelInput from "@/components/common/labelInput/LabelInput";
import Button from "@/components/common/button/Button";
import LineIcon from "@/components/common/icons/LineIcon";
import { useToggle } from "@/hooks/useToggle";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import Textarea from "@/components/common/textarea/Textarea";

export default function MyInfo() {
    const {
        open: logoutOpen,
        close: logoutClose,
        isOpen: logoutIsOpen,
    } = useToggle(false);
    const {
        open: accountOpen,
        close: accountClose,
        isOpen: accountIsOpen,
    } = useToggle(false);
    const user = {
        user_id: 1,
        userName: "JohnDoe",
        address: "123 Main St, Anytown",
        email: "john.doe@example.com",
        password: "hashedpassword123",
        phone_number: "123-456-7890",
        role: "admin",
        chargerType: "fast",
        nickname: "johnd",
        profileImage: "profile.jpg",
        resign_reason: "Moving to another city",
        resign: false,
    };

    return (
        <S.UserInfoContainer>
            <TopNavigationBar text="내 정보 관리" leftBtn={<ArrowLeftIcon />} />
            <S.InfoContainer>
                <S.ProfileContainer>
                    <img src={profile} alt="프로필 이미지" />
                </S.ProfileContainer>
                <S.ProfileInfoContainer>
                    <S.NicknamePara>{user.nickname}</S.NicknamePara>
                    <S.EmailPara>{user.email}</S.EmailPara>
                </S.ProfileInfoContainer>

                <LabelInput label="이메일" name="email" value={user.email} />
                <LabelInput label="이름" name="name" value={user.userName} />
                <S.EditContainer>
                    <LabelInput
                        label="닉네임"
                        name="nickname"
                        value={user.nickname}
                    />
                    <Button size="sm" category="normal">
                        수정하기
                    </Button>
                </S.EditContainer>
            </S.InfoContainer>
            <S.AccountOptionsDiv>
                <p onClick={logoutOpen}>로그아웃</p>
                <LineIcon />
                <p onClick={accountOpen}>계정탈퇴</p>
            </S.AccountOptionsDiv>
            {logoutIsOpen && (
                <ConfirmDialog
                    title="로그아웃할까요?"
                    type="confirm"
                    confirmButton="확인"
                    confirmOnClick={() => {
                        console.log("로그아웃");
                    }}
                    cancelButton="취소"
                    cancelOnClick={logoutClose}
                    open={logoutIsOpen}
                />
            )}
            {accountIsOpen && (
                <ConfirmDialog
                    title="탈퇴하기"
                    type="dialog"
                    confirmButton="완료"
                    confirmOnClick={() => {
                        console.log("완료");
                    }}
                    cancelButton="다시 생각해 볼게요"
                    cancelOnClick={accountClose}
                    open={accountIsOpen}>
                    <Textarea
                        label="사유"
                        error={true}
                        errorMessage="300자 이하의 한글 혹은 영문의 닉네임을 입력해 주세요."
                        size="sm"
                    />
                </ConfirmDialog>
            )}
        </S.UserInfoContainer>
    );
}
