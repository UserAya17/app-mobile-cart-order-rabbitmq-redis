import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // ID de l'utilisateur pour récupérer ses commandes

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.105:7022/api/orders/user/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.orderDate}>Date: {new Date(item.orderDate).toLocaleDateString()}</Text>
      <Text style={styles.orderTotal}>
        Total: $
        {item.items.reduce((total, orderItem) => total + orderItem.price * orderItem.quantity, 0).toFixed(2)}
      </Text>
      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <View style={styles.orderProduct}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.productPrice}>Price: ${item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.productId.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498DB" />
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.ordersList}
        />
      ) : (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Cart</Text>
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
  ordersList: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E74C3C",
    marginBottom: 10,
  },
  orderProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  productQuantity: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  productPrice: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  noOrdersText: {
    fontSize: 18,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 50,
  },
  backButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrdersScreen;
