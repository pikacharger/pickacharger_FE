const REGEX = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: /^[가-힣a-zA-Z]{2,15}$/,
  nickname: /^[가-힣a-zA-Z]{2,15}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
};
export default REGEX;
