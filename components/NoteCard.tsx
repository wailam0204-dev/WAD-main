import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Platform } from "react-native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { Note } from '../App'; // Adjust the import path as needed

type NoteCardProps = {
  note: Note;
  onPress: () => void;
  onLongPress?: () => void; // Make optional if needed
};

export default function NoteCard({ note, onPress, onLongPress }: NoteCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: colors.card, 
          borderLeftColor: note.isFavorite ? colors.primary : 'transparent',
          borderLeftWidth: 4,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={note.isFavorite ? "star" : "note-text-outline"} 
          size={20} 
          color={note.isFavorite ? colors.primary : colors.text} 
        />
        <Text 
          style={[styles.title, { color: colors.text }]} 
          numberOfLines={1}
        >
          {note.title}
        </Text>
      </View>
      <Text 
        numberOfLines={3} 
        style={[styles.content, { color: colors.text }]}
      >
        {note.content}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.date, { color: colors.text, opacity: 0.6 }]}>
          {new Date().toLocaleDateString()}
        </Text>
        {note.isFavorite && (
          <MaterialCommunityIcons 
            name="star" 
            size={16} 
            color={colors.primary} 
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginLeft: 8,
    flex: 1,
  },
  content: { 
    fontSize: 14, 
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    fontSize: 12,
  }
});