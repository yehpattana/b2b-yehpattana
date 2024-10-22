import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { useEffect, useState } from "react";
import { apiService } from "../../config/axios/axios-interceptor";

export default function LoginModal() {
  const route = useRouter();
  const [company, setCompany] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [order, setOrder] = useState<any[]>([]);

  const fetchOrder = async () => {
    if (customerId) {
      const { data } = await apiService.get(`order/${customerId}`);
      setOrder(data);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setCompany(localStorage.getItem("user_company"));
      setCustomerId(localStorage.getItem("customer_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);
  return (
    <IconButton
      onClick={() => route.push(`/${company}/resellerPanel`)}
      className="p-3 "
      size="small"
    >
      <LockIcon />
      {order && (
        <div className="bg-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white absolute top-0 right-0">
          {order.length}
        </div>
      )}
    </IconButton>
  );
}
