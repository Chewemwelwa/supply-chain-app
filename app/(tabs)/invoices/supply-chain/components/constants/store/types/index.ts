export interface Farmer {
  id: string;
  name: string;
  location: string;
  phone: string;
  crops?: string[];
  farmSize?: string;
  registrationDate?: string;
}

export interface Buyer {
  id: string;
  name: string;
  location: string;
  industry?: string;
  contactPerson?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  averagePrice: number;
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  farmer: {
    id: string;
    name: string;
    location: string;
    phone: string;
  };
  buyer: {
    id: string;
    name: string;
    location: string;
  };
  items: InvoiceItem[];
  status: "draft" | "pending" | "approved" | "rejected" | "paid";
  totalAmount: number;
  currency: string;
  blockchainHash: string;
}

export interface Transaction {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "pending" | "processing" | "completed" | "failed";
  blockchainHash: string;
}

export interface SupplyChainEvent {
  id: string;
  productId: string;
  farmerId: string;
  buyerId?: string;
  event: string;
  location: string;
  timestamp: string;
  details: string;
  blockchainHash: string;
}

export type UserRole = "farmer" | "buyer" | "taxAuthority";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  phone: string;
  farmerId?: string;
  buyerId?: string;
}
