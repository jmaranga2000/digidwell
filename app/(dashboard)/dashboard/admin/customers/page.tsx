"use client";

import { useEffect, useState } from "react";
import { CustomerCard } from "@/components/cards/customer-card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      setCustomers(data.customers);
    } catch (err) {
      console.error(err);
      toast.error("Could not load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Navigate to edit page
  const handleEditCustomer = (id: string) => {
    router.push(`/dashboard/admin/customers/${id}/edit`);
  };

  // Delete a customer
  const handleDeleteCustomer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const res = await fetch(`/api/admin/customers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete customer");
      setCustomers(customers.filter((c) => c.id !== id));
      toast.success("Customer deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete customer.");
    }
  };

  if (loading) return <p className="text-gray-500">Loading customers...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Customers</h2>
        <Button onClick={() => router.push("/dashboard/admin/customers/create")}>
          Add Customer
        </Button>
      </div>

      {customers.length ? (
        <div className="grid md:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              id={customer.id}
              name={customer.name}
              email={customer.email}
              phone={customer.phone}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No customers found.</p>
      )}
    </div>
  );
}