import api from "./api";

export const loginService = async (formdata) => {
    const response = await api.post("/api/auth/admin/login", formdata);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const currentAdminService = async () => {
    const response = await api.get("/api/auth/admin/me");
    return response.data;
};