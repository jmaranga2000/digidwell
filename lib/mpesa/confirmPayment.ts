import prisma from "@/lib/prisma";

export async function confirmPayment(callbackData: any) {
  const metadata = callbackData.Body.stkCallback.CallbackMetadata;
  const mpesaCheckoutRequestId = callbackData.Body.stkCallback.CheckoutRequestID;

  const amount = metadata.Item.find((i: any) => i.Name === "Amount")?.Value;
  const phone = metadata.Item.find((i: any) => i.Name === "PhoneNumber")?.Value;
  const resultCode = callbackData.Body.stkCallback.ResultCode;
  const resultDesc = callbackData.Body.stkCallback.ResultDesc;

  const status = resultCode === 0 ? "SUCCESS" : "FAILED";

  const payment = await prisma.payment.updateMany({
    where: { mpesaCheckoutRequestId },
    data: { status, amountPaid: amount, updatedAt: new Date() },
  });

  return payment;
}