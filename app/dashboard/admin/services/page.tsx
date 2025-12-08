"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import AdminServiceCard from "@/app/dashboard/components/AdminServiceCard";

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services/list");
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Form change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingId
        ? "/api/services"
        : "/api/services";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { id: editingId, ...form } : form
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Operation failed");
        return;
      }

      if (editingId) {
        // Update UI
        setServices((prev) =>
          prev.map((s) => (s.id === editingId ? data.service : s))
        );
        toast.success("Service updated successfully");
      } else {
        // Add to list
        setServices((prev) => [...prev, data.service]);
        toast.success("Service added successfully");
      }

      // Reset form
      setForm({ title: "", description: "", price: "" });
      setEditingId(null);
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (service: Service) => {
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
    });
    setEditingId(service.id);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted successfully");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="space-y-12">
      {/* Service Form */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
        >
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Service Title"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Service Description"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <Input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="KSh 0"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-2">
            {loading
              ? "Saving..."
              : editingId
              ? "Update Service"
              : "Add Service"}
          </Button>
        </form>
      </section>

      {/* Services List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.length ? (
            services.map((service) => (
              <AdminServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No services available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
