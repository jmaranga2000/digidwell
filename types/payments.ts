export interface Payment {
  id: string;
  phone: string | null;
  amount: number | null;
  status: "PENDING" | "SUCCESS" | "FAILED";
  serviceTitle: string;
  createdAt: string;
}