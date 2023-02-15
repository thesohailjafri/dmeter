import axios from "axios";
import endpoints from "./_endpoints";

export const registerMenuitemApi = async (payload) => {
    try {
        // branchId, menuitem
        return await axios.post(endpoints.menu.index, payload);
    } catch (error) {
        return error.response;
    }
};

export const getMenu = async (payload) => {
    try {
        return await axios.get(endpoints.menu.index, { params: payload });
    } catch (error) {
        return error.response;
    }
};

export const getMenuitem = async (id, payload) => {
    try {
        return await axios.get(endpoints.menu.index + id, payload);
    } catch (error) {
        return error.response;
    }
};

export const deleteMenuitem = async (id) => {
    try {
        return await axios.delete(endpoints.menu.index + id);
    } catch (error) {
        return error.response;
    }
};

export const postMenuCategory = async (payload) => {
    try {
        return await axios.post(endpoints.menu.category, payload);
    } catch (error) {
        return error.response;
    }
};

export const getMenuCategories = async (payload) => {
    try {
        return await axios.get(endpoints.menu.category, { params: payload });
    } catch (error) {
        return error.response;
    }
};

export const deleteMenuCategory = async (id) => {
    try {
        return await axios.delete(endpoints.menu.category + id);
    } catch (error) {
        return error.response;
    }
};
