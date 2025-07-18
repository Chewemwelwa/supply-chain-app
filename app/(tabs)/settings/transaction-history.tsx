import { useRouter } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, ExternalLink, Filter, X } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  currency: string;
  to?: string;
  from?: string;
  date: string;
  status: "completed" | "pending" | "failed";
  hash: string;
  gasUsed?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "received",
    amount: 0.0234,
    currency: "ETH",
    from: "0x1234...5678",
    date: "2025-07-18T10:30:00Z",
    status: "completed",
    hash: "0xabcd1234efgh5678ijkl9012mnop3456qrst7890",
    gasUsed: 21000,
  },
  {
    id: "2",
    type: "sent",
    amount: 0.0150,
    currency: "ETH",
    to: "0x9876...5432",
    date: "2025-07-17T14:20:00Z",
    status: "completed",
    hash: "0xefgh5678ijkl9012mnop3456qrst7890abcd1234",
    gasUsed: 25000,
  },
  {
    id: "3",
    type: "received",
    amount: 0.0089,
    currency: "ETH",
    from: "0x5555...7777",
    date: "2025-07-16T09:15:00Z",
    status: "pending",
    hash: "0xijkl9012mnop3456qrst7890abcd1234efgh5678",
  },
  {
    id: "4",
    type: "sent",
    amount: 0.0067,
    currency: "ETH",
    to: "0x3333...9999",
    date: "2025-07-15T16:45:00Z",
    status: "failed",
    hash: "0xmnop3456qrst7890abcd1234efgh5678ijkl9012",
    gasUsed: 18000,
  },
];

export default function TransactionHistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");

  const filteredTransactions = filter === "all" 
    ? mockTransactions 
    : mockTransactions.filter(tx => tx.type === filter);

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return Colors.success;
      case "pending":
        return Colors.warning;
      case "failed":
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionIcon,
          { backgroundColor: item.type === "received" ? Colors.success + "20" : Colors.error + "20" }
        ]}>
          {item.type === "received" ? (
            <ArrowDownLeft size={20} color={Colors.success} />
          ) : (
            <ArrowUpRight size={20} color={Colors.error} />
          )}
        </View>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>
            {item.type === "received" ? "Received" : "Sent"}
          </Text>
          <Text style={styles.transactionAddress}>
            {item.type === "received" ? `From: ${item.from}` : `To: ${item.to}`}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === "received" ? Colors.success : Colors.error }
        ]}>
          {item.type === "received" ? "+" : "-"}{item.amount.toFixed(4)} {item.currency}
        </Text>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) + "20" }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.explorerButton}
          onPress={() => {}}
        >
          <ExternalLink size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            <Button
              title="All"
              onPress={() => setFilter("all")}
              variant={filter === "all" ? "primary" : "outline"}
              size="small"
            />
            <Button
              title="Received"
              onPress={() => setFilter("received")}
              variant={filter === "received" ? "primary" : "outline"}
              size="small"
            />
            <Button
              title="Sent"
              onPress={() => setFilter("sent")}
              variant={filter === "sent" ? "primary" : "outline"}
              size="small"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Transactions</Text>
          <Text style={styles.summaryValue}>{filteredTransactions.length}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Volume</Text>
          <Text style={styles.summaryValue}>
            {filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(4)} ETH
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    flex: 0.48,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  transactionsList: {
    flex: 1,
  },
  transactionsContent: {
    paddingBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  transactionAddress: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: "monospace",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  explorerButton: {
    padding: 4,
  },
});
