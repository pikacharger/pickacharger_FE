import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import EmptyLikeIcon from "../icons/EmptyLikeIcon";

export default function EmptyLikeIconBtn({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...rest}>
      <EmptyLikeIcon />
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
