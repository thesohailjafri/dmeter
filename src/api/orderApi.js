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

export const getOrder = async (id, query) => {
    try {
        return await axios.get(endpoints.order.index + id, { params: query });
    } catch (error) {
        return error.response;
    }
};

export const updateOrder = async (id, payload) => {
    try {
        return await axios.patch(endpoints.order.index + id, payload);
    } catch (error) {
        return error.response;
    }
};
