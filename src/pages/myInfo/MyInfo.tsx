import { ChangeEvent, useEffect, useRef, useState } from "react";

import * as S from "./MyInfo.style";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import profile from "@/assets/imgs/profile_big.png";
import LabelInput from "@/components/common/labelInput/LabelInput";
import Button from "@/components/common/button/Button";
import LineIcon from "@/components/common/icons/LineIcon";
import { useToggle } from "@/hooks/useToggle";
import ConfirmDialog from "@/components/common/confirmDialog/ConfirmDialog";
import Textarea from "@/components/common/textarea/Textarea";
import CameraIcon from "@/components/common/icons/CameraIcon";
import mypageApi from "@/apis/mypage";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import { useLogout } from "@/hooks/queries/mypage";
import { useGetUserInfo } from "@/hooks/queries/user";
import { useNavigate } from "react-router-dom";
import TokenService from "@/utils/tokenService";
import IconButton from "@/components/common/iconButton/IconButton";

export default function MyInfo() {
    const navigate = useNavigate();
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
    const { user } = useCheckUserInfo();
    const { refetch } = useGetUserInfo();
    const { logout } = useLogout();
    const [nickname, setNickname] = useState<string>("");
    const [imgFile, setImgFile] = useState<string>(user.profileImage || "");

    useEffect(() => {
        if (user.profileImage) {
            setImgFile(user.profileImage);
        }
    }, [user]);

    const imgRef = useRef<HTMLInputElement>(null);
    const {
        open: nicknameOpen,
        close: nicknameClose,
        isOpen: nicknameIsOpen,
    } = useToggle(false);

    const newData = new FormData();

    // 이미지 업로드 input의 onChange
    const saveImgFile = (e: ChangeEvent<HTMLInputElement>) => {
        const userUpdateDto = { nickname: user.nickName };
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result) {
                    setImgFile(reader.result.toString());
                }
            };
            newData.append("file", file);
            newData.append("userUpdateDto", JSON.stringify(userUpdateDto));
            console.log(file);
            mypageApi.editUserInfo(newData).then((res) => {
                setNickname("");
                refetch();
            });
        }
    };

    const modifyNickname = () => {
        if (nickname.length >= 2 && nickname.length <= 10) {
            const userUpdateDto = { nickname: nickname };
            newData.append("userUpdateDto", JSON.stringify(userUpdateDto));
            nicknameClose();
            mypageApi.editUserInfo(newData).then(() => {
                setNickname("");
                refetch();
            });
        }
    };

    const logoutHandler = () => {
        logout();
        logoutClose();
    };

    const accountHandler = async () => {
        await mypageApi.deleteUser().then((res) => {
            TokenService.removeToken();
            accountClose();
            // navigate("/", { replace: true });
            window.location.href = "/";
        });
    };

    return (
        <S.UserInfoContainer>
            <TopNavigationBar
                text="내 정보 관리"
                leftBtn={
                    <IconButton
                        icon="arrowLeft"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                }
            />
            <S.InfoContainer>
                <S.ProfileContainer>
                    <img
                        src={imgFile ? imgFile : profile}
                        alt="프로필 이미지"
                    />
                    <label htmlFor="profileImg">
                        <CameraIcon />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profileImg"
                        onChange={saveImgFile}
                        ref={imgRef}
                    />
                </S.ProfileContainer>
                <S.ProfileInfoContainer>
                    <S.NicknamePara>{user.nickName}</S.NicknamePara>
                    <S.EmailPara>{user.email}</S.EmailPara>
                </S.ProfileInfoContainer>
                <S.InputContainer>
                    <LabelInput
                        label="이메일"
                        name="email"
                        value={user.email}
                        inputDisabled={true}
                    />
                    <LabelInput
                        label="이름"
                        name="name"
                        value={user.username}
                        inputDisabled={true}
                    />
                    <S.EditContainer>
                        <LabelInput
                            label="닉네임"
                            name="nickname"
                            value={user.nickName}
                            readOnly={true}
                        />
                        <Button
                            size="sm"
                            category="normal"
                            onClick={nicknameOpen}>
                            수정하기
                        </Button>
                    </S.EditContainer>
                </S.InputContainer>
            </S.InfoContainer>
            <S.AccountOptionsDiv>
                <p onClick={logoutOpen}>로그아웃</p>
                <LineIcon />
                <p onClick={accountOpen}>계정탈퇴</p>
            </S.AccountOptionsDiv>
            {nicknameIsOpen && (
                <ConfirmDialog
                    title="닉네임수정"
                    type="dialog"
                    confirmButton="확인"
                    confirmOnClick={modifyNickname}
                    cancelButton="취소"
                    cancelOnClick={nicknameClose}
                    open={nicknameIsOpen}>
                    <LabelInput
                        label="닉네임수정"
                        name="nickname"
                        placeholder={user.nickName}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        error="2~10자의 한글 또는 영문 입력해주세요."
                    />
                </ConfirmDialog>
            )}
            {logoutIsOpen && (
                <ConfirmDialog
                    title="로그아웃할까요?"
                    type="confirm"
                    confirmButton="확인"
                    confirmOnClick={logoutHandler}
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
                    confirmOnClick={accountHandler}
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
