import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import NoteCard from "../components/NoteCard";
import HeaderBar from "../components/HeaderBar";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList} from "../App";
import {Note} from "../App"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

type FavNavProp = StackNavigationProp<RootStackParamList, "FavoritesMain">;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavNavProp>();
  const { colors } = useTheme();

  // Part B: load favorite notes from storage
  // const [favorites] = useState<Note[]>([
    // { id: "2", title: "Fav 1", content: "Fav Content...", isFavorite: true },
  // ]);

  const [favorites, setFavorites] = useState<Note[]>([]);
  const isFocused = useIsFocused();

React.useEffect(() => {
  const loadFavorites = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) {
      const notes = JSON.parse(storedNotes);
      setFavorites(notes.filter((n: Note) => n.isFavorite));
    } else {
      setFavorites([]);
    }
  };
  loadFavorites();
}, [isFocused]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar
        title="Favorites"
        icon="star"
        rightIcon="plus"
        onRightPress={() => navigation.navigate("AddNote")}
      />
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No favorites yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}  // ✅ Pass the entire note object
              onPress={() => navigation.navigate("NoteDetail", { id: item.id })}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  }
});