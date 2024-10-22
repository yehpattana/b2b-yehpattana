import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import Spinner, { Quantity } from "../../../../component/Spinner";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRecoilState } from "recoil";
import { cartState } from "../../../../recoil/atoms/recoilState";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ProductList = ({
  product,
  type = "",
  displayPrice = true,
  typePrice = "WSP",
}) => {
  const router = useRouter();
  const [, setCart] = useRecoilState(cartState);
  const [hoveredIndex, setHoveredIndex] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState<Quantity>({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    "2XL": 0,
    "3XL": 0,
    "4XL": 0,
    "5XL": 0,
  });
  const company = localStorage.getItem("user_company");
  const notify = () => {
    toast.success(
      <div>
        Add To Cart Success!
        <p
          onClick={() => router.push(`/${company}/cart`)}
          className="font-bold underline"
        >
          GO TO CART
        </p>
      </div>,
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
  };
  const validate = () => {
    setCart((prevArray) => [
      ...prevArray,
      {
        main_product_data: product,
        product_varaints: [product.product_varaints],
        price: product.product_varaints?.stock,
        color: product.product_variants?.color_code,
        quantity,
        name: product.name,
        type:typePrice
      },
    ]);
    // toastSuccess("Add To Cart Success!");
    notify();
    setQuantity({
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      "2XL": 0,
      "3XL": 0,
      "4XL": 0,
      "5XL": 0,
    });
  };
  return (
    <div className="flex items-center mb-2">
      <div
        className="image-wrapper flex text-center"
        onMouseEnter={() => setHoveredIndex(true)}
        onMouseLeave={() => setHoveredIndex(false)}
      >
        <Image
          width={160}
          height={160}
          alt={`Image`}
          src={
            hoveredIndex
              ? product?.product_varaints?.back_image
              : product?.product_varaints?.front_image
          }
          className="image"
        />
      </div>
      <TableContainer
        component={Paper}
        className="p-4 !shadow-none border-none"
      >
        <div className="flex justify-between items-center mb-1">
          <div className="text-xl font-bold text-blue-900">
            {product?.product_varaints?.product_code}
            <span className="text-red-600 ml-2">{type}</span>
          </div>
          <div className="flex text-right">
            {displayPrice && (
              <div className="font-bold mr-5">
                {product?.product_varaints?.stock?.[0]?.currency}{" "}
                {typePrice === "WSP"
                  ? Intl.NumberFormat("en-US").format(
                      product?.product_varaints?.stock?.[0]?.price
                    )
                  : Intl.NumberFormat("en-US").format(
                      product?.product_varaints?.stock?.[0]?.rrp_price
                    )}{" "}
                +TAX
              </div>
            )}
            {Object.values(quantity).reduce((acc, value) => acc + value, 0) >
              0 && (
              <AddShoppingCartIcon
                color="primary"
                className="cursor-pointer"
                onClick={validate}
              />
            )}
          </div>
        </div>
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="font-bold text-gray-700 p-2">
                Size
              </TableCell>
              {product?.product_varaints?.stock.map((stock, i) => (
                <TableCell
                  key={i}
                  align="center"
                  className="font-bold text-gray-700 p-2"
                >
                  {stock.size}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="center"
                className="font-bold text-gray-700 p-2"
              ></TableCell>
              {product?.product_varaints?.stock?.map((s, index) => (
                <TableCell key={index} align="center" className="p-2">
                  <div className="flex justify-center items-center">
                    <Spinner
                      setQuantity={setQuantity}
                      quantity={quantity}
                      size={s.size}
                      showArrow={false}
                      maxStock={s.quantity + s.pre_quantity}
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center" className="font-bold text-gray-700 p-2">
                Availability
              </TableCell>
              {product?.product_varaints?.stock.map((stock, index) => {
                return (
                  <TableCell key={index} align="center" className="p-2">
                    <div className="flex justify-center items-center">
                      <div className="w-full text-center">{stock.quantity}</div>
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell align="center" className="font-bold text-gray-700 p-2">
                Next arrivals
              </TableCell>
              {product?.product_varaints?.stock.map((stock, index) => (
                <TableCell key={index} align="center" className="p-2">
                  <div className="flex justify-center items-center">
                    <div className="w-full text-center">
                      {stock?.pre_quantity || "-"}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
// {
//   "main_product_data": {
//       "id": "78deabb6-bfcf-4a0b-9e32-112419b5b392",
//       "name": "testendd",
//       "master_code": "1234",
//       "cover_image": "https://res.cloudinary.com/dgfgbympj/image/upload/v1715657081/placeholder_image/mhovq24vjmn7jnrtpl79.webp",
//       "product_status": "available",
//       "product_group": "",
//       "season": "",
//       "gender": "female",
//       "product_class": "",
//       "collection": "Football",
//       "category": "",
//       "brand": "",
//       "is_club": false,
//       "club_name": "",
//       "remark": "Men's",
//       "launch_date": "1900-01-01T00:00:00Z",
//       "end_of_life": "2024-07-24T00:00:00Z",
//       "size_chart": "https://res.cloudinary.com/dgfgbympj/image/upload/v1715657062/placeholder_image/t2mta00cjqefworxomac.png",
//       "pack_size": "",
//       "current_supplier": "",
//       "description": "",
//       "fabric_content": "",
//       "fabric_type": "",
//       "weight": 0,
//       "created_by_company": "89d2f68d-775a-47ad-b678-d47a07e0369a",
//       "created_by": "admin1",
//       "edited_by": "",
//       "created_at": "2024-07-23T15:56:12Z",
//       "updated_at": "2024-07-28T16:00:16Z"
//   },
//   "product_varaints": [
//       {
//           "product_id": "78deabb6-bfcf-4a0b-9e32-112419b5b392",
//           "product_code": "1234dum",
//           "color_code": "#000000",
//           "ColorName": "",
//           "Color": "",
//           "front_image": "https://res.cloudinary.com/dgfgbympj/image/upload/v1721750169/front_image/image_20240723_225607.jpg.png",
//           "back_image": "https://res.cloudinary.com/dgfgbympj/image/upload/v1721750171/back_image/image_20240723_225610.jpg.png",
//           "stock": [
//               {
//                   "id": "1f7dc216-fa28-4f23-9b5c-bff2d6babf6d",
//                   "product_id": "78deabb6-bfcf-4a0b-9e32-112419b5b392",
//                   "size": "S",
//                   "size_remark": "",
//                   "quantity": 1,
//                   "pre_quantity": 0,
//                   "price": 123,
//                   "currency": "USD",
//                   "item_status": "available",
//                   "created_at": "",
//                   "updated_at": ""
//               }
//           ]
//       }
//   ],
//   "price": [
//       {
//           "id": "1f7dc216-fa28-4f23-9b5c-bff2d6babf6d",
//           "product_id": "78deabb6-bfcf-4a0b-9e32-112419b5b392",
//           "size": "S",
//           "size_remark": "",
//           "quantity": 1,
//           "pre_quantity": 0,
//           "price": 123,
//           "currency": "USD",
//           "item_status": "available",
//           "created_at": "",
//           "updated_at": ""
//       }
//   ],
//   "color": "#000000",
//   "quantity": {
//       "XS": 0,
//       "S": 1,
//       "M": 0,
//       "L": 0,
//       "XL": 0,
//       "2XL": 0,
//       "3XL": 0,
//       "4XL": 0,
//       "5XL": 0
//   },
//   "name": "testendd"
// }
