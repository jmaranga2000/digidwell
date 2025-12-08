// app/api/services/[id]/route.ts
import { mockServices } from "@/lib/mockService";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const service = mockServices.find(s => s.id === params.id);
  if (!service) {
    return new Response(JSON.stringify({ error: "Service not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ service }), {
    headers: { "Content-Type": "application/json" },
  });
}
