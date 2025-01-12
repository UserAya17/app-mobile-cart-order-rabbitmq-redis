// dashboard/DrawerNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import HomeTab from "../screens/HomeTab";

const Drawer = createDrawerNavigator();

// Liste des promotions pour l'accueil
const promotions = [
  { id: "1", title: "Promo Câbles Spéciaux", discount: "20%" },
  { id: "2", title: "Réduction Transformateurs", discount: "15%" },
  { id: "3", title: "Offre Limitée Accessoires", discount: "30%" },
];


function ProfileTab() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Profil Utilisateur</Text>
    </View>
  );
}

function SettingsTab() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Paramètres</Text>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#FF9800",
        drawerInactiveTintColor: "gray",
      }}
    >
      <Drawer.Screen
        name="Accueil"
        component={HomeTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Paramètres"
        component={SettingsTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF9800",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 200,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDiscount: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});
