import {
  Card,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { apiService } from "../config/axios/axios-interceptor";
import { useEffect, useState } from "react";
import moment from "moment";
import PrintPDF from "../app/PDF/page";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintOrderConfirmPDF from "../app/OrderConfirmation/page";
import PayPalButton from "./PayPalButton";

const statusMap = {
  pending: { label: "pending", color: "warning" },
  paid: { label: "paid", color: "success" },
  shipping: { label: "shipping", color: "info" },
  delivered: { label: "delivered", color: "success" },
  refunded: { label: "refunded", color: "error" },
} as const;

export default function OrderTableReseller() {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [paymentDetail, setPaymentDetail] = useState<{
    orderNo: string;
    amount: string;
    currency: string;
  }>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const fetchOrder = async () => {
    if (typeof localStorage !== "undefined") {
      const { data } = await apiService.get(
        `order/${localStorage.getItem("customer_id")}`
      );
      if (data) setOrders(data);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    await apiService._delete(`order/${orderId}`);
    window.location.reload();
  };
  const handleCheckShipping = (trackId) => {
    const url = `https://www.dhl.com/th-th/home/tracking.html?tracking-id=${trackId}`;
    window.open(url, "_blank");
  };
  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };
  const handlePayment = (orderNo, amount, currency) => {
    setPaymentDetail({ orderNo, amount, currency });
    setShowPaymentModal(true);
  };

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      setCustomerId(localStorage.getItem("customer_id"));
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
      <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell>
                  Shipping <br />
                  Address
                </TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>
                  Total <br />
                  Amount
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tracking No.</TableCell>
                <TableCell>
                  Order <br />
                  Confirmation
                </TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>
                  Packing <br />
                  List
                </TableCell>
                <TableCell>
                  Payment
                  <br /> Status
                </TableCell>
                <TableCell>
                  Payment
                  <br /> ID
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => {
                const { label, color } = statusMap[order.status] ?? {
                  label: "Unknown",
                  color: "default",
                };
                const { label: labelPayment, color: colorPayment } = statusMap[
                  order.payment_status
                ] ?? {
                  label: "Unknown",
                  color: "default",
                };

                return (
                  <TableRow hover key={order.order_id}>
                    <TableCell>{order.order_no}</TableCell>
                    <TableCell>{order.shipping_address}</TableCell>
                    <TableCell>
                      {moment(order.created_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{order?.total_amount} USD</TableCell>
                    <TableCell>
                      <Chip color={color} label={label} size="small" />
                    </TableCell>
                    <TableCell>{order?.tracking_no || "-"}</TableCell>
                    <TableCell>
                      <PrintOrderConfirmPDF orderId={order?.order_id} />
                    </TableCell>
                    <TableCell>
                      <PrintPDF orderId={order?.order_id} />
                    </TableCell>
                    <TableCell>
                      <Box className="flex justify-between items-center">
                        {order?.packing_list && (
                          <PictureAsPdfIcon
                            color="primary"
                            fontSize="large"
                            className="cursor-pointer"
                            onClick={() =>
                              window.open(`${order.packing_list}`, "_blank")
                            }
                          />
                        )}

                        {label === "shipping" && (
                          <LocalShippingIcon
                            className="cursor-pointer"
                            color="primary"
                            fontSize="large"
                            onClick={() => {
                              handleCheckShipping(order?.tracking_no);
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={colorPayment}
                        label={labelPayment}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {labelPayment === "pending" ? "-" : order?.payment_id}
                    </TableCell>

                    {label === "pending" ? (
                      <TableCell align="right">
                        <div className="flex">
                          {labelPayment === "pending" && (
                            <PaidOutlinedIcon
                              color="info"
                              className="cursor-pointer"
                              fontSize="large"
                              onClick={() =>
                                handlePayment(
                                  order.order_no,
                                  order.total_amount,
                                  "USD"
                                )
                              }
                            />
                          )}
                          <DeleteForeverIcon
                            color="error"
                            className="cursor-pointer"
                            fontSize="large"
                            onClick={() => handleDeleteOrder(order.order_id)}
                          />
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <Dialog
          open={showPaymentModal}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <PayPalButton
              orderNo={paymentDetail?.orderNo}
              amount={paymentDetail?.amount}
              currency={"USD"}
              onClose={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
