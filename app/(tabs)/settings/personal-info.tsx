import { useRouter } from "expo-router";
import { Edit, MapPin, Phone, User, X } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function PersonalInfoScreen() {
  const router = useRouter();

  const renderInfoItem = (icon: React.ReactNode, label: string, value: string) => (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Personal Information</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JM</Text>
        </View>
        <Text style={styles.profileName}>John Mulenga</Text>
        <Text style={styles.profileRole}>Farmer</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        {renderInfoItem(
          <User size={20} color={Colors.primary} />,
          "Full Name",
          "John Mulenga"
        )}
        {renderInfoItem(
          <Phone size={20} color={Colors.primary} />,
          "Phone Number",
          "+260 97 1234567"
        )}
        {renderInfoItem(
          <MapPin size={20} color={Colors.primary} />,
          "Location",
          "Chongwe, Lusaka"
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Details</Text>
        {renderInfoItem(
          <MapPin size={20} color={Colors.primary} />,
          "Farm Size",
          "5 hectares"
        )}
        {renderInfoItem(
          <User size={20} color={Colors.primary} />,
          "Crops Grown",
          "Maize, Soya Beans, Groundnuts"
        )}
        {renderInfoItem(
          <User size={20} color={Colors.primary} />,
          "Registration Date",
          "January 15, 2023"
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Verification Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: Colors.success + "20" }]}>
              <Text style={[styles.statusText, { color: Colors.success }]}>Verified</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Account Type</Text>
            <View style={[styles.statusBadge, { backgroundColor: Colors.info + "20" }]}>
              <Text style={[styles.statusText, { color: Colors.info }]}>Premium</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => router.push("/settings/edit-profile")}
          variant="primary"
          size="large"
          icon={<Edit size={18} color={Colors.background} />}
          fullWidth
        />
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
  profileSection: {
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + "40",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
  },
  statusContainer: {
    gap: 12,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});
