import { Stack } from "expo-router";
import React from "react";

import Colors from "@/constants/colors";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.surface,
        },
      }}
    >
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          title: "Edit Profile",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="personal-info" 
        options={{ 
          title: "Personal Information",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="security" 
        options={{ 
          title: "Security",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          title: "Notifications",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="blockchain-wallet" 
        options={{ 
          title: "Blockchain Wallet",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="transaction-history" 
        options={{ 
          title: "Transaction History",
          presentation: "card",
        }} 
      />
    </Stack>
  );
}
