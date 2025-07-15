import { useRouter } from "expo-router";
import { BarChart3, FileText, Plus, Truck } from "lucide-react-native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BlockchainInfo from "@/components/BlockchainInfo";
import Button from "@/components/Button";
import InvoiceCard from "@/components/InvoiceCard";
import Colors from "@/constants/colors";
import { mockInvoices, mockSupplyChainEvents, mockTransactions } from "@/constants/mockData";
import { useInvoiceStore } from "@/store/invoiceStore";

export default function DashboardScreen() {
  const router = useRouter();
  const { fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const recentInvoices = mockInvoices.slice(0, 2);
  const recentTransaction = mockTransactions[0];
  const recentSupplyChainEvent = mockSupplyChainEvents[mockSupplyChainEvents.length - 1];

  const navigateToCreateInvoice = () => {
    router.push("/invoices/create");
  };

  const navigateToInvoices = () => {
    router.push("/invoices");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>John Mulenga</Text>
        </View>
        <Button
          title="New Invoice"
          onPress={navigateToCreateInvoice}
          icon={<Plus size={16} color={Colors.background} />}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: Colors.primary + "20" }]}>
            <FileText size={20} color={Colors.primary} />
          </View>
          <Text style={styles.statValue}>{mockInvoices.length}</Text>
          <Text style={styles.statLabel}>Invoices</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: Colors.info + "20" }]}>
            <Truck size={20} color={Colors.info} />
          </View>
          <Text style={styles.statValue}>{mockSupplyChainEvents.length}</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: Colors.success + "20" }]}>
            <BarChart3 size={20} color={Colors.success} />
          </View>
          <Text style={styles.statValue}>ZMW 20,850</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Invoices</Text>
          <TouchableOpacity onPress={navigateToInvoices}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {recentInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Transaction</Text>
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionId}>{recentTransaction.id}</Text>
            <Text style={styles.transactionDate}>{recentTransaction.date}</Text>
          </View>
          
          <View style={styles.transactionDetails}>
            <View>
              <Text style={styles.transactionLabel}>Amount</Text>
              <Text style={styles.transactionAmount}>
                {recentTransaction.currency} {recentTransaction.amount.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={styles.transactionLabel}>Payment Method</Text>
              <Text style={styles.transactionMethod}>{recentTransaction.paymentMethod}</Text>
            </View>
            <View>
              <Text style={styles.transactionLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: Colors.success + "20" }]}>
                <Text style={[styles.statusText, { color: Colors.success }]}>
                  {recentTransaction.status.charAt(0).toUpperCase() + recentTransaction.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <BlockchainInfo hash={recentTransaction.blockchainHash} compact />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Supply Chain Event</Text>
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventType}>{recentSupplyChainEvent.event}</Text>
            <Text style={styles.eventDate}>
              {new Date(recentSupplyChainEvent.timestamp).toLocaleDateString()}
            </Text>
          </View>
          
          <Text style={styles.eventLocation}>{recentSupplyChainEvent.location}</Text>
          <Text style={styles.eventDetails}>{recentSupplyChainEvent.details}</Text>
          
          <BlockchainInfo hash={recentSupplyChainEvent.blockchainHash} compact />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  transactionCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  transactionLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.success,
  },
  transactionMethod: {
    fontSize: 14,
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  eventCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  eventType: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  eventLocation: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  eventDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
});
