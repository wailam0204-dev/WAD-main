import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import NoteCard from "../components/NoteCard";
import HeaderBar from "../components/HeaderBar";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Note } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

type HomeNavProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const { colors } = useTheme();

  // Part B: load notes from storage
  // const [notes] = useState<Note[]>([
    // { id: "1", title: "Test 1", content: "Test Content...", isFavorite: false },
    // { id: "2", title: "Fav 1", content: "Fav Content...", isFavorite: true },
  // ]);

  const [notes, setNotes] = useState<Note[]>([]);
  const isFocused = useIsFocused();

React.useEffect(() => {
  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    else setNotes([]);
  };
  loadNotes();
}, [isFocused]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar
        title="All Notes"
        icon="note-multiple-outline"
        rightIcon="plus"
        onRightPress={() => navigation.navigate("AddNote")}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate("NoteDetail", { id: item.id })}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});