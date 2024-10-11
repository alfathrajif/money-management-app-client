import instance from "@/lib/axios/instance";
import { IAuthLogin, IAuthRegister } from "@/types";

const authServices = {
  register: (data: IAuthRegister) =>
    instance
      .post("/auth/sign-up", data)
      .then((response) => response.data)
      .catch((err) => err.response.data),

  login: (data: IAuthLogin) =>
    instance
      .post("/auth/login", data)
      .then((response) => response)
      .catch((err) => err.response.data),
};

export default authServices;
