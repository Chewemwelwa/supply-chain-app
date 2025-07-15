import { useRouter } from "expo-router";
import { FileText, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import InvoiceCard from "@/components/InvoiceCard";
import Colors from "@/constants/colors";
import { useInvoiceStore } from "@/store/invoiceStore";

export default function InvoicesScreen() {
  const router = useRouter();
  const { invoices, isLoading, fetchInvoices } = useInvoiceStore();
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const navigateToCreateInvoice = () => {
    router.push("/invoices/create");
  };

  const filteredInvoices = filter
    ? invoices.filter((invoice) => invoice.status === filter)
    : invoices;

  const renderFilterButton = (label: string, value: string | null) => (
    <Button
      title={label}
      onPress={() => setFilter(value)}
      variant={filter === value ? "primary" : "outline"}
      size="small"
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <Button
          title="Create"
          onPress={navigateToCreateInvoice}
          icon={<Plus size={16} color={Colors.background} />}
        />
      </View>

      <View style={styles.filtersContainer}>
        {renderFilterButton("All", null)}
        {renderFilterButton("Pending", "pending")}
        {renderFilterButton("Approved", "approved")}
        {renderFilterButton("Paid", "paid")}
      </View>

      {filteredInvoices.length === 0 ? (
        <EmptyState
          title="No invoices found"
          description={
            filter
              ? `You don't have any ${filter} invoices yet.`
              : "You haven't created any invoices yet."
          }
          icon={<FileText size={48} color={Colors.textSecondary} />}
          actionLabel="Create Invoice"
          onAction={navigateToCreateInvoice}
        />
      ) : (
        <FlatList
          data={filteredInvoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <InvoiceCard invoice={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
});
