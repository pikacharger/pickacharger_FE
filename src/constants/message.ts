const MESSAGE = {
  SYNTAX: {
    USERNAME: "한글 또는 영문으로 2글자 이상 15자 이하로 입력해 주세요.",
    NICKNAME: "한글 또는 영문으로 2글자 이상 10자 이하로 입력해 주세요.",
    PASSWORD: "영문, 숫자를 포함하여 8자 이상 30자 이하로 입력해 주세요.",
    EMAIL: "올바른 이메일 형식을 입력해 주세요.",
    PASSWORDCHECK: "비밀번호가 일치하지 않습니다.",
  },
  SIGNUP: {
    FAILURE: "회원 가입에 실패했습니다.",
    CODE: "코드가 올바르지 않습니다. 다시 시도해주세요.",
    CODE_SUCCESS: "이메일이 인증되었어요.",
    EMAIL: "이미 사용 중인 이메일 입니다.",
    TIMER: "제한 시간이 지났습니다. 다시 인증 요청해주세요.",
    NICKNAME_FAIL: "이미 사용 중인 닉네임 입니다.",
    NICKNAME_SUCCESS: "사용 가능한 닉네임 입니다.",
  },
  REVIEW: {
    SUCCESS: "리뷰가 저장되었어요.",
    FAILURE: "리뷰 저장에 실패했어요.",
    REQUIRE: "필수 입력 항목입니다.",
    DELETE: "삭제 되었어요.",
    CANCEL: "리뷰 작성을 취소할까요?",
  },
  LOGIN: {
    SUCCESS: "로그인 되었어요",
    FAILURE: "이메일 또는 비밀번호가 올바르지 않습니다.",
    ERROR: "로그인에 문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
    REQUIRED: "로그인이 필요한 서비스입니다. 로그인 후에 이용해 주세요.",
  },
  ERROR: {
    DEFAULT: "문제가 발생했어요. 관리자에게 문의해 주세요!",
    EXPIRED: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    WRONG: "잘못된 접근입니다.",
    FILE_SIZE: "사진 사이즈가 너무 큽니다!",
  },
} as const;

export default MESSAGE;
