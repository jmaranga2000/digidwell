import PaymentResult from "@/components/PaymentResult";

export default function PaymentFailedPage({ searchParams }: any) {
  const { service } = searchParams;

  return (
    <PaymentResult
      type="failed"
      message="Unfortunately your payment could not be completed. Please try again or contact support."
      service={service}
    />
  );
}
