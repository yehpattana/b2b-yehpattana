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
  Button,
  TextField,
} from "@mui/material";
import { useRecoilState } from "recoil";
import {
  ProductDetailWithCartState,
  cartState,
  shipping,
} from "../recoil/atoms/recoilState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Quantity } from "./Spinner";
import { apiService } from "../config/axios/axios-interceptor";
import { useRouter } from "next/navigation";

export default function OverviewTable() {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartState);
  const [, setRecoilShippingAddress] = useRecoilState(shipping);
  const [customerId, setCustomerId] = useState("");
  const [company, setCompany] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [minimumCostShipping, setMinimumCostShipping] = useState(0);
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState<
    ProductDetailWithCartState[] & { type?: string }
  >([]);
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

  const submitOrder = async () => {
    setCart(data);
    setRecoilShippingAddress(shippingAddress);
    router.push(`/${company}/overview`);
  };

  const calculateTotal = () => {
    if (data?.type === "RRP") {
      return data.reduce((grandTotal, row) => {
        const rowTotal = Object.keys(row.quantity).reduce((total, size) => {
          const qty = row.quantity[size];
          const price = row.price.find((p) => p.size === size)?.rrp_price || 0;
          return total + qty * price;
        }, 0);

        return grandTotal + rowTotal;
      }, 0);
    } else {
      return data.reduce((grandTotal, row) => {
        const rowTotal = Object.keys(row.quantity).reduce((total, size) => {
          const qty = row.quantity[size];
          const price = row.price.find((p) => p.size === size)?.price || 0;
          return total + qty * price;
        }, 0);

        return grandTotal + rowTotal;
      }, 0);
    }
  };

  const getCompanyDetail = async () => {
    const companyId = localStorage.getItem("company_id");
    const { data } = await apiService.get(`companies/${companyId}`);
    setMinimumCostShipping(data?.data?.minimum_cost_avoid_shipping);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("currency", data?.data?.currency);
    }
    setCurrency(data?.data?.currency);
  };
  useEffect(() => {
    setData(cart);
    getCompanyDetail();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>QTY.</TableCell>
                <TableCell>UNIT PRICE</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => {
                const calculateTotal = () => {
                  if (data?.type === "RRP") {
                    return Object.keys(row?.quantity)?.reduce((total, size) => {
                      const qty = row?.quantity[size as keyof Quantity];
                      const price =
                        row?.price?.find((p) => p.size === size)?.rrp_price ||
                        row?.onePrice ||
                        0;
                      return total + qty * price;
                    }, 0);
                  } else {
                    return Object.keys(row?.quantity)?.reduce((total, size) => {
                      const qty = row?.quantity[size as keyof Quantity];
                      const price =
                        row?.price?.find((p) => p.size === size)?.price ||
                        row?.onePrice ||
                        0;
                      return total + qty * price;
                    }, 0);
                  }
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

                              <input
                                className="text-center text-gray-500 w-10 border rounded border-gray"
                                defaultValue={row.quantity[key]}
                                value={row.quantity[key]}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    const newQuantity = {
                                      ...row.quantity,
                                      [key]: value,
                                    };
                                    const newData = data.map((item, index) =>
                                      index === i
                                        ? { ...item, quantity: newQuantity }
                                        : item
                                    );
                                    setData(newData);
                                  }
                                }}
                              />
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
                                {data[i].type === "WSP"
                                  ? row?.price?.find(
                                      (p) =>
                                        p.size.toLowerCase() ===
                                        key.toLowerCase()
                                    )?.price || row?.onePrice
                                  : row?.price?.find(
                                      (p) =>
                                        p.size.toLowerCase() ===
                                        key.toLowerCase()
                                    )?.rrp_price || row?.onePrice}
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
                    <TableCell>
                      {" "}
                      <button
                        onClick={() => removeItemFromCart(row)}
                        className="border rounded w-20 bg-red-500 text-white font-semibold"
                      >
                        X
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow hover>
                <TableCell></TableCell>
                <TableCell>
                  <Stack
                    sx={{ alignItems: "center" }}
                    direction="row"
                    spacing={2}
                  >
                    <Typography variant="subtitle2"></Typography>
                  </Stack>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-end">TOTAL AMOUNT :</TableCell>
                <TableCell>
                  {currency} {sumFormatted(totalList)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card> */}
      <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "600px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>QTY.</TableCell>
                <TableCell>UNIT PRICE</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => {
                const calculateTotal = () => {
                  if (data?.type === "RRP") {
                    return Object.keys(row?.quantity)?.reduce((total, size) => {
                      const qty = row?.quantity[size as keyof Quantity];
                      const price =
                        row?.price?.find((p) => p.size === size)?.rrp_price ||
                        row?.onePrice ||
                        0;
                      return total + qty * price;
                    }, 0);
                  } else {
                    return Object.keys(row?.quantity)?.reduce((total, size) => {
                      const qty = row?.quantity[size as keyof Quantity];
                      const price =
                        row?.price?.find((p) => p.size === size)?.price ||
                        row?.onePrice ||
                        0;
                      return total + qty * price;
                    }, 0);
                  }
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
                            <div key={key + i} className="flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {key} :
                              </span>
                              <input
                                className="text-center text-gray-500 w-10 border rounded border-gray"
                                defaultValue={row.quantity[key]}
                                value={row.quantity[key]}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    const newQuantity = {
                                      ...row.quantity,
                                      [key]: value,
                                    };
                                    const newData = data.map((item, index) =>
                                      index === i
                                        ? { ...item, quantity: newQuantity }
                                        : item
                                    );
                                    setData(newData);
                                  }
                                }}
                              />
                            </div>
                          )
                      )}
                    </TableCell>
                    <TableCell>
                      {Object.keys(row.quantity).map(
                        (key) =>
                          row.quantity[key] !== 0 && (
                            <div key={key + i} className="flex items-center">
                              <span className="text-center w-12 text-gray-500 mr-2">
                                {key} :
                              </span>
                              <span className="text-center text-gray-500">
                                {data[i].type === "WSP"
                                  ? row?.price?.find(
                                      (p) =>
                                        p.size.toLowerCase() ===
                                        key.toLowerCase()
                                    )?.price || row?.onePrice
                                  : row?.price?.find(
                                      (p) =>
                                        p.size.toLowerCase() ===
                                        key.toLowerCase()
                                    )?.rrp_price || row?.onePrice}
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
                    <TableCell>
                      <button
                        onClick={() => removeItemFromCart(row)}
                        className="border rounded w-20 bg-red-500 text-white font-semibold"
                      >
                        X
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow hover>
                <TableCell></TableCell>
                <TableCell>
                  <Stack
                    sx={{ alignItems: "center" }}
                    direction="row"
                    spacing={2}
                  >
                    <Typography variant="subtitle2"></Typography>
                  </Stack>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-end">TOTAL AMOUNT :</TableCell>
                <TableCell>
                  {currency} {sumFormatted(totalList)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card>

      {minimumCostShipping > calculateTotal() && (
        <Box className="flex items-center justify-center bg-primary mt-5 px-4 py-2">
          <Typography className="text-white text-center" variant="body1">
            You are still {currency} {minimumCostShipping - calculateTotal()}{" "}
            away from free shipping
          </Typography>
        </Box>
      )}

      <Box className="container mx-auto p-4">
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <Box className="w-full md:w-1/2 md:pr-2">
            <Typography className="font-bold text-lg my-2">
              Shipping Address
            </Typography>
            <Typography className="text-gray-600 my-2" variant="body1">
              Please type your address
            </Typography>
            <TextField
              onChange={(e) => setShippingAddress(e.target.value)}
              id="discount-code"
              label="Address"
              placeholder="Enter Your Address"
              fullWidth
              variant="outlined"
              className="mb-4"
            />
          </Box>
          {/* Uncomment and adjust this block as needed */}
          {/* <Box className="w-full md:w-1/2 md:pl-2">
      <TextField
        id="discount-code"
        label="Discount code"
        placeholder="Enter Your Coupon Code If You Have One"
        fullWidth
        variant="outlined"
        className="mb-4"
      />
      <Button variant="contained" color="primary" fullWidth>
        APPLY COUPON
      </Button>
    </Box> */}
          <Box className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
            <Box className="bg-gray-100 p-4 rounded-md shadow-sm">
              <Typography className="text-gray-600" variant="body1">
                Total products
                <span className="float-right">
                  {currency}{" "}
                  {Intl.NumberFormat("en-US").format(calculateTotal())}
                </span>
              </Typography>
              <Typography className="text-gray-600" variant="body1">
                Shipping cost
                <span className="float-right">-</span>
              </Typography>
              <Typography className="font-bold text-lg my-2">
                Total amount
                <span className="float-right text-black">
                  {currency}{" "}
                  {Intl.NumberFormat("en-US").format(calculateTotal())}
                </span>
              </Typography>
              <Typography className="text-gray-400 text-sm text-end">
                VAT excluded
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="rounded border-2 bg-primary text-white mt-4"
                onClick={submitOrder}
              >
                OVERVIEW ORDER
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
