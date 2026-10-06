import api from "./api";

export const getResumeService = async () => {
    const response = await api.get("/api/resume");
    return response.data.resume;
};

export const uploadResumeService = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post("/api/resume", formData);
    return response.data.resume;
};

export const resumeDownloadUrl = `${api.defaults.baseURL}/api/resume/download`;