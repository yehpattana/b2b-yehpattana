// utils/recoilState.ts
"use client";
import { DefaultValue, atom } from "recoil";
import { Quantity } from "../../component/Spinner";
import { ProducDetail } from "../../app/[customerName]/products/type";
type Stock = {
  rrp_price: number;
  id: string;
  product_id: string;
  size: string;
  size_remark: string;
  quantity: number;
  price: number;
  item_status: string;
  created_at: string;
  updated_at: string;
};
type CartState = {
  sex?: string;
  name: string;
  type?: string;
  piece?: number;
  color: string;
  quantity: Quantity;
  price?: Stock[];
  onePrice?:number
};
export type ProductDetailWithCartState = ProducDetail & CartState;
export const counterState = atom({
  key: "counterState",
  default: 0,
});
export const userDetail = atom({
  key: "userState",
  default: {},
});
export const languageDropdown = atom({
  key: "isLangguageDrop",
  default: false,
});

const localStorageCartKey = "cartState";
let storedCartState = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  storedCartState = window?.localStorage.getItem(localStorageCartKey);
}
const initialCartState: ProductDetailWithCartState[] = storedCartState
  ? JSON.parse(storedCartState)
  : [];

export const cartState = atom<ProductDetailWithCartState[]>({
  key: "cartState",
  default: initialCartState,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue instanceof DefaultValue) return;
        localStorage.setItem(localStorageCartKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const shipping = atom({
  key: "shipping",
  default: "",
});

export const typePriceState = atom({
  key: "typePriceState",
  default: "WSP",
});