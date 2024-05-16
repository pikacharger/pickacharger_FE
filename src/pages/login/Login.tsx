import * as S from "./Login.style";

import { Link } from "react-router-dom";

import logo from "@/assets/imgs/logo_big.png";
import Button from "@/components/common/button/Button";
import LabelInput from "@/components/common/labelInput/LabelInput";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";

import { useFormValidation } from "@/hooks/useFormValidation";
import { useLogin } from "@/hooks/queries/user";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const { formState, handleInputChange, error, handleSubmit } =
    useFormValidation(initialState);

  const isFormValid =
    !Object.keys(error).length && formState.email && formState.password;

  const { login } = useLogin();

  return (
    <>
      <TopNavigationBar text="로그인" />
      <S.Container>
        <Link to="/">
          <S.LogoWrapper>
            <img src={logo} alt="피카충전 로고" />
          </S.LogoWrapper>
        </Link>
        <S.Form onSubmit={handleSubmit(() => login(formState))}>
          <LabelInput
            name="email"
            label="이메일"
            placeholder="example@pikacharger.store"
            value={formState.email}
            onChange={handleInputChange("email")}
            error={error.email}
          />
          <LabelInput
            name="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            value={formState.password}
            onChange={handleInputChange("password")}
            error={error.password}
          />
          <S.ButtonWrapper>
            <Button size="lg" category={isFormValid ? "normal" : "disable"}>
              이메일 로그인
            </Button>
          </S.ButtonWrapper>
        </S.Form>

        <S.TextWrapper>
          <p>
            계정이 없으신가요?
            <Link to="/signup">
              <span>회원가입</span>
            </Link>
          </p>
        </S.TextWrapper>
      </S.Container>
    </>
  );
}
