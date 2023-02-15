import axios from "axios";
import endpoints from "./_endpoints";

export const registerRetaurantApi = async (payload) => {
    try {
        return await axios.post(endpoints.restaurant.index, payload);
    } catch (error) {
        return error.response;
    }
};
