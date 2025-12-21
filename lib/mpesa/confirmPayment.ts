// lib/mpesa/confirmPayment.ts
import prisma from "@/lib/prisma";

interface CallbackItem {
  Name: string;
  Value: any;
}

interface StkCallbackMetadata {
  Item: CallbackItem[];
}

interface MpesaCallbackData {
  Body: {
    stkCallback: {
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: StkCallbackMetadata;
    };
  };
}

/**
 * Confirms a payment from Mpesa STK callback
 * Updates the corresponding payment record in the database
 *
 * @param callbackData - The data received from Mpesa webhook
 * @returns Updated payment record(s)
 */
export async function confirmPayment(callbackData: MpesaCallbackData) {
  const stkCallback = callbackData.Body.stkCallback;
  const checkoutRequestId = stkCallback.CheckoutRequestID;
  const resultCode = stkCallback.ResultCode;
  const resultDesc = stkCallback.ResultDesc;

  const metadata = stkCallback.CallbackMetadata;

  const amount = metadata?.Item.find((i) => i.Name === "Amount")?.Value || 0;
  const phone = metadata?.Item.find((i) => i.Name === "PhoneNumber")?.Value || null;

  const status = resultCode === 0 ? "SUCCESS" : "FAILED";

  const updatedPayments = await prisma.payment.updateMany({
    where: { mpesaCheckoutRequestId: checkoutRequestId },
    data: {
      status,
      amountPaid: amount,
      phoneNumber: phone,
      resultDescription: resultDesc,
      updatedAt: new Date(),
    },
  });

  return updatedPayments;
}