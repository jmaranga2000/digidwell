// types/bookings.ts

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

/** Used by CUSTOMERS */
export interface CustomerBooking {
  id: string;
  serviceTitle: string;
  status: BookingStatus;
}

/** Used by ADMINS */
export interface AdminBooking extends CustomerBooking {
  customerName: string;
  customerEmail: string;
}