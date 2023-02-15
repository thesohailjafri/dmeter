import { atom } from "recoil";

export const layoutModeAtom = atom({
    key: "layoutMode",
    default: "static",
});

export const layoutColorModeAtom = atom({
    key: "layoutColorMode",
    default: "light",
});

export const themeAtom = atom({
    key: "theme",
    default: "saga-orange",
});

export const inputStyleAtom = atom({
    key: "inputStyle",
    default: "outlined",
});

export const staticMenuInactiveAtom = atom({
    key: "staticMenuInactive",
    default: false,
});

export const overlayMenuActiveAtom = atom({
    key: "overlayMenuActive",
    default: false,
});

export const mobileMenuActiveAtom = atom({
    key: "mobileMenuActive",
    default: false,
});

export const mobileTopbarMenuActiveAtom = atom({
    key: "mobileTopbarMenuActive",
    default: false,
});
