import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { useTheme } from "@react-navigation/native";

interface SettingsScreenProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export default function SettingsScreen({ toggleTheme, isDark }: SettingsScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Settings" icon="cog-outline" />
      <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
        <View style={styles.settingInfo}>
          <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
          <Text style={[styles.description, { color: colors.text, opacity: 0.7 }]}>
            Switch between light and dark theme
          </Text>
        </View>
        <Switch 
          value={isDark} 
          onValueChange={toggleTheme} 
          thumbColor={isDark ? colors.primary : colors.border}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  label: { 
    fontSize: 16, 
    fontWeight: "500",
    marginBottom: 4,
  },
  description: { 
    fontSize: 14,
  },
});