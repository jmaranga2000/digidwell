import PaymentResult from "@/components/PaymentResult";

export default function PaymentSuccessPage({ searchParams }: any) {
  const { amount, service, tx } = searchParams;

  return (
    <PaymentResult
      type="success"
      message="Your payment has been confirmed. Thank you for choosing Digidwell."
      amount={amount ? Number(amount) : undefined}
      service={service}
      txRef={tx}
    />
  );
}
