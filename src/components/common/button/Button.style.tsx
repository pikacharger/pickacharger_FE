import styled, { css } from "styled-components";
import { ObjMap } from "./Button";

const BUTTON_CATEGORY: ObjMap = {
  nomal: css`
    background-color: ${({ theme }) => theme.PALETTE.mainColor};
    color: ${({ theme }) => theme.PALETTE.white};
  `,
  kakao: css`
    background-color: #f7e317;
    color: #3c1e1e;
  `,
  google: css`
    background-color: ${({ theme }) => theme.PALETTE.white};
    color: #3c1e1e;
  `,
  retry: css`
    background-color: ${({ theme }) => theme.PALETTE.primary[100]};
    color: ${({ theme }) => theme.PALETTE.mainColor};
  `,
  disable: css`
    background-color: ${({ theme }) => theme.PALETTE.gray[100]};
    color: ${({ theme }) => theme.PALETTE.gray[200]};
  `,
  outline: css`
    border-color: ${({ theme }) => theme.PALETTE.mainColor};
    background-color: ${({ theme }) => theme.PALETTE.white};
    color: ${({ theme }) => theme.PALETTE.mainColor};
  `,
  rounded: css`
    border-color: ${({ theme }) => theme.PALETTE.gray[300]};
    background-color: ${({ theme }) => theme.PALETTE.white};
    color: ${({ theme }) => theme.PALETTE.black};
    border-radius: 100px;
  `,
};

const BUTTON_SIZE: ObjMap = {
  big: css`
    width: 341px;
    height: 44px;
  `,
  Medium: css`
    width: 134px;
    height: 35px;
  `,
  small: css`
    width: 80px;
    height: 42px;
  `,
};

export const Btn = styled.button<{ size: string; category: string }>`
  border: 1px solid transparent;
  border-radius: 5px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ size }) => size && BUTTON_SIZE[size]};
  ${({ category }) => category && BUTTON_CATEGORY[category]};
  &:hover {
    opacity: 0.8;
  }
`;
