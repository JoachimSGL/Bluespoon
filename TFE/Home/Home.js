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
            serveur:false,
            numCommande:9,
            idRestaurant:1,
            commande:false,
            addition: false,
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
            fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
              }
              }).then(response => response.json())
              .then((json) => {
                console.log(json);
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                }else{
                  if(json.addition){
                    this.setState({commande:false});
                    this.setState({addition:true});
                  }else{
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }
                }
              });
          }else{
            this.props.navigation.navigate('HomeServeur');
          }
        }else{
          this.setState({commande:false});
        }
      } catch (error) {
          console.log("Something went wrong", error);
          this.setState({commande:false});
  }
}

QR(){
  if(!this.state.addition){
  if(true){
    fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
              }
              }).then(response => response.json())
              .then((json) => {
                console.log(json);
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                  this.props.navigation.navigate('QR');
                  //this.storeToken(20,'id');
                  //this.storeToken(null,'serveur')
                  //this.props.navigation.navigate('Splitter',{numTable:18, idRestaurant:1});
                  //this.props.navigation.navigate('Notation',{numTable:18, idRestaurant:1,id:20});
                }else{
                  if(json.addition){
                    this.setState({commande:false});
                    this.setState({addition:true});
                  }else{
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }
                }
              });
    
  }else{
  //this.props.navigation.navigate('QR');
  this.storeToken(9,'id');
  this.storeToken(null,'serveur')
  this.props.navigation.navigate('Splitter',{numTable:6, idRestaurant:4});
  }
}else{
  fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
              }
              }).then(response => response.json())
              .then((json) => {
                console.log(json);
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                }else{
                  if(json.addition){
                    this.setState({commande:false});
                    this.setState({addition:true});
                  }else{
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }
                }
              });
}
}
    componentDidMount(){
      /*
      setInterval(() => {
          fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      //'Access-Control-Allow-Origin': 'true'
                  }
                  }).then(response => response.json())
                  .then((json) => {
                    console.log(json);
                    if(json=='no' ){
                      this.setState({commande:false});
                      this.setState({addition:false});
                    }else{
                      if(json.addition){
                        this.setState({commande:false});
                        this.setState({addition:true});
                      }else{
                        this.setState({commande:true});
                        this.setState({addition:false});
                      }
                    }
                  });
            }, 5000)*/
    }
    deco(){
      this.storeToken(null,'id');
      this.storeToken(null,'serveur');
      this.props.navigation.navigate('Reconnexion');
    }
    splitter(){
      console.log(this.state.id)
      fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
        }
        }).then(response => response.json())
        .then((json) => {
          if(json!=='no' && !json.addition){
          console.log(json.idRestaurant);
            this.props.navigation.navigate('Splitter',{numCommande : json.numCommande, idRestaurant: json.idRestaurant,numTable:json.idTable}); 
          }
        });
      
    }
  render() {
    

    return (
      <View style={{flex:1,flexDirection: "column"}}>
    <ImageBackground style={[styles.containerImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/acceuil2.jpg"}}>
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>Bluespoon</Text>
      <View style={styles.containerSmall}>
        {!this.state.commande &&
      <TouchableOpacity style={[styles.containerJaune, this.props.style]} onPress={() => { this.QR() }} >
        <ImageBackground style={[styles.containerJauneImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/loupe.png"}}></ImageBackground>
      </TouchableOpacity>
        }
        {this.state.commande &&
          <TouchableOpacity style={[styles.containerJaune, this.props.style]} onPress={() => { this.splitter(); }} >
          <ImageBackground style={[styles.containerJauneImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/foodIcone.png"}}></ImageBackground>
        </TouchableOpacity>
        }
        {this.state.addition &&
          <Text style={styles.additionTxt}>Vous devez payer votre addition avant de recommander</Text>
        }
      </View>

<View style={{flex:1,flexDirection: "row",width:'100%',height:'80%'}}> 
      
        

      
        <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.props.navigation.navigate('Carte'); }}>
        <Text style={styles.recherche}>Recherche de restaurant</Text>
      </TouchableOpacity>
  
      </View>
      <Text style={styles.deco} onPress={() => { this.deco(); }}>Compte serveur</Text>
      
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
        width: '100%',
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
        marginTop: '20%',
        //marginLeft: 93
      },
      additionTxt: {
        //fontFamily: "Georgian",
        color: "#fff",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 15,
        marginTop: 2,
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
        marginTop: '5%',
        backgroundColor: "rgba(191,209,249,0.5)"
        //marginLeft: 93
      }
  });
  
export default Home;