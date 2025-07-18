import { useRouter } from "expo-router";
import { Bell, BellOff, Mail, MessageSquare, Smartphone, X } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/colors";

export default function NotificationsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [invoiceUpdates, setInvoiceUpdates] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const renderNotificationOption = (
    icon: React.ReactNode,
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.notificationOption}>
      <View style={styles.optionLeft}>
        <View style={styles.optionIcon}>{icon}</View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        thumbColor={value ? Colors.primary : Colors.textSecondary}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Channels</Text>
        
        {renderNotificationOption(
          <Smartphone size={20} color={Colors.primary} />,
          "Push Notifications",
          "Receive notifications on your mobile device",
          pushNotifications,
          setPushNotifications
        )}

        {renderNotificationOption(
          <Mail size={20} color={Colors.primary} />,
          "Email Notifications",
          "Receive notifications via email",
          emailNotifications,
          setEmailNotifications
        )}

        {renderNotificationOption(
          <MessageSquare size={20} color={Colors.primary} />,
          "SMS Notifications",
          "Receive important alerts via SMS",
          smsNotifications,
          setSmsNotifications
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice & Payment Alerts</Text>
        
        {renderNotificationOption(
          <Bell size={20} color={Colors.primary} />,
          "Invoice Updates",
          "Get notified when invoice status changes",
          invoiceUpdates,
          setInvoiceUpdates
        )}

        {renderNotificationOption(
          <Bell size={20} color={Colors.primary} />,
          "Payment Alerts",
          "Receive alerts for payments and transactions",
          paymentAlerts,
          setPaymentAlerts
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security & Account</Text>
        
        {renderNotificationOption(
          <Bell size={20} color={Colors.primary} />,
          "Security Alerts",
          "Important security and login notifications",
          securityAlerts,
          setSecurityAlerts
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Marketing & Updates</Text>
        
        {renderNotificationOption(
          <BellOff size={20} color={Colors.textSecondary} />,
          "Marketing Emails",
          "Promotional content and feature updates",
          marketingEmails,
          setMarketingEmails
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification History</Text>
        
        <View style={styles.historyContainer}>
          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <Bell size={16} color={Colors.primary} />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>Invoice INV-001 Approved</Text>
              <Text style={styles.historyTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <Bell size={16} color={Colors.success} />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>Payment Received - ZMW 9,000</Text>
              <Text style={styles.historyTime}>1 day ago</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <Bell size={16} color={Colors.info} />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>New Invoice Created</Text>
              <Text style={styles.historyTime}>3 days ago</Text>
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
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + "40",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  historyContainer: {
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight + "40",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
