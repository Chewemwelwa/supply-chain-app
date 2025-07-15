import { ExternalLink } from "lucide-react-native";
import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/colors";

interface BlockchainInfoProps {
  hash: string;
  timestamp?: string;
  compact?: boolean;
}

export default function BlockchainInfo({
  hash,
  timestamp,
  compact = false,
}: BlockchainInfoProps) {
  const handleViewOnExplorer = () => {
    // In a real app, this would link to a blockchain explorer
    Linking.openURL(`https://example.com/explorer/tx/${hash}`);
  };

  const shortenHash = (hash: string) => {
    if (compact) {
      return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
    }
    return hash;
  };

  return (
    <View style={styles.container}>
      <View style={styles.hashContainer}>
        <Text style={styles.label}>Blockchain Hash:</Text>
        <Text style={styles.hash}>{shortenHash(hash)}</Text>
      </View>
      
      {timestamp && (
        <View style={styles.timestampContainer}>
          <Text style={styles.label}>Timestamp:</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      )}
      
      {!compact && (
        <TouchableOpacity style={styles.button} onPress={handleViewOnExplorer}>
          <Text style={styles.buttonText}>View on Blockchain Explorer</Text>
          <ExternalLink size={16} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  hashContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  hash: {
    fontSize: 12,
    fontFamily: "monospace",
    color: Colors.text,
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
  },
});
