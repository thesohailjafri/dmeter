import axios from "axios";
import endpoints from "./_endpoints";

export const registerBranchApi = async (payload) => {
    try {
        return await axios.post(endpoints.branch.index, payload);
    } catch (error) {
        return error.response;
    }
};

export const getBranchesApi = async (payload) => {
    try {
        return await axios.get(endpoints.branch.index, {
            params: payload,
        });
    } catch (error) {
        return error.response;
    }
};

export const getBranchApi = async (id) => {
    try {
        return await axios.get(endpoints.branch.index + id);
    } catch (error) {
        return error.response;
    }
};

export const getBranchMenuitemApi = async (id) => {
    try {
        return await axios.post(endpoints.branch.menu + id);
    } catch (error) {
        return error.response;
    }
};
