import React from "react";
type Props = {
  quantity: Quantity;
  setQuantity: React.Dispatch<React.SetStateAction<Quantity>>;
  size: keyof Quantity;
  maxStock?: number;
  disable?: boolean;
  disableInput?: boolean;
  showArrow?: boolean;
};
export type Quantity = {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  "2XL": number;
  "3XL": number;
  "4XL": number;
  "5XL": number;
};
export default function Spinner({
  quantity,
  setQuantity,
  size,
  maxStock = 99999,
  disable,
  disableInput,
  showArrow = true,
}: Props) {
  return (
    <div className={`flex items-center justify-between w-1/2 ${showArrow?'ml-5':''}`}>
      {showArrow ? (
        <button
          disabled={quantity[size] === 0 || disable}
          className={`p-2 bg-primary text-white rounded ${
            quantity[size] === 0 || disable ? "!bg-gray" : ""
          }`}
          onClick={() =>
            setQuantity((prevQuantity) => ({
              ...prevQuantity,
              [size]: quantity[size] - 1,
            }))
          }
        >
          -
        </button>
      ):<div></div>}

      <input
        type="text"
        className={
          showArrow
            ? "w-2/5 text-center border border-gray-300 rounded p-2"
            : "border border-gray-300 rounded p-2 w-10 text-center"
        }
        value={quantity[size]}
        disabled={disableInput}
        onChange={(e) => {
          if (
            parseInt(e.target.value) >= 1 &&
            parseInt(e.target.value) <= maxStock
          ) {
            setQuantity((prevQuantity) => ({
              ...prevQuantity,
              [size]: parseInt(e.target.value),
            }));
          }
          if (e.target.value === "") {
            setQuantity((prevQuantity) => ({
              ...prevQuantity,
              [size]: 0,
            }));
          }
        }}
      />
      {showArrow ? (
        <button
          className={`p-2 bg-primary text-white rounded ${
            disable || quantity[size] === maxStock ? "!bg-gray" : ""
          }`}
          disabled={quantity[size] === maxStock || disable}
          onClick={() => {
            if (quantity[size] < maxStock) {
              setQuantity((prevQuantity) => ({
                ...prevQuantity,
                [size]: quantity[size] + 1,
              }));
            }
          }}
        >
          +
        </button>
      ):<div></div>}
    </div>
  );
}
