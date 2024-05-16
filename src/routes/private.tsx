/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TokenService from "@/utils/tokenService";
import { useToggle } from "@/hooks/useToggle";
import PrivateConfirm from "@/components/common/privateConfirm/PrivateConfirm";

interface Props {
  children: ReactNode;
}

export default function Private({ children }: Props) {
  const { open, close, isOpen } = useToggle(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = TokenService.getToken();

  useEffect(() => {
    if (!token) {
      open();
      return;
    }
  }, [location.pathname]);

  const handleCancel = () => {
    close();
    navigate("/");
  };

  const handleGoLogin = () => {
    navigate("/login");
    close();
  };

  return (
    <Fragment>
      {isOpen && (
        <PrivateConfirm
          confirmHandler={handleGoLogin}
          cancelHandler={handleCancel}
        />
      )}
      {children}
    </Fragment>
  );
}
