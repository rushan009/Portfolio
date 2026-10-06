import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const getSkillsService = async () => {
  const response = await api.get("/api/skill");
  return response.data.skills;
};

export const setSkillService = async (formData) => {
  const response = await api.post("/api/skill", formData);
  return response.data;
};