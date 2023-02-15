import axios from "axios";
import endpoints from "./_endpoints";

export const registerStaffApi = async (payload) => {
    try {
        return await axios.post(endpoints.staff.index, payload);
    } catch (error) {
        return error.response;
    }
};

export const getBranchStaffApi = async (id) => {
    try {
        return await axios.get(endpoints.staff.index + id);
    } catch (error) {
        return error.response;
    }
};

export const getAllStaffMembers = async () => {
    try {
        return await axios.get(endpoints.staff.index);
    } catch (error) {
        return error.response;
    }
};

export const deleteStaffMember = async (id) => {
    try {
        return await axios.delete(endpoints.staff.index + id);
    } catch (error) {
        return error.response;
    }
};
