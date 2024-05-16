import { api } from "./@config";
import { UserInfoRequest } from "@/types";

const userApi = {
  signup(data: UserInfoRequest) {
    return api.post("/user/signup", data).then((response) => response.data);
  },
  checkUserNickName(data: string) {
    return api
      .get(`/user/check/nickname/${data}`)
      .then((response) => response.data);
  },
  login(data: { email: string; password: string }) {
    return api.post("/user/signin", data).then((response) => response.data);
  },
  postCreateAccessByRefresh() {
    return api
      .post("/user/createAccessByRefresh")
      .then((response) => response.data);
  },
  getUserInfo() {
    return api.get("/user/info").then((response) => response.data);
  },
  sendMail(data: { email: string }) {
    return api.post("/mailSend", data).then((response) => response.data);
  },
  checkAuthMail(data: { email: string; authNum: string }) {
    return api.post("/mailauthCheck", data).then((response) => response.data);
  },
};

export default userApi;

// const userApi = {
//   async signup(data: UserType): Promise<RESPONSE_TYPE> {
//     return await api.post("/user/signUp", data).then((response: {data: RESPONSE_TYPE}) => response.data);
//   },

//   async login(data: { email: string; password: string }): Promise<RESPONSE_TYPE> {
//     return await api.post("/user/login", data).then((response: {data: RESPONSE_TYPE}) => response.data);
//   },
// };
