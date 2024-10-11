import instance from "@/lib/axios/instance";

const categoryServices = {
  getCategories: (type: string) =>
    instance
      .get(`/categories`, {
        params: {
          type: type,
        },
      })
      .then((response) => response.data)
      .catch((err) => err.response.data),
};

export default categoryServices;
