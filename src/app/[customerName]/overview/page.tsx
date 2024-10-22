"use client";
import { useRecoilState } from "recoil";
import { cartState, shipping } from "../../../recoil/atoms/recoilState";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { apiService } from "../../../config/axios/axios-interceptor";
import { toastError, toastSuccess } from "../../../component/Toast";
import CartTable from "../../../component/CartTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Overview() {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartState);
  const [shippingAddress,setShippingAddress] = useRecoilState(shipping);
  const [customerId, setCustomerId] = useState("");
  const [company, setCompany] = useState("");

  const submitOrder = async () => {
    const storeTotalAmount = localStorage.getItem("total_amount");
    const { data } = await apiService.post("order", {
      company_name:company,
      shipping_address:shippingAddress,
      order_detail: JSON.stringify(cart),
      customer_id: parseInt(customerId),
      total_amount: storeTotalAmount,
    });
    if (data.success) {
      setCart([]);
      // setShippingAddress('')
      router.push(`/${company}/resellerPanel`);
      toastSuccess("Create Order Success");
    } else {
      toastError("Cannot Order Please contract call center");
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedCustomerId = localStorage.getItem("customer_id");
      const storeCompany = localStorage.getItem("user_company");

      if (storedCustomerId) {
        setCustomerId(storedCustomerId);
      }
      if (storeCompany) {
        setCompany(storeCompany);
      }
    }
  }, []);
  return (
    <div className="min-h-screen p-10 pt-10 relative">
      <h1 className="font-bold text-2xl mb-5">ORDER SUMMARY</h1>
      <CartTable />
      <FormControl className="mt-5">
        <RadioGroup defaultValue="solid" name="radio-buttons-group">
          <FormControlLabel
            value="solid"
            control={<Radio color="primary"/>}
            label="Ship the order only when all products are available"
          />
          <FormControlLabel
            value="plain"
            control={<Radio />}
            label="Send products available now and the rest when possible (higher shipping costs may be expected)"
          />
        </RadioGroup>
      </FormControl>
      <Box className="flex items-center justify-end mt-5">
        <Button
          className="rounded border-2 bg-primary w-1/6 text-white mt-4"
          onClick={submitOrder}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
