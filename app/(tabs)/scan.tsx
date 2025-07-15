import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { QrCode, X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <QrCode size={64} color={Colors.primary} />
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          We need camera permission to scan QR codes for invoice verification.
        </Text>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    try {
      // In a real app, we would validate the QR code data format
      // and navigate to the appropriate screen
      
      // For demo purposes, we'll assume it's an invoice ID
      if (data.startsWith("INV-")) {
        router.push(`/invoices/${data}`);
      } else {
        Alert.alert(
          "Invalid QR Code",
          "This QR code is not a valid invoice. Please try scanning a valid invoice QR code.",
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to process the QR code. Please try again.",
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Scan Invoice QR Code</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <X size={24} color={Colors.background} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scanArea}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Position the QR code within the frame
            </Text>
          </View>
          
          {scanned && (
            <View style={styles.rescanButtonContainer}>
              <Button
                title="Scan Again"
                onPress={() => setScanned(false)}
                variant="primary"
                size="large"
              />
            </View>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.background,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  scanText: {
    fontSize: 16,
    color: Colors.background,
    marginTop: 24,
    textAlign: "center",
  },
  rescanButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
