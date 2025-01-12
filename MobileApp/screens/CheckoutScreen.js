import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Checkout Successful!</Text>
      <Button
        title="Back to Products"
        onPress={() => navigation.navigate('Products')}
        color="#3498DB" // Custom color for the button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6FA', // Light background color
    padding: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
});

export default CheckoutScreen;
