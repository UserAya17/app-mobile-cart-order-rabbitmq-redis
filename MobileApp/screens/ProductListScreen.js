import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Pour la navigation
import { getProducts, addProductToCart } from "../services/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const userId = 1; // ID utilisateur par défaut
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        // Initialiser les quantités à 1 pour chaque produit
        const initialQuantities = {};
        data.forEach((product) => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1), // Minimum 1
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      const quantity = quantities[productId];
      await addProductToCart(userId, productId, quantity);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.promotionCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.promotionImage} />
      <View style={styles.promotionDetails}>
        <Text style={styles.promotionTitle}>{item.name}</Text>
        <Text style={styles.promotionDescription}>{item.description}</Text>
        <View style={styles.promotionFooter}>
          <Text style={styles.promotionPrice}>{item.price}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.id)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantities[item.id]}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => handleAddToCart(item.id)}
          >
            <Text style={styles.filterButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.headerText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Our Products</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.promotionList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FA",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  promotionList: {
    paddingBottom: 20,
  },
  promotionCard: {
    backgroundColor: "#F8F9FB",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
    flexDirection: "row", // Aligner l'image et les détails côte à côte
  },
  promotionImage: {
    width: "30%",
    height: 150, // Taille ajustée
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  promotionDetails: {
    flex: 1, // Utiliser tout l'espace restant
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 10,
    fontStyle: "italic",
  },
  promotionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  promotionPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E74C3C",
    backgroundColor: "#FFF5F5",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#E0E0E0",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#1ABC9C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Dashboard;
