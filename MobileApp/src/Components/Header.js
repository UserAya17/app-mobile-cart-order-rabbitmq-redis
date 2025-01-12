import React from "react";
import { ImageBackground, Text, View ,Image} from "react-native";
import styles from "../Components/Styles";

export default class Header extends React.Component {

    constructor(props)
    {
        super(props);
    }

  render() {
    return (
        <ImageBackground style={styles.container}
      >
        <View style={styles.content}>
          <Image
            style={styles.icon}
            source={require('../../assets/favicon.png')} 
          />
          <Text style={styles.title}>Faculté des sciences et techniques</Text>
        </View>
      </ImageBackground>
     
    );
  }
}
