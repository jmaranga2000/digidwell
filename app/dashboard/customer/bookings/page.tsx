import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function CustomerBookingsPage({ request }: { request: Request }) {
  const user = await getCurrentUser(request);
  if (!user) return <p className="p-6">Unauthorized</p>;

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { 
      service: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Service</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Note</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border px-2 py-1">{b.service.title}</td>
              <td className="border px-2 py-1">{new Date(b.date).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{b.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
