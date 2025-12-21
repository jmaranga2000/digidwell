// lib/mpesa/initiatePayment.ts
import axios from "axios";
import prisma from "@/lib/prisma";
import { generateMpesaToken } from "./generateToken";

interface InitiatePaymentProps {
  phone: string;
  amount: number;
  serviceId: string;
  userId: string;
}

export async function initiatePayment({
  phone,
  amount,
  serviceId,
  userId,
}: InitiatePaymentProps) {
  try {
    if (!phone || !amount || !serviceId || !userId) {
      throw new Error("Missing required payment parameters");
    }

    const token = await generateMpesaToken();

    // Create a payment record in the database
    const payment = await prisma.payment.create({
      data: {
        phone,
        amount,
        status: "PENDING",
        serviceId,
        userId,
      },
    });

    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

    const stkPayload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: process.env.MPESA_PASS,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/confirm`,
      AccountReference: serviceId,
      TransactionDesc: `Payment for service ${serviceId}`,
    };

    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      stkPayload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { paymentId: payment.id, response: response.data };
  } catch (error: any) {
    console.error("Error initiating Mpesa payment:", error.message || error);
    throw new Error("Failed to initiate Mpesa payment");
  }
}