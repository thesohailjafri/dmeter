import axios from "axios";
import endpoints from "./_endpoints";

export const postOrderManual = async (payload) => {
    try {
        return await axios.post(endpoints.order.index, payload);
    } catch (error) {
        return error.response;
    }
};

export const getOrders = async (payload) => {
    try {
        return await axios.get(endpoints.order.index, { params: payload });
    } catch (error) {
        return error.response;
    }
};
