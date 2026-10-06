import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});
export const loginService = async (formdata) => {
    const response = await api.post("/api/auth/admin/login", formdata);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    
    return response.data;
}

export const currentAdminService = async () => {
    const response = await api.get("/api/auth/admin/me");
    console.log(response.data);
    return response.data;
}
