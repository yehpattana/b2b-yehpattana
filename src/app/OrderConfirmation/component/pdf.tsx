"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { apiService } from "../../../config/axios/axios-interceptor";
import { Quantity } from "../../../component/Spinner";
import Image from "next/image";

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
    const [orderData, setOrderData] = useState([]);
    const [orderInfo, setOrderInfo] = useState<any>();
    const [user, setUser] = useState<User>();

    const getOrderDetail = async (customerId) => {
      const { data } = await apiService.get(`order/${customerId}/${orderId}`);
      const detail = JSON.parse(data[0].order_detail);
      setOrderData(detail);
      setOrderInfo(data[0]);
    };
    const fetchUserDetail = async (userId) => {
      const { data } = await apiService.get(`users/${userId}`);
      if (data) setUser(data);
      console.log("data", data);
    };

    useEffect(() => {
      if (typeof window !== "undefined") {
        const customerId = localStorage.getItem("customer_id");
        const userId = localStorage.getItem("user_id");
        getOrderDetail(customerId);
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
      <Box ref={ref} sx={{ p: 1 }}>
        <Box className="paper-header">
          <Typography variant="h6" component="h6" gutterBottom align="right">
            Order Confirmation
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
              width: "100%",
            }}
          >
            <Box>
              <Typography className="!text-xs">MIZUNO Italia S.r.l.</Typography>
              <Typography className="!text-xs">
                VIALE RISORGIMENTO, 20
              </Typography>
              <Typography className="!text-xs">10092 BEINASCO (TO)</Typography>
              <Typography className="!text-xs">
                Tel: +39 011 349.48.11
              </Typography>
              <Typography className="!text-xs">
                Fax: +39 011 349.48.23
              </Typography>
              <Typography className="!text-xs">
                Cod.Fisc.: 01708140015
              </Typography>
              <Typography className="!text-xs">
                Partita I.V.A: IT01708140015
              </Typography>
            </Box>
            <Box className="flex w-2/4 justify-between">
              <Box className="w-2/4 border p-2 mr-3">
                <Typography className="!text-xs">SPEDIRE A:</Typography>
                <Typography className="!text-xs">
                  {user?.company_name}
                </Typography>
                <Typography className="!text-xs">
                  COD: {orderInfo?.order_no}
                </Typography>
                <Typography className="!text-xs text-wrap">
                  {user?.address}
                </Typography>
                <Typography className="!text-xs text-wrap">
                  Tel: {user?.phone_number}
                </Typography>
                <Typography className="!text-xs text-wrap">
                  VAT Number: {user?.vat_number}
                </Typography>
              </Box>
              <Box className="w-2/4 border p-2">
                <Typography className="!text-xs">SPEDIRE A:</Typography>
                <Typography className="!text-xs">
                  COD: {orderInfo?.order_no}
                </Typography>
                <Typography className="!text-xs text-wrap">
                  {orderInfo?.shipping_address.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            py: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                CLIENTE
              </Typography>
              <Typography variant="body2" align="center">
                009607
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                PARTITA IVA
              </Typography>
              <Typography variant="body2" align="center">
                12131780962
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                TELEFONO
              </Typography>
              <Typography variant="body2" align="center">
                {"sss "}
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                AGENTE
              </Typography>
              <Typography variant="body2" align="center">
                DIRETTO TEAMWEAR
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                MARCA
              </Typography>
              <Typography variant="body2" align="center">
                TEAMWEAR
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                NR.DOCUMENTO
              </Typography>
              <Typography variant="body2" align="center">
                24012494
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                DATA
              </Typography>
              <Typography variant="body2" align="center">
                25.07.2024
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                MODALITÀ PAGAMENTO
              </Typography>
              <Typography variant="body2" align="center">
                RD 60 gg fm
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                % SC.PAG
              </Typography>
              <Typography variant="body2" align="center"></Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                TIPO SPEDIZIONE
              </Typography>
              <Typography variant="body2" align="center">
                Evasione unica
              </Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                SCONTO 1
              </Typography>
              <Typography variant="body2" align="center"></Typography>
            </Grid>
            <Grid item xs={2} className="border">
              <Typography variant="body2" align="center" className="!text-xs">
                SCONTO 2
              </Typography>
              <Typography variant="body2" align="center"></Typography>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead className="table-header border !border-black">
              <TableRow className="border !border-black">
                <TableCell
                  width={100}
                  className="border !border-black"
                ></TableCell>
                <TableCell className="!border !border-black">
                  Product Code
                </TableCell>
                <TableCell className="border !border-black">
                  Description
                </TableCell>
                <TableCell className="border !border-black">
                  Price Unit
                </TableCell>
                <TableCell className="border !border-black">XS</TableCell>
                <TableCell className="border !border-black">S</TableCell>
                <TableCell className="border !border-black">M</TableCell>
                <TableCell className="border !border-black">L</TableCell>
                <TableCell className="border !border-black">XL</TableCell>
                <TableCell className="border !border-black">2XL</TableCell>
                <TableCell className="border !border-black">3XL</TableCell>
                <TableCell className="border !border-black">4XL</TableCell>
                <TableCell className="border !border-black">5XL</TableCell>
                <TableCell align="center" className="border !border-black">
                  Qty. Total
                </TableCell>
                <TableCell align="right" className="border !border-black">
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.map((row, index) => {
                console.log("row", row);
                const calculateTotal = () => {
                  return Object.keys(row.quantity).reduce((total, size) => {
                    const qty = row.quantity[size as keyof Quantity];
                    const priceOfPrice =
                      row?.type === "RRP"
                        ? row?.price?.find((p) => p.size === size)?.rrp_price
                        : row?.price?.find((p) => p.size === size)?.price;
                    const price = priceOfPrice || row?.onePrice || 0;
                    return total + qty * price;
                  }, 0);
                };
                const calculateUnitPrice = () => {
                  return Object.keys(row.quantity)?.map(
                    (key) =>
                      row.quantity[key] !== 0 && (
                        <div key={key + index} className=" flex items-center">
                          <span className="text-center w-12 text-gray-500 mr-2">
                            {key} :{" "}
                          </span>
                          <span className="text-center text-gray-500">
                            {row?.onePrice || row?.type === "RRP"
                              ? row?.price?.find((p) => p.size === key)
                                  ?.rrp_price
                              : row?.price?.find((p) => p.size === key)?.price}
                          </span>
                        </div>
                      )
                  );
                };
                const calculateQuantity = () => {
                  return Object.keys(row?.quantity)?.reduce((total, size) => {
                    const qty = row?.quantity[size as keyof Quantity];
                    return total + qty;
                  }, 0);
                };
                const order = [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "2XL",
                  "3XL",
                  "4XL",
                  "5XL",
                ];

                const sizesArray = order?.map((size) => row?.quantity[size]);
                return (
                  <TableRow key={index} className="border !border-black">
                    <TableCell align="center" className="border !border-black">
                      {" "}
                      <Image
                        width={70}
                        height={70}
                        alt={`Image`}
                        src={row?.product_varaints[0].front_image}
                        className="image"
                      />
                    </TableCell>
                    <TableCell className="border !border-black">
                      {row.product_varaints[0].product_code}
                    </TableCell>
                    <TableCell className="border !border-black">
                      {row.name}
                    </TableCell>
                    <TableCell className="border !border-black">
                      {calculateUnitPrice()}
                    </TableCell>
                    {sizesArray?.map((size, sizeIndex) => (
                      <TableCell
                        key={sizeIndex}
                        align="center"
                        className="border !border-black"
                      >
                        {size}
                      </TableCell>
                    ))}
                    <TableCell align="center" className="border !border-black">
                      {calculateQuantity()}
                    </TableCell>
                    <TableCell align="right" className="border !border-black">
                      {Intl.NumberFormat("en-US").format(calculateTotal())}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <div className="page-break"></div>
          </Table>
        </TableContainer>
      </Box>
    );
  }
);

Template.displayName = "Template";

export const ToPrintOrderConfirmPDF = forwardRef<
  HTMLDivElement,
  { orderId: string }
>((props, ref) => {
  return <Template ref={ref} orderId={props.orderId} />;
});
ToPrintOrderConfirmPDF.displayName = "ToPrintOrderConfirmPDF";
