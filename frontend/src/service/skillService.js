import api from "./api";

export const getSkillsService = async () => {
    const response = await api.get("/api/skill");
    return response.data.skills;
};

export const setSkillService = async (formData) => {
    const response = await api.post("/api/skill", formData);
    return response.data;
};