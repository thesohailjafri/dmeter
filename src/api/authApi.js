import axios from "axios";
import endpoints from "./_endpoints";

export const loginApi = async (payload) => {
    try {
        return await axios.post(endpoints.auth.index, payload);
    } catch (error) {
        return error.response;
    }
};

export const getMeApi = async () => {
    try {
        return await axios.get(endpoints.auth.index);
    } catch (error) {
        return error.response;
    }
};
