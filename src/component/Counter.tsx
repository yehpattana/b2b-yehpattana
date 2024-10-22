"use client";
import { counterState } from "../recoil/atoms/recoilState";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

export default function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  const route = useRouter();
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <p className="flex m-10">Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={() => route.push("/")}>home</Button>
    </div>
  );
}
