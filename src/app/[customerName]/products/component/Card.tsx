import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Product } from "../type";
import {
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

interface IProps {
  data: Product;
  showPrice?: boolean;
  type?: string;
}
export default function CardProduct({
  data,
  showPrice = true,
  type = "WSP",
}: IProps) {
  const router = useRouter();
  const selectedMenu = localStorage.getItem("menu");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        height: "auto",
        minHeight:"350px"
      }}
      onClick={() => router.push(`${selectedMenu}/${data?.master_code}`)}
    >
      <CardMedia className="flex items-center justify-center pt-2">
        <Image
          src={data?.cover_image}
          alt=""
          width={200}
          height={200}
          style={{ borderRadius: 4, border: "1px solid" }}
        />
      </CardMedia>
      {/* TODO show color list */}
      <Container className="flex items-start justify-start">
        {data?.colors?.map((color, i) => (
          <Box
            key={i}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: color,
              mt: 2,
              mr: 1,
            }}
          />
        ))}
      </Container>

      <CardContent sx={{ p: 1,pb:1, flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ mt: 0 }}>
            {data.gender}
          </Typography>
          <Typography variant="body2" sx={{ mt:0 }}>
            {data.size_range}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            fontSize: "0.9rem",
          }}
          title={data.name}
        >
          {data.name} <span className="text-red-500">{data.remark}</span>
        </Typography>
        {showPrice && (
          <Typography
            variant="h5"
            sx={{ mt: 1, fontWeight: "bold", fontSize: "1rem" }}
          >
            {type === "WSP" ?data?.currency+" "+data?.price : data?.currency +" "+data?.rrp_price}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
