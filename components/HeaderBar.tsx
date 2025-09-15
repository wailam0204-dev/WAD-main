import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

type Props = {
  title: string;
  icon: string;
  rightIcon?: string;
  onRightPress?: () => void;
};

export default function HeaderBar({ title, icon, rightIcon, onRightPress }: Props) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.leftContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="white" />
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && (
        <TouchableOpacity style={styles.rightIcon} onPress={onRightPress}>
          <MaterialCommunityIcons name={rightIcon} size={26} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  rightIcon: { 
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
});