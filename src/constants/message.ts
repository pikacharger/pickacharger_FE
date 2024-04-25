const MESSAGE = {
  SYNTAX: {
    NAME: "한글 또는 영문으로 2글자 이상 15자 이하로 입력해 주세요.",
    NICKNAME: "한글 또는 영문으로 2글자 이상 15자 이하로 입력해 주세요.",
    PASSWORD:
      "영문, 숫자, 특수 문자(@$!%*?&)를 포함하여 8자 이상 30자 이하로 입력해 주세요.",
    EMAIL: "올바른 이메일 형식을 입력해 주세요.",
    CODE: "인증 코드가 올바르지 않습니다.",
    PASSWORDCHECK: "비밀번호가 일치하지 않습니다.",
  },
  SIGNUP: {
    FAILURE: "회원 가입에 실패했습니다.",
  },
  LOGIN: {
    FAILURE: "이메일 또는 비밀번호가 올바르지 않습니다.",
    ERROR: "로그인에 문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
    REQUIRED: "로그인이 필요한 서비스입니다. 로그인 후에 이용해 주세요.",
  },
  ERROR: {
    DEFAULT: "다시 시도해 주세요!",
    EXPIRED: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    WRONG: "잘못된 접근입니다.",
  },
} as const;

export default MESSAGE;
