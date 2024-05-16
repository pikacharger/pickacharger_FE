const PALETTE = {
  mainColor: "#02C0C0",
  white: "#FFFFFF",
  black: "#000000",
  yellow: "#FDB022",
  error: "#FC5252",
  lightRed: "#FFE6E6",
  gray: {
    50: "#FAFAFA",
    100: "#EEEEEE",
    200: "#d9d9d9",
    300: "#ccc",
    400: "#585858",
  },
  primary: {
    100: "#e7f9f9",
    200: "#45d9d4",
  },
};

const calRem = (size: number) => `${size / 16}rem`;

const FONT_SIZE = {
  es: calRem(10),
  xs: calRem(12),
  sm: calRem(14),
  md: calRem(16),
  lg: calRem(18),
};

const FONT_WEIGHT = {
  light: 100,
  regular: 400,
  medium: 500,
  bold: 700,
};

const ZINDEX = {
  nav: 50,
  overLay: 100,
  confirm: 1000,
  toast: 9999,
};

const theme = {
  PALETTE,
  FONT_SIZE,
  FONT_WEIGHT,
  ZINDEX,
};

export default theme;
