import styled, { css } from "styled-components";

const borderType = {
  full: css`
    border: ${({ theme }) => theme.PALETTE.gray[200]} 0.1rem solid;
    border-radius: 1rem;
    padding: 1rem;
  `,
  bottom: css`
    border-bottom: ${({ theme }) => theme.PALETTE.gray[200]} 0.1rem solid;
  `,
};

export const ChargingContainer = styled.div<{ border: "full" | "bottom" }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  /* margin: 0.8rem; */
  cursor: pointer;
  ${({ border }) => borderType[border]}
  & .iconDiv {
    margin: 0.5rem;
  }
`;

export const ChargingContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  & .chargingTitle {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  & .starDiv {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.PALETTE.black};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    svg {
      width: 1.4rem;
    }
    path {
      fill: ${({ theme }) => theme.PALETTE.mainColor};
    }
  }
`;

export const ChargingAddress = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[300]};
  margin-bottom: 6px;
`;

export const ChargingStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  .type {
    margin-left: 8px;
    color: ${({ theme }) => theme.PALETTE.black};
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  }
`;
