import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mockInvoices } from "@/constants/mockData";
import { Invoice } from "@/types";

interface InvoiceState {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
  fetchInvoices: () => Promise<void>;
  selectInvoice: (id: string) => void;
  createInvoice: (invoice: Omit<Invoice, "id" | "blockchainHash">) => Promise<void>;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoices: [],
      selectedInvoice: null,
      isLoading: false,
      error: null,
      fetchInvoices: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          // Simulating API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({ invoices: mockInvoices, isLoading: false });
        } catch (error) {
          set({ error: "Failed to fetch invoices", isLoading: false });
        }
      },
      selectInvoice: (id: string) => {
        const invoice = get().invoices.find((inv) => inv.id === id) || null;
        set({ selectedInvoice: invoice });
      },
      createInvoice: async (invoiceData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate blockchain transaction
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          const newInvoice: Invoice = {
            ...invoiceData,
            id: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
            blockchainHash: `0x${Array.from({ length: 40 }, () => 
              Math.floor(Math.random() * 16).toString(16)).join("")}`,
          };
          
          set((state) => ({ 
            invoices: [...state.invoices, newInvoice],
            isLoading: false 
          }));
        } catch (error) {
          set({ error: "Failed to create invoice", isLoading: false });
        }
      },
      updateInvoiceStatus: async (id: string, status: Invoice["status"]) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate blockchain transaction
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          set((state) => ({
            invoices: state.invoices.map((invoice) => 
              invoice.id === id ? { ...invoice, status } : invoice
            ),
            selectedInvoice: state.selectedInvoice?.id === id 
              ? { ...state.selectedInvoice, status } 
              : state.selectedInvoice,
            isLoading: false
          }));
        } catch (error) {
          set({ error: "Failed to update invoice status", isLoading: false });
        }
      },
    }),
    {
      name: "invoice-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
