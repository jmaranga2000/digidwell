export interface MockOrder {
  id: string;
  serviceId?: string;
  serviceTitle?: string;
  customerName?: string;
  customerEmail?: string;
  status?: string;
  [key: string]: any;
}

// Shared mock orders array
export const mockOrders: MockOrder[] = [];
