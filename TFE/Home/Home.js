import { StyleSheet, View, TouchableOpacity, Text ,Dimensions} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from "react-native";
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
        let serveurData = await AsyncStorage.getItem("serveur");
        let dataS = JSON.parse(serveurData);
        console.log(dataS);
        if(data!=null && data!=0){
          if(dataS==null || dataS==false){
            this.setState({id:data});
            this.setState({serveur:dataS});
            fetch('http://192.168.0.8:3001/commandeHome?id='+this.state.id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
              }
              }).then(response => response.json())
              .then((json) => {
                if(json!=='no' && !json.addition){
                  this.setState({commande:true});
                }else{
                  this.setState({commande:false});
                }
              });
          }else{
            this.props.navigation.navigate('HomeServeur');
          }
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
      this.storeToken(null,'serveur');
      this.props.navigation.replace('Reconnexion');
    }
    splitter(){
      console.log(this.state.id)
      fetch('http://192.168.0.8:3001/commandeHome?id='+this.state.id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
        }
        }).then(response => response.json())
        .then((json) => {
          if(json!=='no' && !json.addition){
          console.log(json.idTable);
            this.props.navigation.navigate('Splitter',{numCommande : json.numCommande, idRestaurant: json.idRestaurant,numTable:json.idTable}); 
          }
        });
      
    }
  render() {
    

    return (
      <View style={{flex:1,flexDirection: "column"}}>
    <ImageBackground style={[styles.containerImage, this.props.style]} source={{uri: "http://192.168.0.8:3001/image/acceuil.jpg"}}>
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>Bluespoon</Text>
      <View style={styles.containerSmall}>
        
      <TouchableOpacity style={[styles.containerJaune, this.props.style]} onPress={() => { this.props.navigation.navigate('QR'); }} >
        <ImageBackground style={[styles.containerJauneImage, this.props.style]} source={{uri: "http://192.168.0.8:3001/image/loupe.png"}}></ImageBackground>
      </TouchableOpacity>
      </View>

<View style={{flex:1,flexDirection: "row",width:'100%',height:'80%'}}> 
      
        <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => {this.splitter() }}>
        <Text style={styles.recherche}>Votre commande</Text>
      </TouchableOpacity>

      
        <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.props.navigation.navigate('Carte'); }}>
        <Text style={styles.recherche}>Recherche de restaurant</Text>
      </TouchableOpacity>
  
      </View>
      <Text style={styles.deco} onPress={() => { this.deco(); }}>Déconnexion</Text>
      
      </View>
      
      </ImageBackground>
      </View>
    );
}

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#5856D6",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: Dimensions.get('window').width*10,
      height: '100%',
      width: '50%',
      marginTop:'0%',
      borderWidth:2,
    },
    containerMauve: {
        backgroundColor: "#5856D6",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: Dimensions.get('window').width*10,
        height: '100%',
        width: '50%',
        borderWidth:2,
      },
      containerJaune: {
        backgroundColor: "rgba(116,166,214,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: Dimensions.get('window').width*10,
        height: '50%',
        width: '45%',
        borderWidth:3,
      },
      containerJauneImage: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        
        
        
      },
      containerImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
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
        backgroundColor: 'rgba(52, 52, 52, 0)'
      },
      containerSmall: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(191,209,249,0)"
      },
      bluespoon: {
        //fontFamily: "Georgian",
        color: "#fff",
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
        color: "#000",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        marginTop: 80,
        backgroundColor: "rgba(191,209,249,0.5)"
        //marginLeft: 93
      }
  });
  
export default Home;