import styled, { css } from "styled-components";

const chargingStatus = {
  available: css`
    color: ${({ theme }) => theme.PALETTE.yellow};
    path {
      fill: ${({ theme }) => theme.PALETTE.yellow};
    }
  `,
  restriction: css`
    color: ${({ theme }) => theme.PALETTE.gray[300]};
    path {
      fill: ${({ theme }) => theme.PALETTE.gray[300]};
    }
  `,
};

export const StatusContainer = styled.div<{
  status: "available" | "restriction";
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ status }) => chargingStatus[status]}
`;
