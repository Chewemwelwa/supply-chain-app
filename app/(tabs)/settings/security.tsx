import { useRouter } from "expo-router";
import { Eye, EyeOff, Key, Lock, Shield, Smartphone, X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function SecurityScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }
    
    Alert.alert("Success", "Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const renderPasswordInput = (
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    showPassword: boolean,
    toggleShow: () => void
  ) => (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.eyeButton} onPress={toggleShow}>
        {showPassword ? (
          <EyeOff size={20} color={Colors.textSecondary} />
        ) : (
          <Eye size={20} color={Colors.textSecondary} />
        )}
      </TouchableOpacity>
    </View>
  );

  const renderSecurityOption = (
    icon: React.ReactNode,
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.securityOption}>
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
        <Text style={styles.title}>Security</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          {renderPasswordInput(
            currentPassword,
            setCurrentPassword,
            "Enter current password",
            showCurrentPassword,
            () => setShowCurrentPassword(!showCurrentPassword)
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          {renderPasswordInput(
            newPassword,
            setNewPassword,
            "Enter new password",
            showNewPassword,
            () => setShowNewPassword(!showNewPassword)
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          {renderPasswordInput(
            confirmPassword,
            setConfirmPassword,
            "Confirm new password",
            showConfirmPassword,
            () => setShowConfirmPassword(!showConfirmPassword)
          )}
        </View>

        <Button
          title="Change Password"
          onPress={handleChangePassword}
          variant="primary"
          size="medium"
          icon={<Key size={16} color={Colors.background} />}
          fullWidth
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Options</Text>
        
        {renderSecurityOption(
          <Smartphone size={20} color={Colors.primary} />,
          "Two-Factor Authentication",
          "Add an extra layer of security with SMS verification",
          twoFactorEnabled,
          setTwoFactorEnabled
        )}

        {renderSecurityOption(
          <Shield size={20} color={Colors.primary} />,
          "Biometric Authentication",
          "Use fingerprint or face recognition to unlock",
          biometricEnabled,
          setBiometricEnabled
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Security</Text>
        
        <View style={styles.securityStatus}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Last Password Change</Text>
            <Text style={styles.statusValue}>30 days ago</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Login Sessions</Text>
            <Text style={styles.statusValue}>2 active sessions</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Security Score</Text>
            <View style={[styles.statusBadge, { backgroundColor: Colors.success + "20" }]}>
              <Text style={[styles.statusText, { color: Colors.success }]}>Strong</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.dangerZone}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <Button
          title="Deactivate Account"
          onPress={() => Alert.alert("Deactivate Account", "This feature is not available in the demo")}
          variant="outline"
          size="medium"
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  eyeButton: {
    padding: 12,
  },
  securityOption: {
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
  securityStatus: {
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
  statusValue: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  dangerZone: {
    backgroundColor: Colors.error + "10",
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.error + "30",
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.error,
    marginBottom: 12,
  },
});
