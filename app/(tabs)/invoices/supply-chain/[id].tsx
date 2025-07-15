import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BlockchainInfo from "@/components/BlockchainInfo";
import Colors from "@/constants/colors";
import { mockSupplyChainEvents } from "@/constants/mockData";

export default function SupplyChainScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // In a real app, we would fetch supply chain events for the specific product/invoice
  // For demo purposes, we'll use the mock data
  const events = mockSupplyChainEvents;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Supply Chain Traceability</Text>
      <Text style={styles.subtitle}>Product ID: {id || "P001"}</Text>
      
      <View style={styles.timeline}>
        {events.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot} />
              {index < events.length - 1 && <View style={styles.timelineLine} />}
            </View>
            
            <View style={styles.timelineContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventType}>{event.event}</Text>
                <Text style={styles.eventDate}>
                  {new Date(event.timestamp).toLocaleDateString()}
                </Text>
              </View>
              
              <Text style={styles.eventLocation}>{event.location}</Text>
              <Text style={styles.eventDetails}>{event.details}</Text>
              
              <BlockchainInfo hash={event.blockchainHash} compact />
            </View>
          </View>
        ))}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timelineLeft: {
    width: 24,
    alignItems: "center",
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.primary,
    marginTop: 4,
    marginLeft: 7,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
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
    borderBottomColor: Colors.border,
  },
});
