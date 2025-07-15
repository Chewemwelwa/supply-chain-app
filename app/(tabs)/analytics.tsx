import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/colors";
import { mockInvoices, mockProducts } from "@/constants/mockData";

export default function AnalyticsScreen() {
  // Calculate some analytics from mock data
  const totalRevenue = mockInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const paidInvoices = mockInvoices.filter((invoice) => invoice.status === "paid");
  const paidRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const pendingRevenue = totalRevenue - paidRevenue;
  
  // Calculate revenue by product
  const revenueByProduct = mockProducts.map((product) => {
    const revenue = mockInvoices.reduce((sum, invoice) => {
      const productItems = invoice.items.filter((item) => item.name === product.name);
      return sum + productItems.reduce((itemSum, item) => itemSum + (item.quantity * item.pricePerUnit), 0);
    }, 0);
    
    return {
      ...product,
      revenue,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Calculate monthly revenue (simplified for demo)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const monthlyRevenue = months.map((month, index) => ({
    month,
    revenue: Math.floor(Math.random() * 10000) + 5000,
  }));

  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Analytics</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
          <Text style={styles.summaryValue}>ZMW {totalRevenue.toLocaleString()}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.halfCard]}>
            <Text style={styles.summaryLabel}>Paid</Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              ZMW {paidRevenue.toLocaleString()}
            </Text>
          </View>
          
          <View style={[styles.summaryCard, styles.halfCard]}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryValue, { color: Colors.warning }]}>
              ZMW {pendingRevenue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Revenue</Text>
        <View style={styles.chartContainer}>
          {monthlyRevenue.map((item, index) => (
            <View key={index} style={styles.chartColumn}>
              <View 
                style={[
                  styles.chartBar, 
                  { 
                    height: `${(item.revenue / maxMonthlyRevenue) * 100}%`,
                    backgroundColor: index === 6 ? Colors.primary : Colors.primaryLight,
                  }
                ]} 
              />
              <Text style={styles.chartLabel}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue by Product</Text>
        {revenueByProduct.slice(0, 5).map((product, index) => (
          <View key={product.id} style={styles.productRow}>
            <View style={styles.productInfo}>
              <Text style={styles.productRank}>{index + 1}</Text>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <Text style={styles.productRevenue}>
              ZMW {product.revenue.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice Status</Text>
        <View style={styles.pieChartContainer}>
          <View style={styles.pieChart}>
            {/* Simplified pie chart representation */}
            <View style={[styles.pieSlice, styles.pieSlicePaid]} />
            <View style={[styles.pieSlice, styles.pieSlicePending]} />
            <View style={[styles.pieSlice, styles.pieSliceApproved]} />
          </View>
          
          <View style={styles.pieLabels}>
            <View style={styles.pieLabelRow}>
              <View style={[styles.pieLabelColor, { backgroundColor: Colors.success }]} />
              <Text style={styles.pieLabelText}>Paid</Text>
              <Text style={styles.pieLabelValue}>
                {Math.round((paidInvoices.length / mockInvoices.length) * 100)}%
              </Text>
            </View>
            
            <View style={styles.pieLabelRow}>
              <View style={[styles.pieLabelColor, { backgroundColor: Colors.warning }]} />
              <Text style={styles.pieLabelText}>Pending</Text>
              <Text style={styles.pieLabelValue}>
                {Math.round((mockInvoices.filter(i => i.status === "pending").length / mockInvoices.length) * 100)}%
              </Text>
            </View>
            
            <View style={styles.pieLabelRow}>
              <View style={[styles.pieLabelColor, { backgroundColor: Colors.info }]} />
              <Text style={styles.pieLabelText}>Approved</Text>
              <Text style={styles.pieLabelValue}>
                {Math.round((mockInvoices.filter(i => i.status === "approved").length / mockInvoices.length) * 100)}%
              </Text>
            </View>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfCard: {
    flex: 0.48,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  chartBar: {
    width: 20,
    minHeight: 4,
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "bold",
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    color: Colors.text,
  },
  productRevenue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  pieChartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.border,
    position: "relative",
    overflow: "hidden",
  },
  pieSlice: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  pieSlicePaid: {
    backgroundColor: Colors.success,
    width: "100%",
    height: "100%",
    transform: [{ translateX: 30 }],
  },
  pieSlicePending: {
    backgroundColor: Colors.warning,
    width: "50%",
    height: "100%",
    left: 0,
  },
  pieSliceApproved: {
    backgroundColor: Colors.info,
    width: "30%",
    height: "30%",
    top: 0,
    left: 0,
  },
  pieLabels: {
    flex: 1,
    marginLeft: 24,
  },
  pieLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pieLabelColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  pieLabelText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  pieLabelValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
});
