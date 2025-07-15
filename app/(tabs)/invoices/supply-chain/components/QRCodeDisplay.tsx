import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/colors";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  description?: string;
}

export default function QRCodeDisplay({
  value,
  size = 200,
  title,
  description,
}: QRCodeDisplayProps) {
  // In a real app, we would generate a QR code from the value
  // For this prototype, we'll use a placeholder image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.qrContainer, { width: size + 20, height: size + 20 }]}>
        <Image
          source={{ uri: qrImageUrl }}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  qrContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 300,
  },
});
