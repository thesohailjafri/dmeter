import { getMeApi, loginApi } from "./authApi";
import { registerBranchApi, getBranchesApi, getBranchApi, getBranchMenuitemApi } from "./branchApi";
import { registerMenuitemApi, getMenu, getMenuitem, postMenuCategory, getMenuCategories, deleteMenuitem, deleteMenuCategory } from "./menuApi";
import { registerRetaurantApi } from "./restaurantApi";
import { registerStaffApi, getBranchStaffApi, getAllStaffMembers, deleteStaffMember } from "./staffApi";
import { postOrderManual, getOrders, getOrder } from "./orderApi";
export {
    deleteStaffMember,
    deleteMenuCategory,
    deleteMenuitem,
    getBranchMenuitemApi,
    getBranchStaffApi,
    getBranchApi,
    getBranchesApi,
    registerRetaurantApi,
    registerBranchApi,
    registerStaffApi,
    registerMenuitemApi,
    getMeApi,
    loginApi,
    getMenu,
    getMenuitem,
    getAllStaffMembers,
    postMenuCategory,
    getMenuCategories,
    postOrderManual,
    getOrders,
    getOrder,
};
