import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../Components/Styles";

export class Sandbox extends React.Component {
  constructor(props) {
    super(props); 
  }

  handleLogin = () => {
    this.props.navigation.navigate("Login");
  };

  handleRegister = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View style={styles.container}>
       
        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoHome}
        />
        

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
