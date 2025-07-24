// src/services/activityService.js
import api from "./api";

/*export const generateActivity = async (inputData) => {
  const response = await api.post("/openai/generate", inputData);
  return response.data;
};*/

export const createActivity = async (activityData) => {
  const response = await api.post("/activities", activityData);
  return response.data;
};

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data;
};
