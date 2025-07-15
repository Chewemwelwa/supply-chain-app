import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, Download, Edit, Printer, Share2, XCircle } from "lucide-react-native";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import BlockchainInfo from "@/components/BlockchainInfo";
import Button from "@/components/Button";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import StatusBadge from "@/components/StatusBadge";
import Colors from "@/constants/colors";
import { useInvoiceStore } from "@/store/invoiceStore";

export default function InvoiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { selectedInvoice, selectInvoice, updateInvoiceStatus, isLoading } = useInvoiceStore();

  useEffect(() => {
    if (id) {
      selectInvoice(id);
    }
  }, [id, selectInvoice]);

  if (!selectedInvoice) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading invoice...</Text>
      </View>
    );
  }

  const handleApproveInvoice = () => {
    Alert.alert(
      "Approve Invoice",
      "Are you sure you want to approve this invoice?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Approve", 
          onPress: async () => {
            await updateInvoiceStatus(selectedInvoice.id, "approved");
            Alert.alert("Success", "Invoice has been approved");
          }
        }
      ]
    );
  };

  const handleRejectInvoice = () => {
    Alert.alert(
      "Reject Invoice",
      "Are you sure you want to reject this invoice?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reject", 
          style: "destructive",
          onPress: async () => {
            await updateInvoiceStatus(selectedInvoice.id, "rejected");
            Alert.alert("Invoice Rejected", "The invoice has been rejected");
          }
        }
      ]
    );
  };

  const handleMarkAsPaid = () => {
    Alert.alert(
      "Mark as Paid",
      "Are you sure you want to mark this invoice as paid?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Mark as Paid", 
          onPress: async () => {
            await updateInvoiceStatus(selectedInvoice.id, "paid");
            Alert.alert("Success", "Invoice has been marked as paid");
          }
        }
      ]
    );
  };

  const calculateSubtotal = () => {
    return selectedInvoice.items.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.16; // 16% VAT in Zambia
  const total = subtotal + tax;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.invoiceId}>{selectedInvoice.id}</Text>
          <Text style={styles.date}>
            Issued: {selectedInvoice.date} | Due: {selectedInvoice.dueDate}
          </Text>
        </View>
        <StatusBadge status={selectedInvoice.status} size="large" />
      </View>

      <View style={styles.section}>
        <View style={styles.partiesContainer}>
          <View style={styles.party}>
            <Text style={styles.partyLabel}>From</Text>
            <Text style={styles.partyName}>{selectedInvoice.farmer.name}</Text>
            <Text style={styles.partyDetail}>{selectedInvoice.farmer.location}</Text>
            <Text style={styles.partyDetail}>{selectedInvoice.farmer.phone}</Text>
          </View>
          
          <View style={styles.party}>
            <Text style={styles.partyLabel}>To</Text>
            <Text style={styles.partyName}>{selectedInvoice.buyer.name}</Text>
            <Text style={styles.partyDetail}>{selectedInvoice.buyer.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Item</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Price</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Total</Text>
        </View>
        
        {selectedInvoice.items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.name}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {item.quantity} {item.unit}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {selectedInvoice.currency} {item.pricePerUnit.toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {selectedInvoice.currency} {(item.quantity * item.pricePerUnit).toFixed(2)}
            </Text>
          </View>
        ))}
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {selectedInvoice.currency} {subtotal.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT (16%)</Text>
            <Text style={styles.summaryValue}>
              {selectedInvoice.currency} {tax.toFixed(2)}
            </Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {selectedInvoice.currency} {total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blockchain Verification</Text>
        <BlockchainInfo 
          hash={selectedInvoice.blockchainHash} 
          timestamp={`${selectedInvoice.date}T12:00:00Z`} 
        />
        
        <QRCodeDisplay 
          value={selectedInvoice.id}
          title="Scan to verify this invoice"
          description="This QR code contains a unique identifier that can be used to verify the authenticity of this invoice on the blockchain."
        />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.actionRow}>
          <Button
            title="Share"
            onPress={() => {}}
            variant="outline"
            icon={<Share2 size={18} color={Colors.primary} />}
          />
          <Button
            title="Download"
            onPress={() => {}}
            variant="outline"
            icon={<Download size={18} color={Colors.primary} />}
          />
          <Button
            title="Print"
            onPress={() => {}}
            variant="outline"
            icon={<Printer size={18} color={Colors.primary} />}
          />
        </View>
        
        {selectedInvoice.status === "pending" && (
          <View style={styles.approvalActions}>
            <Button
              title="Approve"
              onPress={handleApproveInvoice}
              variant="primary"
              icon={<CheckCircle size={18} color={Colors.background} />}
              loading={isLoading}
              fullWidth
            />
            <Button
              title="Reject"
              onPress={handleRejectInvoice}
              variant="outline"
              icon={<XCircle size={18} color={Colors.error} />}
              loading={isLoading}
              fullWidth
            />
          </View>
        )}
        
        {selectedInvoice.status === "approved" && (
          <Button
            title="Mark as Paid"
            onPress={handleMarkAsPaid}
            variant="primary"
            loading={isLoading}
            fullWidth
          />
        )}
        
        {selectedInvoice.status === "draft" && (
          <Button
            title="Edit Invoice"
            onPress={() => {}}
            variant="primary"
            icon={<Edit size={18} color={Colors.background} />}
            fullWidth
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  invoiceId: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  partiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  party: {
    flex: 1,
    padding: 8,
  },
  partyLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  partyName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  partyDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + "50",
  },
  tableCell: {
    fontSize: 14,
    color: Colors.text,
  },
  summaryContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.text,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border + "50",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  approvalActions: {
    gap: 12,
  },
});
