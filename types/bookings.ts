// types/bookings.ts

/** Booking status for both customers and admins */
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

/** Customer view of a booking */
export interface CustomerBooking {
  id: string;
  serviceTitle: string;
  status: BookingStatus;
  createdAt: string; // optional, depending on API
}

/** Admin view of a booking */
export interface AdminBooking {
  id: string;
  note: string;
  date: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  service: {
    id: string;
    title: string;
  };
  status: BookingStatus;
}