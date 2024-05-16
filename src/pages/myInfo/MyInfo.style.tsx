import styled from "styled-components";
import { flexColumn } from "@/styles/common";

export const UserInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  margin-top: 56px;
`;

export const InfoContainer = styled.div`
  padding: 0 1.5rem 5rem;
  padding-bottom: 5rem;
`;

export const ProfileContainer = styled.div`
  position: relative;
  width: 106px;
  height: 106px;
  margin: 0 auto 1rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
  }
  label {
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: transparent;
    cursor: pointer;
    svg {
      width: 27px;
      height: 27px;
    }
  }
  input[type="file"] {
    display: none;
  }
`;

export const ProfileInfoContainer = styled.div`
  margin-bottom: 1rem;
  P {
    text-align: center;
  }
`;
export const NicknamePara = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 21px;
  color: ${({ theme }) => theme.PALETTE.black};
  margin-bottom: 4px;
`;
export const EmailPara = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[300]};
`;

export const InputContainer = styled.div`
  ${flexColumn}
  gap: 1rem;
`;

export const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  div {
    flex: 1;
  }
  button {
    align-self: end;
  }
`;

export const AccountOptionsDiv = styled.div`
  border-top: 8px solid ${({ theme }) => theme.PALETTE.gray[100]};
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.PALETTE.white};
  display: flex;
  align-items: center;
  p {
    color: ${({ theme }) => theme.PALETTE.gray[300]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    cursor: pointer;
  }
  svg {
    margin: 0 24px;
    width: 3px;
    height: 20px;
  }
  path {
    stroke: ${({ theme }) => theme.PALETTE.gray[300]};
  }
`;
