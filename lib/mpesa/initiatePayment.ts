import axios from "axios";
import prisma from "@/lib/prisma";
import { generateMpesaToken } from "./generateToken";

export async function initiatePayment({
  phone,
  amount,
  serviceId,
  userId,
}: {
  phone: string;
  amount: number;
  serviceId: string;
  userId: string;
}) {
  const token = await generateMpesaToken();

  const payment = await prisma.payment.create({
    data: {
      phone,
      amount,
      status: "PENDING",
    },
  });

  const stkPayload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: process.env.MPESA_PASS,
    Timestamp: new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14),
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/confirm`,
    AccountReference: serviceId,
    TransactionDesc: `Payment for service ${serviceId}`,
  };

  const res = await axios.post(`${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, stkPayload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { paymentId: payment.id, response: res.data };
}