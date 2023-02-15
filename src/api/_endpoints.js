import backend_api from "./_backend_api";

const endpoints = {
    auth: {
        index: `${backend_api}/auth/`,
    },
    restaurant: {
        index: `${backend_api}/restaurant/`,
    },
    branch: {
        index: `${backend_api}/branch/`,
        menu: `${backend_api}/branch/menu/`,
    },
    staff: {
        index: `${backend_api}/staff/`,
    },
    order: {
        index: `${backend_api}/order/`,
    },
    menu: {
        index: `${backend_api}/menu/`,
        category: `${backend_api}/menu/category/`,
    },
};
export default endpoints;
