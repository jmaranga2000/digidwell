import axios from "axios";

export async function initiateSTKPush(phone: string, amount: number, description: string) {
  const res = await axios.post(
    `${process.env.MPESA_BASE_URL}/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: process.env.MPESA_PASS,
      Timestamp: new Date().toISOString(),
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.MPESA_CALLBACK_URL}/api/payment/confirm`,
      AccountReference: "Booking",
      TransactionDesc: description,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
      },
    }
  );

  return res.data;
}
