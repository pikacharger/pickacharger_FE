import styled, { css } from "styled-components";

const MENU_SHAPE = {
  fullRectangle: css`
    justify-content: flex-end;
    flex-direction: row-reverse;
    align-items: center;
    gap: 16px;
    width: 340px;
    svg {
      width: 12px;
      height: 20px;
    }
  `,
  halfSquare: css`
    height: 92%;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    svg {
      width: 35px;
      height: 35px;
    }
  `,
  halfRectangle: css`
    justify-content: space-between;
    svg {
      width: 15px;
      height: 15px;
    }
  `,
};

export const MenuContainer = styled.div<{
  shape: "fullRectangle" | "halfSquare" | "halfRectangle";
}>`
  display: flex;
  background-color: ${({ theme }) => theme.PALETTE.gray[50]};
  border-radius: 0.625rem;
  padding: 1rem;
  ${({ shape }) => MENU_SHAPE[shape]};
  color: ${({ theme }) => theme.PALETTE.black};
  path {
    fill: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;

export const MenuTitle = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  margin-bottom: 0.5rem;
`;

export const Menudesc = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`;
