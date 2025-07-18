import { useRouter } from "expo-router";
import { Copy, ExternalLink, Key, QrCode, RefreshCw, Send, Wallet, X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Clipboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import Colors from "@/constants/colors";

export default function BlockchainWalletScreen() {
  const router = useRouter();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [balance, setBalance] = useState(0.0234);

  const walletAddress = "0x742d35Cc6634C0532925a3b8D4C8f8b4C8f8b4C8";
  const privateKey = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  const handleCopyAddress = () => {
    Clipboard.setString(walletAddress);
    Alert.alert("Copied", "Wallet address copied to clipboard");
  };

  const handleCopyPrivateKey = () => {
    Clipboard.setString(privateKey);
    Alert.alert("Copied", "Private key copied to clipboard");
  };

  const handleRefreshBalance = () => {
    Alert.alert("Balance Updated", "Your wallet balance has been refreshed");
  };

  const handleSendTokens = () => {
    Alert.alert("Send Tokens", "This feature is not available in the demo");
  };

  const handleViewOnExplorer = () => {
    Alert.alert("Blockchain Explorer", "This would open the blockchain explorer");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Blockchain Wallet</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceSection}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <TouchableOpacity onPress={handleRefreshBalance}>
              <RefreshCw size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceValue}>{balance.toFixed(4)} ETH</Text>
          <Text style={styles.balanceUsd}>≈ $42.50 USD</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Address</Text>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{walletAddress}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyAddress}>
            <Copy size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <QRCodeDisplay
          value={walletAddress}
          size={150}
          title="Wallet Address QR Code"
          description="Scan this QR code to get your wallet address"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Private Key</Text>
        
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Never share your private key with anyone. Keep it secure and private.
          </Text>
        </View>

        {showPrivateKey ? (
          <View style={styles.privateKeyContainer}>
            <Text style={styles.privateKeyText}>{privateKey}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyPrivateKey}>
              <Copy size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.hiddenKeyContainer}>
            <Text style={styles.hiddenKeyText}>••••••••••••••••••••••••••••••••</Text>
          </View>
        )}

        <Button
          title={showPrivateKey ? "Hide Private Key" : "Show Private Key"}
          onPress={() => setShowPrivateKey(!showPrivateKey)}
          variant="outline"
          size="medium"
          icon={<Key size={16} color={Colors.primary} />}
          fullWidth
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSendTokens}>
            <Send size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <QrCode size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleViewOnExplorer}>
            <ExternalLink size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Explorer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Wallet size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Backup</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Information</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Network</Text>
            <Text style={styles.infoValue}>Ethereum Mainnet</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Wallet Type</Text>
            <Text style={styles.infoValue}>HD Wallet</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.infoValue}>January 15, 2023</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Sync</Text>
            <Text style={styles.infoValue}>Just now</Text>
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
  balanceSection: {
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.background,
    marginRight: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 4,
  },
  balanceUsd: {
    fontSize: 16,
    color: Colors.background + "CC",
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
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "monospace",
    color: Colors.text,
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
  warningBox: {
    backgroundColor: Colors.warning + "20",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.warning + "40",
  },
  warningText: {
    fontSize: 14,
    color: Colors.warning,
    textAlign: "center",
  },
  privateKeyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  privateKeyText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "monospace",
    color: Colors.text,
  },
  hiddenKeyContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  hiddenKeyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 8,
  },
  infoContainer: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
});
