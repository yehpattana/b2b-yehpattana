"use client";
import * as React from "react";
import { useState } from "react";
import { data } from "../../../utils/mockData";
import { PageHero } from "../../../component/layouts/PageHero";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrdersTable from "../../../component/Orders";
import CartTable from "../../../component/CartTable";
import OrderTableReseller from "../../../component/OrderTable";
import { apiService } from "../../../config/axios/axios-interceptor";
import { useRecoilState } from "recoil";
import { cartState } from "../../../recoil/atoms/recoilState";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface PanelProp {
  stock: number;
}
interface titleI {
  title: string;
  text: string;
}

const EmptyCart = ({ title, text }: titleI) => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center">
      <h1 className="text-2xl text-gray">{title}</h1>
      <p>{`you have no ${text} shipping cart`}</p>
    </div>
  );
};
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ResellerPanel() {
  const router = useRouter()
  const [cart] = useRecoilState(cartState);
  const [value, setValue] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [company, setCompany] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchOrder = async () => {
    if (customerId) {
      const { data } = await apiService.get(`order/${customerId}`);
      if (data) setTotalOrder(data.length);
    }
  };
  const Card = ({ stock }: PanelProp) => {
    return <div className="w-40 h-28 p-3 bg-white text-5xl"> {stock}</div>;
  };
  React.useEffect(() => {
    if (window !== undefined) {
      setCustomerId(localStorage.getItem("customer_id"));
      setCompany(localStorage.getItem("user_company"))
    }
    setCartLength(cart?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);
  return (
    <>
      {/* Resell panel start */}
      <div className="bg-white p-12">
        <h1 className="font-semibold text-xl">Reseller</h1>
        <Box sx={{ width: "100%", color: "black", height: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                icon={<Card stock={cartLength} />}
                label="PRODUCTS IN CART"
                {...a11yProps(0)}
                sx={{
                  border: 1,
                  borderColor: "gray",
                  margin: 2,
                  height: 140,
                  width: 163,
                }}
              />

              <Tab
                icon={<Card stock={totalOrder} />}
                label="ORDERS"
                {...a11yProps(2)}
                sx={{
                  border: 1,
                  borderColor: "gray",
                  margin: 2,
                  height: 140,
                  width: 163,
                }}
              />
              {/* <Tab
                icon={<Card stock={0} />}
                label="QUOTATION"
                {...a11yProps(3)}
                sx={{
                  border: 1,
                  borderColor: "gray",
                  margin: 2,
                  height: 140,
                  width: 163,
                }}
              /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <CartTable />
            <Box className="flex justify-end mt-5">
              <Button className="bg-primary text-white" onClick={()=>router.push(`/${company}/cart`)}>Go To Cart</Button>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OrderTableReseller />
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={2}>
            <EmptyCart title="QUOTATION" text="quotation" />
          </CustomTabPanel> */}
        </Box>
      </div>
    </>
  );
}
