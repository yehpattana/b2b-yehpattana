import Link from "next/link";
import React from "react";

interface props {
  title: string;
  product: null | string;
}
export const PageHero = ({ title, product }: props) => {
  return (
    <div className="w-screen bg-white h-16">
      <div className="section-center h-full flex  justify-start items-center px-12">
        <h3 className="text-black">
          <Link href="/">Home</Link>
          {/* if in product have show product path as well */}
          {product !== null && <Link href="/products">/ Product</Link>}/ {title}
        </h3>
      </div>
    </div>
  );
};
 