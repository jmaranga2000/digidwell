"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/sonner";

export default function BookProductPage({ params }: { params: { categoryId: string; productId: string } }) {
  const { productId } = params;
  const [product, setProduct] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/services/product/${productId}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  async function handleBooking() {
    if (!phone) return toast.error("Please enter your phone number");
    setLoading(true);

    try {
      const res = await fetch("/api/services/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, phone, note }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("STK Push sent! Complete payment on your phone.");
      } else {
        toast.error(data.error || "Booking failed");
      }
    } catch (err) {
      toast.error("Network error, booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (!product) return <p className="p-6 text-center">Loading product...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      {product.image && <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-lg" />}
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold text-lg">KES {product.price.toLocaleString()}</p>

      <Input
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full"
      />
      <Textarea
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        className="w-full"
      />

      <Button onClick={handleBooking} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {loading ? "Processing..." : "Book & Pay"}
      </Button>

      <Toaster richColors position="top-right" />
    </div>
  );
}