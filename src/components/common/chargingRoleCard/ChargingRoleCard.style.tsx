import styled, { css } from "styled-components";

const chargeRole = {
  public: css`
    color: ${({ theme }) => theme.PALETTE.mainColor};
  `,
  individual: css`
    background-color: ${({ theme }) => theme.PALETTE.mainColor};
    color: ${({ theme }) => theme.PALETTE.white};
  `,
};
export const RoleContainer = styled.div<{ role: "public" | "individual" }>`
  width: 31px;
  height: 19px;
  border-radius: 0.25rem;
  text-align: center;
  padding: 0.2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.es};
  border: ${({ theme }) => theme.PALETTE.mainColor} 0.1rem solid;
  ${({ role }) => chargeRole[role]};
`;
