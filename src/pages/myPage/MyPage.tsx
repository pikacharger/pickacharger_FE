import { Link } from "react-router-dom";

import * as S from "./MyPage.style";
import profile from "@/assets/imgs/profile_small.png";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import EditIcon from "@/components/common/icons/EditIcon";
import RightIcon from "@/components/common/icons/RightIcon";
import OutlineBoltIcon from "@/components/common/icons/OutlineBoltIcon";
import OutlineLikeIcon from "@/components/common/icons/OutlineLikeIcon";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";

export default function MyPage() {
    const { user } = useCheckUserInfo();

    return (
        <S.Container>
            <TopNavigationBar text="마이페이지" />
            <S.UserInfo>
                <div className="info-container">
                    <img src={user.profileImage || profile} alt="프로필이미지" />
                    <div className="info-content">
                        <p className="user-name">{user.nickName}님</p>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>
                <Link to="/mypage/myinfo">
                    <div className="info-link">내 정보 관리</div>
                </Link>
            </S.UserInfo>
            <S.MenuTitle>
                <EditIcon /> 나의 리뷰
            </S.MenuTitle>
            <S.UserMenu>
                <Link to="/review/write">
                    <p>
                        충전 리뷰 작성 <RightIcon />
                    </p>
                </Link>
                <hr />
                <Link to="/review/manage">
                    <p>
                        리뷰 관리 <RightIcon />
                    </p>
                </Link>
            </S.UserMenu>
            <S.MenuTitle>
                <OutlineBoltIcon /> 나의 충전
            </S.MenuTitle>
            <S.UserMenu>
                <Link to="/register-charger">
                    <p>
                        충전기 등록 <RightIcon />
                    </p>
                </Link>
                <hr />
                <Link to="/managing-charger">
                    <p>
                        충전기 관리 <RightIcon />
                    </p>
                </Link>
            </S.UserMenu>
            <S.MenuTitle>
                <OutlineLikeIcon /> 즐겨찾기
            </S.MenuTitle>
            <S.UserMenu>
                <Link to="/mypage/favorites">
                    <p>
                        즐겨 찾는 충전소 <RightIcon />
                    </p>
                </Link>
            </S.UserMenu>
        </S.Container>
    );
}
