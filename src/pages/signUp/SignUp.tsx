/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./SignUp.style";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@/components/common/iconButton/IconButton";
import AccountForm from "@/components/pages/signup/form/account/AccountForm";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import UserInfoForm from "@/components/pages/signup/form/userInfo/UserInfoForm";
import Done from "@/components/pages/signup/done/Done";
import { UserType } from "@/types";
import { useFunnel } from "@/hooks/useFunnel";

const signupSteps = ["계정 정보", "유저 정보", "가입 완료"];

export default function SignUp() {
  const navigate = useNavigate();
  const { Funnel, Step, currentStep, handleClickNext } = useFunnel(
    signupSteps[0]
  );

  const [data, setData] = useState<UserType>({
    email: "",
    code: "",
    password: "",
    passwordCheck: "",
    username: "",
    nickname: "",
    charger: "",
  });

  return (
    <>
      {currentStep !== signupSteps[signupSteps.length - 1] && (
        <TopNavigationBar
          text="회원가입"
          leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
        />
      )}
      <S.Container>
        <Funnel>
          <Step name={signupSteps[0]}>
            <AccountForm
              setData={setData}
              onNext={() => handleClickNext(signupSteps[1])}
            />
          </Step>
          <Step name={signupSteps[1]}>
            <UserInfoForm
              setData={setData}
              data={data}
              onNext={() => handleClickNext(signupSteps[2])}
            />
          </Step>
          <Step name={signupSteps[2]}>
            <Done />
          </Step>
        </Funnel>
      </S.Container>
    </>
  );
}
