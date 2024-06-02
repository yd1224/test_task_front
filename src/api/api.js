import axios from "axios";

axios.defaults.baseURL = "https://test-task-back.onrender.com";

export const searchContact = async ({ email, phone }) => {
    try {
        const params = { email, ...(phone && { number: phone }) };

        const res = await axios.get("/api/contacts", { params });

        return res.data;
    } catch (error) {
        console.log(error);
    }
}
