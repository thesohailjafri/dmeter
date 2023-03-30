import { atom } from "recoil";

export const orderTypeOptionsAtom = atom({
    key: "orderTypeOptionsAtom",
    default: ["Dine", "Takeaway", "Delivery", "Pre-Order", "Other"],
});

export const orderSourceOptionsAtom = atom({
    key: "orderSourceOptionsAtom",
    default: ["Organic", "Zomato", "Swiggy", "Magic-Pin", "Other"],
});

export const orderPaymentModeOptionsAtom = atom({
    key: "orderPaymentModeOptionsAtom",
    default: ["Cash", "Credit/Debit Card", "Online Transaction", "Other"],
});

export const orderStatusAllOptionsAtom = atom({
    key: "orderStatusAllOptionsAtom",
    default: ["Placed", "Processed", "Preparing", "Ready", "Completed", "Cancelled", "Refunded"],
});

export const orderStatusStaffOptionsAtom = atom({
    key: "orderStatusStaffOptionsAtom",
    default: ["Placed", "Processed", "Preparing", "Ready", "Out-For-Delivery", "Completed"],
});

export const orderStatusCookOptionsAtom = atom({
    key: "orderStatusCookOptionsAtom",
    default: ["Preparing", "Ready"],
});
