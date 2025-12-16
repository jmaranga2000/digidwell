export interface Payment {
  id: string;
  phone: string;
  amount: number;
  status: "Pending" | "Success" | "Failed";
  serviceTitle?: string;
  createdAt: string;
}