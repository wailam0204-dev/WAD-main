import React, { useState } from "react";
import {View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Platform } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { useTheme } from "@react-navigation/native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function NoteDetailScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { id } = route.params;

  const [title, setTitle] = useState("Sample Note Title");
  const [content, setContent] = useState("This is the note content...");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSave = () => {
    // Part B: update note in storage
    navigation.goBack();
  };

  const handleDelete = () => {
    // Part B: delete note from storage
    Alert.alert(
      "Delete Note", 
      "Are you sure you want to delete this note? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => navigation.goBack() 
        },
      ]
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Part B: persist favorite status
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar 
        title="Note Detail" 
        icon="note-text" 
        rightIcon="check"
        onRightPress={handleSave}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <ScrollView>
          <TextInput
            style={[
              styles.title, 
              { 
                color: colors.text, 
                borderBottomColor: colors.border 
              }
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
            placeholderTextColor={colors.text + "80"}
          />
          <TextInput
            style={[
              styles.content, 
              { 
                color: colors.text 
              }
            ]}
            multiline
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            placeholderTextColor={colors.text + "80"}
            textAlignVertical="top"
          />
        </ScrollView>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.card }]}
            onPress={toggleFavorite}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={isFavorite ? colors.primary : colors.text}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.deleteButton, { backgroundColor: '#ff3b30' }]}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    borderBottomWidth: 1, 
    marginBottom: 16, 
    paddingVertical: 8,
  },
  content: { 
    fontSize: 16, 
    minHeight: 200, 
    textAlignVertical: "top",
    lineHeight: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  }
});


