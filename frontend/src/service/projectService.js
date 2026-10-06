import api from "./api";

export const uploadProjectService = async (formData) => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("summary", formData.summary);
    form.append("description", formData.description);
    form.append("skills", formData.skills);
    form.append("github", formData.github);
    if (formData.live) {
        form.append("live", formData.live);
    }
    form.append("image", formData.image);

    const response = await api.post("/api/project", form);
    return response.data;
};

export const getProjectsService = async () => {
    const response = await api.get("/api/project");
    return response.data.projects;
};