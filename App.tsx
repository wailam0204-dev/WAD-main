import React, { useState } from "react";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//@ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./screens/HomeScreen";
import AddNoteScreen from "./screens/AddNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

// Types
export type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  NoteDetail: { id: string };
  FavoritesMain: undefined;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Navigation instances
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function MainStack({ initialRouteName }: { initialRouteName: keyof RootStackParamList }) {
  const { colors } = useTheme();
  
  return (
    <Stack.Navigator 
      initialRouteName={initialRouteName}
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ 
          headerShown: true,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card }
        }}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        options={{ 
          headerShown: true,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card }
        }}
      />
    </Stack.Navigator>
  );
}

function NotesTabs() {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="AllNotesTab"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          return {
            title: "All Notes",
            tabBarStyle: routeName === "Home" ? undefined : { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="note-multiple" size={size} color={color} />
            ),
          };
        }}
      >
        {() => <MainStack initialRouteName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="FavoritesTab"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "FavoritesMain";
          return {
            title: "Favorites",
            tabBarStyle: routeName === "FavoritesMain" ? undefined : { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="star" size={size} color={color} />
            ),
          };
        }}
      >
        {() => <MainStack initialRouteName="FavoritesMain" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Drawer: Notes + Settings
export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: isDark ? "#BB86FC" : "#6200EE",
          drawerInactiveTintColor: isDark ? "#FFFFFF" : "#000000",
          drawerStyle: {
            backgroundColor: isDark ? "#121212" : "#FFFFFF",
          },
        }}
      >
        <Drawer.Screen
          name="Notes"
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="notebook" size={size} color={color} />
            ),
          }}
        >
          {() => <NotesTabs />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        >
          {() => <SettingsScreen toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>

  );
}