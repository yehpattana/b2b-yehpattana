"use client";

import React, { useRef, useEffect, forwardRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { apiService } from "../../../config/axios/axios-interceptor";
import { Quantity } from "../../../component/Spinner";

interface TemplateProps {
  orderId: string;
}
interface User {
  email: string;
  contact_name: string;
  company_name: string;
  vat_number: string;
  phone_number: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  country: string;
  message: string;
}

const Template = forwardRef<HTMLDivElement, TemplateProps>(
  ({ orderId }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState<User>();

    const fetchOrder = async (customerId) => {
      const { data } = await apiService.get(`order/${customerId}/${orderId}`);
      if (data) setOrders(data);
    };
    const fetchUserDetail = async (userId) => {
      const { data } = await apiService.get(`users/${userId}`);
      if (data) setUser(data);
    };

    useEffect(() => {
      if (typeof window !== "undefined") {
        const customerId = localStorage.getItem("customer_id");
        const userId = localStorage.getItem("user_id");
        fetchOrder(customerId);
        fetchUserDetail(userId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Set A2 dimensions
        canvas.width = 594; // in millimeters
        canvas.height = 420; // in millimeters

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Scale to match A2 dimensions
          const scale = canvas.width / 420; // Assuming 1 millimeter = 1 unit in canvas

          ctx.scale(scale, scale);

          // Draw your shapes
          ctx.beginPath();
          ctx.arc(95, 50, 40, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fillStyle = "rgb(200, 0, 0)";
          ctx.fillRect(85, 40, 20, 20);
          ctx.save();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="a2-horizontal w-screen p-2" ref={ref}>
        <div className="flex flex-col items-center justify-center">
          <header className=" text-sm font-bold">YEHPATTANA INNOVATION</header>
          <h1 className=" text-xs font-bold underline">PROFORMA INVOICE</h1>
        </div>
        <p className=" text-xs font-bold leading-none">BULK</p>
        <div className="flex items-center w-full leading-3">
          <div className="w-2/5 mr-[10%]">
            <div>
              <span className="mr-10">Ref No.:</span>
              <span>-</span>
            </div>
            <p>
              for account and risk of Messr: 243 หมู่ที่ 2 ซอยวิรุณราษฎร์ Tambon
              Om Noi, Krathum Baen District, Samut Sakhon 74130
            </p>
            <p>VAT No.: 1234567890</p>
            <div className="flex">
              <p className="mr-2">TEL: 081-822-8282</p>
              <p>FAX: 02-222-2222</p>
            </div>
            <div className="flex">
              <p className="mr-2 underline">ATTN:</p>
            </div>
            <div className="flex">
              <p className="mr-10">against P.O. ref no.</p>
              <p>vfl120393</p>
            </div>
            <div className="flex">
              <p className="mr-24">Account ref</p>
              <p>vfl120393</p>
            </div>
          </div>
          <div className="w-2/5">
            <div>
              <span className="mr-10">Date:</span>
              <span>{moment().format("DD/MM/YYYY")}</span>
            </div>
            <p>
              Ship to: {user?.company_name} {user?.address}
            </p>
            <div className="flex">
              <p className="mr-2">TEL: {user?.phone_number}</p>
            </div>
            {/* <div className="flex">
            <p className="mr-2">Season: </p>
            <p>Buy: {user.</p>
          </div> */}
            <p>Require Date by Customer:</p>
            <p>Confirm Delivery Date:</p>
          </div>
        </div>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead className="border">
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  width: "5%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                No
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "45%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                ORDER DETAIL
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                QUANTITY <br /> Pack
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                UNIT PRICE <br /> PER Pack
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                DISCOUNT
                <br />%
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                NET
                <br />
                UNIT PRICE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders?.map((order, i) => {
                const detail = JSON.parse(order.order_detail);
                return detail.map((d, index) => {
                  const calculateTotal = () => {
                    if (d?.type === "RRP") {
                      return Object.keys(d.quantity).reduce((total, size) => {
                        const qty = d.quantity[size as keyof Quantity];
                        const price =
                          d?.price?.find((p) => p.size === size)?.rrp_price ||
                          d?.onePrice ||
                          0;
                        return total + qty * price;
                      }, 0);
                    } else {
                      return Object.keys(d.quantity).reduce((total, size) => {
                        const qty = d.quantity[size as keyof Quantity];
                        const price =
                          d?.price?.find((p) => p.size === size)?.price ||
                          d?.onePrice ||
                          0;
                        return total + qty * price;
                      }, 0);
                    }
                  };
                  const calculateQuantity = () => {
                    return Object.keys(d.quantity).reduce((total, size) => {
                      const qty = d.quantity[size as keyof Quantity];
                      return total + qty;
                    }, 0);
                  };
                  const calculateUnitPricePerPack = () => {
                    return Object.keys(d.quantity).map(
                      (key) =>
                        d.quantity[key] !== 0 && (
                          <div key={key + i} className=" flex items-center">
                            <span className="text-center w-12 text-gray-500 mr-2">
                              {key} :{" "}
                            </span>
                            <span className="text-center text-gray-500">
                              {d?.type === "RRP"
                                ? d?.onePrice * d.quantity[key] ||
                                  d?.price?.find((p) => p.size === key)
                                    ?.rrp_price * d.quantity[key]
                                : d?.onePrice * d.quantity[key] ||
                                  d?.price?.find((p) => p.size === key)?.price *
                                    d.quantity[key]}
                            </span>
                          </div>
                        )
                    );
                  };
                  const calculateUnitPrice = () => {
                    return Object.keys(d.quantity).map(
                      (key) =>
                        d.quantity[key] !== 0 && (
                          <div key={key + i} className=" flex items-center">
                            <span className="text-center w-12 text-gray-500 mr-2">
                              {key} :{" "}
                            </span>
                            <span className="text-center text-gray-500">
                              {d?.type === "RRP"
                                ? d?.onePrice ||
                                  d?.price?.find((p) => p.size === key)
                                    ?.rrp_price
                                : d?.onePrice ||
                                  d?.price?.find((p) => p.size === key)?.price}
                            </span>
                          </div>
                        )
                    );
                  };

                  return (
                    <TableRow key={index}>
                      <TableCell align="left" sx={{ width: "5%" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "45%" }}>
                        <div key={order.name + i} className="flex flex-col">
                          <div className="flex mb-3">
                            <p>Product:</p>
                            <div className="ml-5">
                              <p>
                                {d?.product_varaints?.[0]?.product_code || "-"}
                              </p>
                              <p>{d.name}</p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span>Color: </span>
                            <span>{d.color}</span>
                          </div>

                          <p>Size:</p>
                          <div>
                            <div className="flex">
                              {Object.keys(d.quantity).map((key) => {
                                const isQuantity = (
                                  <div key={i} className="flex flex-col">
                                    <div className="border-black border-2 w-8 h-8 flex justify-center items-center">
                                      {key}
                                    </div>
                                    <div className="border-black border-2 w-8 h-8 flex justify-center items-center">
                                      {d.quantity[key]}
                                    </div>
                                  </div>
                                );
                                const noQuantity = null;
                                return (
                                  <>
                                    {d.quantity[key] === 0
                                      ? noQuantity
                                      : isQuantity}
                                  </>
                                );
                              })}
                            </div>
                            <br />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {calculateQuantity()}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {calculateUnitPricePerPack()}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        -
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {calculateUnitPrice()}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {Intl.NumberFormat("en-US").format(calculateTotal())}
                      </TableCell>
                    </TableRow>
                  );
                });
              })}
          </TableBody>
          <div className="page-break"></div>
        </Table>
      </div>
    );
  }
);

Template.displayName = "Template";

export const ComponentToPrint = forwardRef<HTMLDivElement, { orderId: string }>(
  (props, ref) => {
    return <Template ref={ref} orderId={props.orderId} />;
  }
);
ComponentToPrint.displayName = "ComponentToPrint";
export default function CustomComponent() {
  return (
    <style jsx global>{`
      @page {
        size: A4 landscape;
        margin: 20mm;
      }
      .a4-horizontal {
        width: 297mm;
        height: 210mm;
        padding: 20mm;
        box-sizing: border-box;
      }
    `}</style>
  );
}
