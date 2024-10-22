import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { apiService } from "../config/axios/axios-interceptor";
import { toastSuccess } from "./Toast";

export default function PayPalButton({
  orderNo,
  amount,
  currency = "USD",
  onClose,
}: {
  orderNo: string;
  amount: string;
  currency: string;
  onClose: any;
}) {
  const createOrder = (data, actions) => {
    console.log("data", data);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency, // or other supported currency
            value: amount, // Amount to be charged
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    // Capture the order
    console.log("data", data);
    const details = await actions.order.capture();
    const resp = await apiService.patch(
      "order/payment/paypal",
      {
        order_no: orderNo,
        payment_status: "paid",
        payment_id: details.id,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    toastSuccess("Success");

    console.log("resp", resp);
    console.log("details", details);
    console.log("Transaction completed by ", details.payer.name.given_name);
    onClose();
  };
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}
