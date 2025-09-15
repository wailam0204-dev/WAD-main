import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { useTheme } from "@react-navigation/native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddNoteScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    // Part B: save note to persistent storage
    navigation.goBack();
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar 
        title="Add Note" 
        icon="note-plus-outline" 
        rightIcon="check"
        onRightPress={isFormValid ? handleSave : undefined}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TextInput
          placeholder="Note Title"
          placeholderTextColor={colors.text + "80"}
          style={[
            styles.input, 
            { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <TextInput
          placeholder="Note Content"
          placeholderTextColor={colors.text + "80"}
          style={[
            styles.input, 
            styles.content, 
            { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
          multiline
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />
        
        <TouchableOpacity
          style={[
            styles.saveButton,
            { 
              backgroundColor: isFormValid ? colors.primary : colors.border,
              opacity: isFormValid ? 1 : 0.5
            }
          ]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text style={styles.saveButtonText}>Save Note</Text>
          <MaterialCommunityIcons name="check" size={20} color="white" />
        </TouchableOpacity>
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
  input: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  content: { 
    height: 200, 
    textAlignVertical: "top",
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  }
});