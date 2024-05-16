import { flexSpaceBetweenCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 56px;
  height: 100%;
  padding: 24px;
`;

export const UserInfo = styled.div`
  ${flexColumn};
  gap: 1rem;
  margin-bottom: 2rem;

  .info-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 3.9375rem;
      height: 3.9375rem;
      border-radius: 999px;
      object-fit: cover;
    }
  }
  .info-content {
  }
  .user-name {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: ${({ theme }) => theme.PALETTE.black};
    margin-bottom: 0.25rem;
  }
  .user-email {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.gray[300]};
  }
  .info-link {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.4rem;
    border: 0.1rem solid ${({ theme }) => theme.PALETTE.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
    color: ${({ theme }) => theme.PALETTE.black};
    text-align: center;
    cursor: pointer;
  }
`;

export const MenuTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    width: 15px;
    height: 15px;
    margin-right: 0.4rem;
  }
  path {
    fill: ${({ theme }) => theme.PALETTE.gray[400]};
  }
`;

export const UserMenu = styled.div`
  border-radius: 0.3125rem;
  margin-bottom: 1.5rem;
  border: 0.1rem solid ${({ theme }) => theme.PALETTE.gray[100]};
  padding: 1.25rem 1.5rem;
  hr {
    width: 100%;
    margin: 16px auto;
    background: ${({ theme }) => theme.PALETTE.gray[100]};
    height: 0.1rem;
    border: 0;
  }
  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
    ${flexSpaceBetweenCenter}
    display: flex;
  }
`;
