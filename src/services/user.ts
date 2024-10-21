import instance from "@/lib/axios/instance";

const userServices = {
  getProfile: () =>
    instance
      .get(`/users/profile`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default userServices;
