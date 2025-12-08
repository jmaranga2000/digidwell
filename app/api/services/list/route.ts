// app/api/services/list/route.ts
import { mockServices } from "@/lib/mockService";

export async function GET() {
  return new Response(JSON.stringify({ services: mockServices }), {
    headers: { "Content-Type": "application/json" },
  });
}
