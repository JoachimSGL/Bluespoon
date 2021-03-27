import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Permissions} from 'expo';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: 0,
            serveur:(this.props.route.params== undefined ? false  :this.props.route.params.serveur),
            numCommande:9,
            idRestaurant:1,
            commande:true
          };
    }
    onPress(){
      
    }
    async storeToken(m,nom) {
      try {
         await AsyncStorage.setItem(nom, JSON.stringify(m));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        
        if(data!=null){
          this.setState({id:data});
        }else{
          this.props.navigation.replace('Reconnexion');
        }
      } catch (error) {
          console.log("Something went wrong", error);
          this.props.navigation.replace('Reconnexion');
  }
}
    componentDidMount(){
      
    }
    deco(){
      this.storeToken(null,'id');
      this.props.navigation.replace('Reconnexion');
    }
  render() {
    

    return (
        <View style={styles.containerBig}>
          
      <Text style={styles.bluespoon}>Bluespoon</Text>
      <View style={styles.containerSmall}>
        
      <TouchableOpacity style={[styles.containerJaune, this.props.style]} onPress={() => { this.props.navigation.navigate('QR'); }} >
        <Text style={styles.recherche}>QR</Text>
      </TouchableOpacity>

      {this.state.commande &&
        <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => { this.props.navigation.navigate('Splitter',{numCommande : this.state.numCommande, idRestaurant: this.state.idRestaurant}); }}>
        <Text style={styles.recherche}>Votre commande</Text>
      </TouchableOpacity>

      }
        <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.props.navigation.navigate('Carte'); }}>
        <Text style={styles.recherche}>Recherche de restaurant</Text>
      </TouchableOpacity>
      <Text style={styles.deco} onPress={() => { this.deco(); }}>Déconnexion</Text>
      
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
      },
      deco: {
        //fontFamily: "Georgian",
        color: "#121212",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        marginTop: 80,
        //marginLeft: 93
      }
  });
  
export default Home;