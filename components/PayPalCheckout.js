// components/PayPalCheckout.js
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function PayPalCheckout({ productType }) {
    const { data: session, update } = useSession();
const router = useRouter();
console.log("productTypeFromPayPalCheck:", productType);
  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "rect", label: "paypal" }}
      createOrder={async (data, actions) => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productType }),
        });
        const orderData = await res.json();
        if (orderData.id) {
          return orderData.id;
        } else {
          throw new Error("Could not create PayPal order");
        }
      }}
      onApprove={async (data, actions) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID, productType }),
        });
        const captureResult = await res.json();
        if (res.ok) {
          await update({
            ...session,
            user: {
              ...session?.user,
              role: "premium"
            }
          });
          router.reload();
        
        } else {
          alert("Error capturing order: " + captureResult.error);
        }
      }}
      onError={(err) => {
        console.error("PayPal Checkout Error", err);
        alert("An error occurred during PayPal checkout.");
      }}
    />
  );
}
