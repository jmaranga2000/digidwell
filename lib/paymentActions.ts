import PaymentTable from "../../components/PaymentTable";
import { fetchAllPayments } from "@/lib/paymentActions";

export default async function AdminPaymentsPage() {
  const payments = await fetchAllPayments();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Payments Management</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <PaymentTable payments={payments} />
      )}
    </div>
  );
}
