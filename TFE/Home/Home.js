import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';

//import {Permissions} from 'expo';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
          };
    }
    onPress(){
      
    }
    /*
    PermissionsFlow= async()=>{
        const {status} = await Permissions.askAsync(Permissions.CONTACTS)
      }*/
  render() {
    

    return (
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>Bluespoon</Text>
      <View style={styles.containerSmall}>
        <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => { this.props.navigation.navigate('Reconnexion'); }}>
        <Text style={styles.scanQrCode}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.props.navigation.navigate('Splitter'); }} >
        <Text style={styles.splitter}>splitter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerJaune, this.props.style]} onPress={() => { this.props.navigation.navigate('QR'); }} >
        <Text style={styles.recherche}>QR</Text>
      </TouchableOpacity>
        <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => { this.props.navigation.navigate('Carte'); }}>
        <Text style={styles.recherche}>Recherche de restaurant</Text>
      </TouchableOpacity>
      
      </View>
      </View>
    );
}

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: 5,
      paddingLeft: 16,
      paddingRight: 16,
      height: '20%',
      width: '50%'
    },
    containerMauve: {
        backgroundColor: "#5856D6",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '20%',
        width: '50%'
      },
      containerJaune: {
        backgroundColor: "#FFCC00",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '20%',
        width: '50%'
      },
    scanQrCode: {
      color: "#fff",
      fontSize: 17
    },
    splitter: {
        color: "#fff",
        fontSize: 17
      },
      recherche: {
        color: "#fff",
        fontSize: 17
      },
    containerBig: {
        flex: 1,
        backgroundColor: "rgba(191,209,249,1)"
      },
      containerSmall: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(191,209,249,1)"
      },
      bluespoon: {
        //fontFamily: "Georgian",
        color: "#121212",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        marginTop: 80,
        //marginLeft: 93
      }
  });
  
export default Home;