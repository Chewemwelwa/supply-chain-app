import { useRouter } from "expo-router";
import { ArrowRight, CheckCircle, Clock, DollarSign, XCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/colors";
import { Invoice } from "@/types";

interface InvoiceCardProps {
  invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const router = useRouter();

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "approved":
        return Colors.success;
      case "paid":
        return Colors.info;
      case "rejected":
        return Colors.error;
      default:
        return Colors.warning;
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={18} color={Colors.success} />;
      case "paid":
        return <DollarSign size={18} color={Colors.info} />;
      case "rejected":
        return <XCircle size={18} color={Colors.error} />;
      default:
        return <Clock size={18} color={Colors.warning} />;
    }
  };

  const handlePress = () => {
    router.push(`/invoices/${invoice.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.invoiceId}>{invoice.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) + "20" }]}>
          <View style={styles.statusIconContainer}>
            {getStatusIcon(invoice.status)}
          </View>
          <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.parties}>
        <View style={styles.party}>
          <Text style={styles.partyLabel}>Farmer</Text>
          <Text style={styles.partyName}>{invoice.farmer.name}</Text>
          <Text style={styles.partyLocation}>{invoice.farmer.location}</Text>
        </View>
        <ArrowRight size={20} color={Colors.textSecondary} />
        <View style={styles.party}>
          <Text style={styles.partyLabel}>Buyer</Text>
          <Text style={styles.partyName}>{invoice.buyer.name}</Text>
          <Text style={styles.partyLocation}>{invoice.buyer.location}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.dateLabel}>Invoice Date</Text>
          <Text style={styles.date}>{invoice.date}</Text>
        </View>
        <View style={styles.amount}>
          <Text style={styles.amountValue}>
            {invoice.currency} {invoice.totalAmount.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIconContainer: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  parties: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  party: {
    flex: 1,
  },
  partyLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  partyName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 2,
  },
  partyLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dateLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: Colors.text,
  },
  amount: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
