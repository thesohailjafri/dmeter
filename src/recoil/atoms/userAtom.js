import { atom } from "recoil";

export const userEmailAtom = atom({
    key: "userEmail",
    default: "",
});

export const userPositionAtom = atom({
    key: "userPosition",
    default: "",
});

export const userFirstnameAtom = atom({
    key: "userFirstname",
    default: "",
});

export const userLastnameAtom = atom({
    key: "userLastname",
    default: "",
});

export const userPhoneAtom = atom({
    key: "userPhone",
    default: "",
});

export const userAltPhoneAtom = atom({
    key: "userAltPhone",
    default: "",
});

export const userIdAtom = atom({
    key: "userId",
    default: "",
});

export const userRestaurantIdAtom = atom({
    key: "userRestaurantId",
    default: "",
});

export const userRestaurantNameAtom = atom({
    key: "userRestaurantName",
    default: "",
});

export const userBranchIdAtom = atom({
    key: "userBranchIdAtom",
    default: "",
});

export const userPositionOptionsAtom = atom({
    key: "userPositionOptionsAtom",
    default: ["owner", "manager", "cook", "staff"],
});
