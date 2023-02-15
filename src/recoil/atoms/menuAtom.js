import { atom } from "recoil";

export const menuDietOptionsAtom = atom({
    key: "menuDietOptions",
    default: ["Veg", "Non-Veg", "Jain-Diet"],
});

export const menuDiscountOptionsAtom = atom({
    key: "menuDiscountOptions",
    default: ["Percent", "Amount"],
});

export const menuQuantityOptionsAtom = atom({
    key: "menuQuantityOptions",
    default: ["Quarter", "Half", "Full", "1 Piece", "2 Pieces", "3 Pieces", "4 Pieces"],
});
