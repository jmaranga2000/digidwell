export type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

export const mockBookings: Booking[] = [
  {
    id: "1",
    serviceTitle: "Software Installation",
    customerName: "Alice",
    customerEmail: "alice@example.com",
    status: "Pending",
  },
  {
    id: "2",
    serviceTitle: "Graphic Design",
    customerName: "Bob",
    customerEmail: "bob@example.com",
    status: "Confirmed",
  },
  {
    id: "3",
    serviceTitle: "Computer Upgrade",
    customerName: "John Doe",
    customerEmail: "customer@example.com",
    status: "Cancelled",
  },
];
