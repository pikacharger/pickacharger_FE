import styled from "styled-components";
import {
  flexAlignCenter,
  flexColumn,
  flexSpaceBetweenCenter,
} from "@/styles/common";

const StyledDiv = styled.div`
  padding: 1.5rem;
  border-bottom: 8px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const ChargerContainer = styled.div`
  width: 390px;
  height: 100%;
  margin-top: 56px;
  padding-bottom: 150px;
`;

export const ChargerOverview = styled(StyledDiv)`
  ${flexColumn};
  gap: 8px;
`;

export const ChargerAddress = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const ChargerStatus = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ChargerInfo = styled(StyledDiv)`
  table {
    width: 100%;
    margin: 1rem auto 0;
    table-layout: fixed;
    border-collapse: collapse;
    border-radius: 10px;
    border-style: hidden;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.PALETTE.gray[200]};
  }
  tr {
    border: solid 1px ${({ theme }) => theme.PALETTE.gray[200]};
  }
  th {
    padding: 0.5rem;
    color: ${({ theme }) => theme.PALETTE.gray[400]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
  td {
    padding: 1rem;
    text-align: center;
    div {
      justify-content: center;
    }
    svg {
      width: 18px;
      height: 18px;
      margin-right: 0.3rem;
    }
    span {
      display: block;
      line-height: 1.5;
      font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    }
  }
`;

export const ChargerPrice = styled(StyledDiv)`
  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

export const PriceInfo = styled.div`
  ${flexSpaceBetweenCenter}
  padding-top: 1rem;
  .row {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    > div {
      &:first-of-type {
        margin-bottom: 8px;
      }
    }
  }
  .charging-speed {
    width: 40%;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: ${({ theme }) => theme.PALETTE.black};
  }
  .price-member {
    color: ${({ theme }) => theme.PALETTE.mainColor};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  .price-rate span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  .price-rate div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;
export const StationInfo = styled(StyledDiv)``;

export const StationContent = styled.div`
  margin-top: 1rem;
  div {
    margin: 0 auto;
  }
  p {
    margin: 1rem;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  }
`;

export const ChargerReview = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.PALETTE.white};
  .reviewTitle {
    display: flex;
    justify-content: space-between;
  }
  & a {
    color: ${({ theme }) => theme.PALETTE.mainColor};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-left: 0.4rem;
    }
    path {
      fill: ${({ theme }) => theme.PALETTE.mainColor};
    }
  }
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.PALETTE.black};
`;

export const ButtomList = styled.ul`
  ${flexColumn}
  gap: .5rem;
  margin-bottom: 1.5rem;
`;

export const ButtomItem = styled.li`
  cursor: pointer;
  ${flexAlignCenter}
  gap: 1rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  padding: 3px;
  border-radius: 5px;
  transition: all ease 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
  svg {
    width: 15px;
    height: 15px;
  }
  path {
    fill: ${({ theme }) => theme.PALETTE.black};
  }
`;

export const EmptyReview = styled.div`
  padding-top: 75px;
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  p {
    color: ${({ theme }) => theme.PALETTE.gray[400]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;

export const SubTitle = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.md} !important;
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  margin-bottom: 4px;
`;
