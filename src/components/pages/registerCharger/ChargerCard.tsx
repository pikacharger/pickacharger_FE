import Button from "@/components/common/button/Button";
import { ICard } from "@/pages/registerCharger/RegisterCharger";
import { flexAlignCenter, flexColumn } from "@/styles/common";
import React from "react";
import styled from "styled-components";

export interface ChargerCardProps extends ICard {
  onClick: (id: string) => void;
}

export default function ChargerCard({
  id,
  speed,
  kw,
  fare,
  chargerType,
  onClick,
}: ChargerCardProps) {
  return (
    <Card>
      <List>
        <Item>
          <Name>충전속도</Name>
          <Value>{speed === "급속" ? `${speed} ${kw}kW` : speed}</Value>
        </Item>
        <Item>
          <Name>요금</Name>
          <Value>{`${fare}원`}</Value>
        </Item>
        <Item>
          <Name>충전기 타입</Name>
          <Value>{chargerType}</Value>
        </Item>
      </List>
      <Button size="full" category="retry" onClick={() => onClick(id)}>
        삭제
      </Button>
    </Card>
  );
}

const Card = styled.div`
  width: 340px;
  height: 140px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
  border-radius: 5px;
  ${flexColumn}
  justify-content: center;
`;

const List = styled.ul`
  ${flexColumn};
  padding-bottom: 16px;
  gap: 8px;
`;

const Item = styled.li`
  ${flexAlignCenter};
`;

const Name = styled.span`
  width: 80px;
  color: ${({ theme }) => theme.PALETTE.mainColor};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

const Value = styled.span`
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
`;
