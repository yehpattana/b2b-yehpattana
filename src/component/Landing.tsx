"use client"
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Landing() {
  const route = useRouter();

  return (
    <div className="bg-white w-screen h-full">
      <div className="w-full bg-primary py-4 px-6 lg:px-80 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center text-white mb-4 md:mb-0">
          <div className="text-center md:text-left">
            <EmailIcon className="w-6 h-6 md:w-8 md:h-8" />
            <span className="block md:inline">support@ymtinnovation.com</span>
          </div>
        </div>
      </div>
      <div className="pt-4 pl-4 pr-6 md:pl-12 md:pr-60 flex flex-col md:flex-row items-center justify-between">
        <Box
          alt="logo"
          component="img"
          height={60}
          width={80}
          src={"/YMTInnovation.png"}
          className="mb-4 md:mb-0"
        />
        <div
          className="text-primary cursor-pointer flex items-center"
          onClick={() => route.push("/login")}
        >
          <AccountCircleOutlinedIcon className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-sm md:text-xl font-semibold ml-2">
            Login to your corporate shop
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 md:mt-8 px-4 md:px-0">
        <Image
          src="/Landing.png"
          alt="ymt img"
          width={1200}
          height={1000}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
