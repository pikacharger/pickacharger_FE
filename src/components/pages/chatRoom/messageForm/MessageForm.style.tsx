import styled from "styled-components";
import { flexAlignCenter } from "@/styles/common";

export const Form = styled.form`
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  ${flexAlignCenter};
  padding: 16px 24px;
  width: 100%;
  max-width: 390px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 68px;
`;

export const Input = styled.input`
  flex: 1;
  border-radius: 20px;
  padding: 8px 16px;
  height: 32px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.black};
  &::placeholder {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
    color: ${({ theme }) => theme.PALETTE.gray[400]};
  }
`;

export const SubmitButton = styled.button`
  margin-left: 8px;
  cursor: pointer;
  background-color: transparent;
  height: 32px;
`;

export const Svg = styled.svg`
  width: 19px;
  height: 16px;
`;
