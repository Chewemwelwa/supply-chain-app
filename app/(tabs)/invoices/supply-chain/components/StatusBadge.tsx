import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/colors";
import { Invoice, Transaction } from "@/types";

interface StatusBadgeProps {
  status: Invoice["status"] | Transaction["status"];
  size?: "small" | "medium" | "large";
}

export default function StatusBadge({ status, size = "medium" }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "approved":
      case "completed":
        return Colors.success;
      case "paid":
      case "processing":
        return Colors.info;
      case "rejected":
      case "failed":
        return Colors.error;
      case "draft":
      case "pending":
        return Colors.warning;
      default:
        return Colors.textSecondary;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 10;
      case "large":
        return 14;
      default:
        return 12;
    }
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 2, paddingHorizontal: 6 };
      case "large":
        return { paddingVertical: 6, paddingHorizontal: 12 };
      default:
        return { paddingVertical: 4, paddingHorizontal: 8 };
    }
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getStatusColor() + "20" },
        getPadding(),
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: getStatusColor(), fontSize: getFontSize() },
        ]}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "500",
  },
});
