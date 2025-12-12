import React from "react";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Input } from "@/components/ui/input";

async function getService(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/services/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getService(params.id);

  if (!service) return notFound();

  async function updateService(formData: FormData) {
    "use server";

    const id = params.id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/services/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update service.");
    }

    redirect("/dashboard/admin/service");
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Service</h1>

      <form action={updateService} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="block font-medium mb-1">Service Title</label>
          <Input
            name="title"
            defaultValue={service.title}
            className="w-full p-3 rounded border border-gray-300 bg-white"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <Textarea
            name="description"
            rows={4}
            defaultValue={service.description}
            className="w-full p-3 rounded border border-gray-300 bg-white"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-medium mb-1">Price (KES)</label>
          <Input
            name="price"
            type="number"
            min="0"
            defaultValue={service.price}
            className="w-full p-3 rounded border border-gray-300 bg-white"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-2">Service Image</label>

          {/* Current Image Preview */}
          {service.imageUrl && (
            <Image
              src={service.imageUrl}
              alt="Service Image"
              className="w-40 h-40 object-cover rounded mb-3 border"
            />
          )}

          <Input
            type="file"
            name="image"
            accept="image/*"
            className="block"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button type="submit" className="px-6">
          Update Service
        </Button>
      </form>
    </div>
  );
}
