"use client";

import Spinner, { Quantity } from "../../../../../../component/Spinner";
import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  cartState,
  typePriceState,
} from "../../../../../../recoil/atoms/recoilState";
import { useParams } from "next/navigation";
import { toastError, toastSuccess } from "../../../../../../component/Toast";
import { apiService } from "../../../../../../config/axios/axios-interceptor";
import { FilteredProductData, ProducDetail } from "../../../../products/type";
import Carousel from "../../../../products/component/Carousel";
import SizeChartModal from "../../../../../../component/ModalSizeChart";

type ErrorValidata = {
  color: boolean;
  quantity: boolean;
};

export default function ProductDetail() {
  const param = useParams();
  const productId = param?.id;
  const [product, setProduct] = useState<ProducDetail>();
  const [errorValidate, setErrorValidate] = useState<ErrorValidata>({
    color: false,
    quantity: false,
  });
  const [color, setColor] = useState("");
  const [stock, setStock] = useState([]);
  const [size, setSize] = useState([
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
  ]);
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
  const [, setCart] = useRecoilState(cartState);
  const [typePrice] = useRecoilState(typePriceState);
  const [imageCarousal, setImageCarousal] = useState<FilteredProductData>();
  const carouselRef = useRef(null);

  const fetchProductById = async () => {
    const { data: response } = await apiService.get(`products/${productId}`);
    filterOnlyImage(response);
    setProduct({
      main_product_data: response.main_product_data,
      product_varaints: response.product_varaints,
    });
    setColor(response.product_varaints[0].color_code);
    setStock(response.product_varaints[0].stock);
    const sizeOrder = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
    const stockSize = response.product_varaints[0].stock?.map((s) => s.size);
    setSize(
      stockSize.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    );
  };

  const filterOnlyImage = (response: ProducDetail) => {
    const { main_product_data, product_varaints } = response;

    const filteredVariants = product_varaints?.map((variant) => ({
      front_image: variant.front_image,
      back_image: variant.back_image,
    }));

    setImageCarousal({
      cover_image: main_product_data?.cover_image,
      variants: filteredVariants,
    });
  };

  const validate = () => {
    const hasNonZeroValue = Object.values(quantity).some(
      (value) => value !== 0
    );
    if (color === "" || color === "undefined") {
      setErrorValidate({ color: true, quantity: false });
      toastError("Please Choose Color");
      return;
    }
    if (!hasNonZeroValue) {
      setErrorValidate({ color: false, quantity: true });
      return;
    }
    const filterProductSelected = product.product_varaints.filter(
      (p) => p.color_code === color
    );

    setCart((prevArray) => [
      ...prevArray,
      {
        ...product,
        product_varaints: filterProductSelected,
        price: filterProductSelected[0]?.stock,
        color,
        quantity,
        name: product.main_product_data.name,
        type: typePrice,
      },
    ]);
    toastSuccess("Add To Cart Success!");
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

  const clearError = () => {
    setErrorValidate({ color: false, quantity: false });
  };

  const handleSelectedColor = (color_code, stock, index) => {
    setColor(color_code);
    setStock(stock);
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
    const sizeOrder = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
    const stockSize = stock.map((s) => s.size);
    setSize(
      stockSize.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    );
    if (carouselRef.current) {
      carouselRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    fetchProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {product && (
        // <div className="min-h-screen p-20 flex justify-between">
        //   <div className="w-2/5 h-full">
        //     <Carousel ref={carouselRef} imageList={imageCarousal} />
        //     <div>
        //       <h1 className="font-bold my-5">Description</h1>
        //       <p className="my-2">
        //         {product?.product_varaints?.find((v) => v.color_code === color)
        //           ?.product_code || ""}
        //       </p>
        //       <p className="my-2">{product?.main_product_data?.description}</p>
        //       <hr />
        //       <h1 className="font-bold my-5">Materials</h1>
        //       <p className="my-2">
        //         {product?.main_product_data?.fabric_type +
        //           "," +
        //           " " +
        //           product?.main_product_data?.fabric_content}
        //       </p>

        //       <hr />
        //     </div>
        //   </div>
        //   <div className="w-1/2 ml-5">
        //     <h1 className="text-2xl font-bold mb-4">
        //       {product?.main_product_data?.name}
        //     </h1>
        //     <p className="text-md mb-4">Availability : Available</p>
        //     <p className="text-md mb-4">
        //       Sex : {product?.main_product_data?.gender}
        //     </p>
        //     {product?.main_product_data?.size_chart !== undefined &&
        //       product?.main_product_data?.size_chart && (
        //         <SizeChartModal url={product?.main_product_data?.size_chart} />
        //       )}
        //     <hr className="mb-4" />
        //     <p className="text-md mb-2">Color : </p>
        //     {errorValidate.color && (
        //       <span className="text-red-600">* กรุณาเลือกสี</span>
        //     )}
        //     <div className="flex items-center mb-4">
        //       {/* {product?.product_varaints?.map((c, i) => {
        //         return (
        //           <button
        //             key={i}
        //             className={`w-8 h-8 bg-[${
        //               c.color_code
        //             }] mt-2 mr-2 focus:outline-none cursor-pointer ${
        //               color === c.color_code ? "border-primary border-2" : ""
        //             }`}
        //             style={{
        //               backgroundColor: c.color_code,
        //             }}
        //             onClick={() =>
        //               handleSelectedColor(c.color_code, c.stock, i)
        //             }
        //           ></button>
        //         );
        //       })} */}
        //       {product?.product_varaints?.map((c, i) => (
        //         <button
        //           key={i}
        //           className={`w-8 h-8 rounded-full mt-2 mr-2 focus:outline-none cursor-pointer ${
        //             color === c.color_code ? "border-primary border-2" : ""
        //           }`}
        //           style={{
        //             backgroundColor: c.color_code,
        //           }}
        //           onClick={() => handleSelectedColor(c.color_code, c.stock, i)}
        //         ></button>
        //       ))}
        //     </div>
        //     {errorValidate.quantity && (
        //       <span className="text-red-600">* กรุณาเลือกไซส์</span>
        //     )}

        //     <div className="grid grid-rows-4 grid-flow-col gap-5 w-4/5">
        //       {size?.map(
        //         (
        //           s: "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL",
        //           i
        //         ) => {
        //           const filterStock = stock.find(
        //             (stock) => stock?.size.toLowerCase() === s.toLowerCase()
        //           );
        //           return (
        //             <div key={i}>
        //               <p className="text-gray-500 text-sm">
        //                 {filterStock === undefined || stock?.length === 0
        //                   ? " "
        //                   : `${filterStock?.currency} ${
        //                       typePrice === "WSP"
        //                         ? filterStock?.price
        //                         : filterStock?.rrp_price
        //                     } / Piece`}{" "}
        //               </p>
        //               <p className="text-gray-500 text-sm">
        //                 {filterStock === undefined || stock?.length === 0
        //                   ? "Out Of Stock"
        //                   : "Available :"}{" "}
        //                 {filterStock?.quantity}
        //               </p>
        //               <p className="text-gray-500 text-sm">
        //                 Next Arrival : {filterStock?.pre_quantity}
        //               </p>
        //               <div key={i} className=" flex items-center">
        //                 <div
        //                   className={`p-2 w-1/5 border text-center ${
        //                     filterStock === undefined || stock?.length === 0
        //                       ? "line-through text-red-600"
        //                       : ""
        //                   }`}
        //                 >
        //                   {s}
        //                 </div>
        //                 <Spinner
        //                   setQuantity={setQuantity}
        //                   quantity={quantity}
        //                   maxStock={
        //                     stock.find((stock) => stock.size === s)?.quantity +
        //                     stock.find((stock) => stock.size === s)
        //                       ?.pre_quantity
        //                   }
        //                   disable={
        //                     filterStock === undefined || stock?.length === 0
        //                   }
        //                   disableInput={
        //                     filterStock === undefined || stock?.length === 0
        //                   }
        //                   size={s}
        //                 />
        //               </div>
        //             </div>
        //           );
        //         }
        //       )}
        //     </div>
        //     {color === "" ? (
        //       <div className="mt-4 text-red-500">
        //         <p>* กรุณาเลือกสินค้า</p>
        //       </div>
        //     ) : null}

        //     <div className="flex items-center mt-4 ">
        //       <button
        //         onClick={() => {
        //           validate();
        //           clearError();
        //         }}
        //         disabled={color === ""}
        //         className={`border border-blue-900 rounded p-5 text-primary w-1/4 mr-5`}
        //       >
        //         Add To Cart
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <div className="min-h-screen p-4 md:p-10 lg:p-20 flex flex-col lg:flex-row lg:justify-between">
          <div className="w-full lg:w-2/5 h-full mb-10 lg:mb-0">
            <Carousel ref={carouselRef} imageList={imageCarousal} />
            <div>
              <h1 className="font-bold my-4 text-lg md:text-xl">Description</h1>
              <p className="my-2 text-sm md:text-base">
                {product?.product_varaints?.find((v) => v.color_code === color)
                  ?.product_code || ""}
              </p>
              <p className="my-2 text-sm md:text-base">
                {product?.main_product_data?.description}
              </p>
              <hr className="my-4" />
              <h1 className="font-bold my-4 text-lg md:text-xl">Materials</h1>
              <p className="my-2 text-sm md:text-base">
                {product?.main_product_data?.fabric_type +
                  ", " +
                  product?.main_product_data?.fabric_content}
              </p>
              <hr className="my-4" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:ml-5">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              {product?.main_product_data?.name}
            </h1>
            <p className="text-sm md:text-md mb-4">Availability: Available</p>
            <p className="text-sm md:text-md mb-4">
              Sex: {product?.main_product_data?.gender}
            </p>
            {product?.main_product_data?.size_chart && (
              <SizeChartModal url={product?.main_product_data?.size_chart} />
            )}
            <hr className="my-4" />
            <p className="text-sm md:text-md mb-2">Color:</p>
            {errorValidate.color && (
              <span className="text-red-600 text-sm">* กรุณาเลือกสี</span>
            )}
            <div className="flex flex-wrap items-center mb-4">
              {product?.product_varaints?.map((c, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full mt-2 mr-2 focus:outline-none cursor-pointer ${
                    color === c.color_code ? "border-primary border-2" : ""
                  }`}
                  style={{ backgroundColor: c.color_code }}
                  onClick={() => handleSelectedColor(c.color_code, c.stock, i)}
                  aria-label={`Select color ${c.color_code}`}
                ></button>
              ))}
            </div>
            {errorValidate.quantity && (
              <span className="text-red-600 text-sm">* กรุณาเลือกไซส์</span>
            )}
            <div className="grid gap-5 w-full md:w-4/5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
              {size?.map(
                (
                  s: "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL",
                  i
                ) => {
                  const filterStock = stock.find(
                    (stock) => stock?.size.toLowerCase() === s.toLowerCase()
                  );
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-start space-y-2"
                    >
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {filterStock === undefined || stock?.length === 0
                          ? " "
                          : `${filterStock?.currency} ${
                              typePrice === "WSP"
                                ? filterStock?.price
                                : filterStock?.rrp_price
                            } / Piece`}{" "}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {filterStock === undefined || stock?.length === 0
                          ? "Out Of Stock"
                          : "Available :"}{" "}
                        {filterStock?.quantity}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Next Arrival : {filterStock?.pre_quantity}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-2 w-1/5 border text-center ${
                            filterStock === undefined || stock?.length === 0
                              ? "line-through text-red-600"
                              : ""
                          }`}
                        >
                          {s}
                        </div>
                        <Spinner
                          setQuantity={setQuantity}
                          quantity={quantity}
                          maxStock={
                            stock.find((stock) => stock.size === s)?.quantity +
                            stock.find((stock) => stock.size === s)
                              ?.pre_quantity
                          }
                          disable={
                            filterStock === undefined || stock?.length === 0
                          }
                          disableInput={
                            filterStock === undefined || stock?.length === 0
                          }
                          size={s}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {color === "" && (
              <div className="mt-4 text-red-500 text-sm">
                <p>* กรุณาเลือกสินค้า</p>
              </div>
            )}
            <div className="flex items-center mt-4">
              <button
                onClick={() => {
                  validate();
                  clearError();
                }}
                disabled={color === ""}
                className="border border-blue-900 rounded p-3 text-primary w-full md:w-1/4 mr-5"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
