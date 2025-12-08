"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [form, setForm] = useState({ name: "", description: "", category: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch templates (mock API)
  useEffect(() => {
    fetch("/api/templates/list")
      .then((res) => res.json())
      .then((data) => setTemplates(data.templates));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...form, id: editingId } : form;

      const res = await fetch("/api/templates", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Operation failed.");
        return;
      }

      if (editingId) {
        setTemplates(templates.map((t) => (t.id === editingId ? data.template : t)));
        toast.success("Template updated successfully!");
      } else {
        setTemplates([...templates, data.template]);
        toast.success("Template added successfully!");
      }

      setForm({ name: "", description: "", category: "" });
      setEditingId(null);
    } catch {
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template: Template) => {
    setForm({ name: template.name, description: template.description, category: template.category });
    setEditingId(template.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTemplates(templates.filter((t) => t.id !== id));
      toast.success("Template deleted successfully!");
    } catch {
      toast.error("Could not delete template.");
    }
  };

  return (
    <div className="space-y-12">
      {/* Template Form */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Template" : "Add New Template"}</h2>
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Template Name" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Template Description" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <Input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
          </div>
          <Button type="submit" disabled={loading} className="w-full py-2">
            {loading ? "Saving..." : editingId ? "Update Template" : "Add Template"}
          </Button>
        </form>
      </section>

      {/* Templates List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Templates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {templates.length ? (
            templates.map((template) => (
              <div key={template.id} className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                <h3 className="font-semibold text-primary">{template.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{template.description}</p>
                <p className="text-gray-500 dark:text-gray-400">Category: {template.category}</p>
                <div className="mt-2 flex justify-between gap-2">
                  <Button onClick={() => handleEdit(template)} className="bg-yellow-600 text-white px-3 py-1 rounded">Edit</Button>
                  <Button onClick={() => handleDelete(template.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No templates available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
