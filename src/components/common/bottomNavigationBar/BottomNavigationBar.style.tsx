import { styled } from "styled-components";
import { bodyContainer, flexSpaceBetweenCenter } from "../../../styles/common";

export const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 68px;
  padding: 12px 20.5px 12px 34.5px;
  z-index: ${({ theme }) => theme.ZINDEX.nav};
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-top: ${({ theme }) => theme.PALETTE.gray[100]} 1px solid;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  color: ${({ theme }) => theme.PALETTE.gray[400]};

  p {
    margin-top: 4px;
  }
  path {
    fill: ${({ theme }) => theme.PALETTE.gray[400]};
  }
  * {
    padding: 0.1rem;
    text-align: center;
  }
  .active {
    color: ${({ theme }) => theme.PALETTE.mainColor};

    path {
      fill: ${({ theme }) => theme.PALETTE.mainColor};
    }
  }
  ${flexSpaceBetweenCenter}
  ${bodyContainer}
`;
