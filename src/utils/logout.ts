import TokenService from "./tokenService";

const logout = () => {
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  TokenService.removeToken();
};

export default logout;
