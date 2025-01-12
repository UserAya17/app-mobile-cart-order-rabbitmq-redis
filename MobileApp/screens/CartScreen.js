import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getCart, updateProductQuantity, checkoutCart } from "../services/api";

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState({ items: [] }); // Initialisation avec items vide
  const userId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(userId);
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleUpdateQuantity = (productId, quantity) => {
    const updatedCart = cart.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Number(quantity) }
        : item
    );
    setCart({ ...cart, items: updatedCart });
    updateProductQuantity(userId, productId, Number(quantity));
  };

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () =>
    cart.items && cart.items.length > 0 // Vérification que items n'est pas vide
      ? cart.items.reduce(
          (total, item) => total + calculateSubtotal(item.price, item.quantity),
          0
        )
      : 0; // Retourne 0 si items est vide

  const handleCheckout = () => {
    checkoutCart(1);
    navigation.navigate("OrdersScreen");
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cartItemImage}
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>Price: {item.price}</Text>
        <Text style={styles.cartItemSubtotal}>
          Subtotal: ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={String(item.quantity)}
            onChangeText={(quantity) =>
              handleUpdateQuantity(item.productId, quantity)
            }
          />
          <Text style={styles.quantityLabel}>Qty</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>
      <FlatList
        data={cart.items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.productId.toString()}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${calculateTotal().toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Validate Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FA",
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 5,
  },
  cartItemSubtotal: {
    fontSize: 16,
    color: "#E74C3C",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 5,
    width: 50,
    textAlign: "center",
    marginRight: 10,
  },
  quantityLabel: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E74C3C",
  },
  checkoutButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
