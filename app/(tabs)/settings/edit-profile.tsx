import { useRouter } from "expo-router";
import { Camera, Save, User, X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("John Mulenga");
  const [email, setEmail] = useState("john.mulenga@example.com");
  const [phone, setPhone] = useState("+260 97 1234567");
  const [location, setLocation] = useState("Chongwe, Lusaka");
  const [farmSize, setFarmSize] = useState("5 hectares");
  const [crops, setCrops] = useState("Maize, Soya Beans, Groundnuts");

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JM</Text>
        </View>
        <TouchableOpacity style={styles.changePhotoButton}>
          <Camera size={16} color={Colors.primary} />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Farm Size</Text>
          <TextInput
            style={styles.input}
            value={farmSize}
            onChangeText={setFarmSize}
            placeholder="Enter farm size"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Crops Grown</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={crops}
            onChangeText={setCrops}
            placeholder="Enter crops you grow"
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={handleSave}
          variant="primary"
          size="large"
          icon={<Save size={18} color={Colors.background} />}
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
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + "40",
  },
  changePhotoText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
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
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});
