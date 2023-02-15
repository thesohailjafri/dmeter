import { atom } from "recoil";

export const orderTypeOptionsAtom = atom({
    key: "orderTypeOptionsAtom",
    default: ["In-House", "Takeaway", "Delivery", "Pre-Order", "Other"],
});

export const orderSourceOptionsAtom = atom({
    key: "orderSourceOptionsAtom",
    default: ["Organic", "Zomato", "Swiggy", "Magic-Pin", "Other"],
});

export const orderPaymentModeOptionsAtom = atom({
    key: "orderPaymentModeOptionsAtom",
    default: ["Cash", "Credit/Debit Card", "Online Transaction", "Other"],
});
