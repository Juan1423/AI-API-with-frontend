import api from "./api";

export const getChildren = async () => {
  const response = await api.get("/children");
  return response.data;
};
