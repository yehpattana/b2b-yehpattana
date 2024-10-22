import {
  Card,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useRecoilState } from "recoil";
import {
  ProductDetailWithCartState,
  cartState,
} from "../recoil/atoms/recoilState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Quantity } from "./Spinner";

export default function CartTable() {
  const [cart, setCart] = useRecoilState(cartState);
  const [data, setData] = useState<ProductDetailWithCartState[]>([]);
  const [currency, setCurrency] = useState("");
  const totalList = [];

  const removeItemFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item !== itemToRemove);
    setCart(updatedCart);
    setData(updatedCart);
  };

  const sumFormatted = (numArray, locale = "en-US") => {
    const numericValues = numArray.map((num) =>
      parseInt(num.replace(/,/g, ""), 10)
    );
    const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
    const formattedSum = new Intl.NumberFormat(locale).format(sum);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        "total_amount",
        new Intl.NumberFormat("en-US").format(sum)
      );
    }

    return formattedSum;
  };

  useEffect(() => {
    setData(cart);
    if (typeof localStorage !== "undefined") {
      setCurrency(localStorage.getItem("currency"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>AVAILABLE QTY</TableCell>
                <TableCell>BOOKED QTY</TableCell>
                <TableCell>UNIT PRICE</TableCell>
                <TableCell>AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => {
                const filterStock = row.product_varaints?.[0].stock.find(
                  (s) => s.product_id === row.product_varaints[0].product_id
                );
                const calculateTotal = () => {
                  return Object.keys(row?.quantity)?.reduce((total, size) => {
                    const qty = row?.quantity[size as keyof Quantity];
                    const price =
                      row?.price?.find((p) => p.size === size)?.price ||
                      row?.onePrice ||
                      0;
                    return total + qty * price;
                  }, 0);
                };
                totalList.push(
                  Intl.NumberFormat("en-US").format(calculateTotal())
                );
                return (
                  <TableRow hover key={row.name + i}>
                    <TableCell>
                      {row?.product_varaints[0]?.front_image && (
                        <Image
                          width={60}
                          height={60}
                          alt=""
                          src={row.product_varaints[0]?.front_image}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: "center" }}
                        direction="row"
                        spacing={2}
                      >
                        {row.product_varaints[0].product_code && (
                          <Typography variant="subtitle2">
                            {row.product_varaints[0].product_code}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        sx={{ alignItems: "center" }}
                        direction="row"
                        spacing={2}
                      >
                        {row.name && (
                          <Typography variant="subtitle2">
                            {row.name}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {Object.keys(row.quantity).map(
                        (key) =>
                          row.quantity[key] !== 0 && (
                            <div key={key + i} className=" flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {key} :{" "}
                              </span>
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {row.quantity[key]}
                              </span>
                            </div>
                          )
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {Object.keys(row.quantity).map(
                        (key) =>
                          row.quantity[key] !== 0 && (
                            <div key={key + i} className=" flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {row.quantity[key] <= filterStock?.quantity
                                  ? row.quantity[key]
                                  : filterStock?.quantity}
                              </span>
                            </div>
                          )
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {Object.keys(row.quantity).map(
                        (key) =>
                          row.quantity[key] !== 0 && (
                            <div key={key + i} className=" flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {row.quantity[key] > filterStock?.quantity
                                  ? row.quantity[key] - filterStock?.quantity
                                  : ""}
                              </span>
                            </div>
                          )
                      )}
                    </TableCell>
                    <TableCell>
                      {Object.keys(row.quantity).map(
                        (key) =>
                          row.quantity[key] !== 0 && (
                            <div key={key + i} className=" flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {key} :{" "}
                              </span>
                              <span className="text-center text-gray-500">
                                {Intl.NumberFormat("en-US").format(
                                  row?.price?.find((p) => p.size === key)?.price
                                ) || row?.onePrice}
                              </span>
                            </div>
                          )
                      )}
                    </TableCell>
                    <TableCell>
                      {currency}{" "}
                      {calculateTotal()
                        ? Intl.NumberFormat("en-US").format(calculateTotal())
                        : 0}
                    </TableCell>
                    {/* <TableCell>
                      {" "}
                      <button
                        onClick={() => removeItemFromCart(row)}
                        className="border rounded w-20 bg-red-500 text-white font-semibold"
                      >
                        X
                      </button>
                    </TableCell> */}
                  </TableRow>
                );
              })}
              <TableRow hover>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-end ">TOTAL PRODUCTS :</TableCell>
                <TableCell>
                  {currency} {sumFormatted(totalList)}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-end">SHIPPING COST :</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-end font-bold">
                  TOTAL AMOUNT :
                </TableCell>
                <TableCell>
                  <Box className="flex flex-col">
                    <p>
                      {currency} {sumFormatted(totalList)}
                    </p>
                    <p className="text-sm">VAT excluded</p>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card>
    </>
  );
}
