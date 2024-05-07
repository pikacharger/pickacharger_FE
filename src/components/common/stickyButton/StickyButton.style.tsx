import styled from "styled-components";

interface Props {
  disabled: boolean;
}

export const Container = styled.button<Props>`
  position: fixed;
  // 하단 네비게이션 높이값
  bottom: 68px;
  left: 50%;
  transform: translate(-50%);
  width: 390px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  z-index: ${({ theme }) => theme.ZINDEX.nav};
  padding: 1rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.PALETTE.gray[100] : theme.PALETTE.mainColor};
`;

export const BtnText = styled.p<Props>`
  text-align: center;
  color: ${({ theme, disabled }) =>
    disabled ? theme.PALETTE.gray[300] : theme.PALETTE.white};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;
