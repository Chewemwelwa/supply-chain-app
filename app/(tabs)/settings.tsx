import { useRouter } from "expo-router";
import { Bell, ChevronRight, HelpCircle, Info, Lock, LogOut, Shield, User } from "lucide-react-native";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            logout();
            // In a real app, we would navigate to the login screen
          }
        }
      ]
    );
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    description?: string
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <ChevronRight size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitials}>JM</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Mulenga</Text>
          <Text style={styles.profileRole}>Farmer</Text>
        </View>
        <Button
          title="Edit Profile"
          onPress={() => router.push("/settings/edit-profile")}
          variant="outline"
          size="small"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderSettingItem(
          <User size={22} color={Colors.primary} />,
          "Personal Information",
          () => router.push("/settings/personal-info"),
          "Update your personal details"
        )}
        {renderSettingItem(
          <Lock size={22} color={Colors.primary} />,
          "Security",
          () => router.push("/settings/security"),
          "Manage password and security settings"
        )}
        {renderSettingItem(
          <Bell size={22} color={Colors.primary} />,
          "Notifications",
          () => router.push("/settings/notifications"),
          "Configure notification preferences"
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blockchain</Text>
        {renderSettingItem(
          <Shield size={22} color={Colors.primary} />,
          "Blockchain Wallet",
          () => router.push("/settings/blockchain-wallet"),
          "Manage your blockchain wallet and keys"
        )}
        {renderSettingItem(
          <Info size={22} color={Colors.primary} />,
          "Transaction History",
          () => router.push("/settings/transaction-history"),
          "View your blockchain transaction history"
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        {renderSettingItem(
          <HelpCircle size={22} color={Colors.primary} />,
          "Help & Support",
          () => {},
          "Get help with using the app"
        )}
        {renderSettingItem(
          <Info size={22} color={Colors.primary} />,
          "About",
          () => {},
          "App version and information"
        )}
      </View>

      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          size="large"
          icon={<LogOut size={18} color={Colors.error} />}
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
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + "40",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutContainer: {
    marginBottom: 24,
  },
});
