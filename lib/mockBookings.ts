export interface MockBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

// Shared in-memory bookings array
export const mockBookings: MockBooking[] = [];
