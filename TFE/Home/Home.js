import { StyleSheet, View, TouchableOpacity, Text ,Dimensions} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
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
        let idRest = await AsyncStorage.getItem("idRestaurant");
        let idResto = JSON.parse(idRest);
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
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                }else{
                  let boolValidate=false
                  for(let i = 0; i<json.length;i++){
                    if(!json[i].addition && this.state.id==json[i].id){
                      boolValidate=true;
                    }
                  }
                  if(boolValidate){
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }else{
                    this.setState({commande:false});
                    this.setState({addition:true});
                  }
                  
                }
              });
          }else{
            this.props.navigation.navigate('HomeServeur',{serveur:dataS,numTable:idResto});
          }
        }else{
          this.setState({commande:false});
          this.setState({addition:false});
        }
      } catch (error) {
          console.log("Something went wrong", error);
          this.setState({commande:false});
          this.setState({addition:false});
  }
}

QR(){
  if(!this.state.addition){
  if(false){
    fetch('https://bluespoon-app.herokuapp.com/commandeHome?id='+this.state.id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
              }
              }).then(response => response.json())
              .then((json) => {
                
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                  this.props.navigation.navigate('QR');
                  //this.storeToken(20,'id');
                  //this.storeToken(null,'serveur')
                  //this.props.navigation.navigate('Splitter',{numTable:18, idRestaurant:1});
                  //this.props.navigation.navigate('Notation',{numTable:18, idRestaurant:1,id:20});
                }else{
                  let boolValidate=false
                  for(let i = 0; i<json.length;i++){
                    if(!json[i].addition && this.state.id==json[i].id){
                      boolValidate=true;
                    }
                  }
                  if(boolValidate){
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }else{
                    this.setState({commande:false});
                    this.setState({addition:true});
                  }
                }
              });
    
  }else{
  //this.props.navigation.navigate('QR');
  this.storeToken(13,'id');
  this.storeToken(null,'serveur')
  //this.props.navigation.navigate('Notation',{numTable:2, idRestaurant:6});
  this.props.navigation.navigate('Splitter',{numTable:6, idRestaurant:6});
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
                if(json=='no' ){
                  this.setState({commande:false});
                  this.setState({addition:false});
                }else{
                  let boolValidate=false
                  for(let i = 0; i<json.length;i++){
                    if(!json[i].addition && this.state.id==json[i].id){
                      boolValidate=true;
                    }
                  }
                  if(boolValidate){
                    this.setState({commande:true});
                    this.setState({addition:false});
                  }else{
                    this.setState({commande:false});
                    this.setState({addition:true});
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
          let boolValidate=false
            for(let i = 0; i<json.length;i++){
              if(!json[i].addition && this.state.id==json[i].id){
                boolValidate=true;
              }
            }
          if(json!=='no' && boolValidate){
            
            this.props.navigation.navigate('Splitter',{ idRestaurant: json[0].idRestaurant,numTable:json[0].idTable}); 
          }else{
            this.setState({commande:false});
            this.setState({addition:true});
          }
        });
      
    }
  render() {
    

    return (
      <View style={{flex:1,flexDirection: "column"}}>
    <ImageBackground style={[styles.containerImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/accueil.jpg"}}>
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>Bluespoon</Text>
  
      <View style={styles.containerSmall}>
        {!this.state.commande &&
      <TouchableOpacity style={[styles.containerJauneQR, this.props.style]} onPress={() => { this.QR() }} >
        <ImageBackground style={[styles.containerQRImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/scan.png"}}></ImageBackground>
  
 
      </TouchableOpacity>
        }
        {this.state.commande &&
          <TouchableOpacity style={[styles.containerJauneQR, this.props.style]} onPress={() => { this.splitter(); }} >
          <ImageBackground style={[styles.containerJauneImage, this.props.style]} source={{uri: "https://bluespoon-app.herokuapp.com/image/foodIcone.png"}}></ImageBackground>
        </TouchableOpacity>
        }
        {this.state.addition &&
          <Text style={styles.additionTxt}>Vous devez payer votre addition avant de recommander</Text>
        }
      </View>

<View style={{flex:1,flexDirection: "row",width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}> 
      
        

      
        <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.props.navigation.navigate('Carte'); }}>
        {//<Text style={styles.recherche}>Recherche de restaurant</Text>
  }
        <MaterialCommunityIconsIcon
          name="silverware-clean"
          style={styles.icon}
        ></MaterialCommunityIconsIcon>
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
      backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: Dimensions.get('window').width*10,
        height: '38%',
        width: '24%',//ou ici
        borderWidth:0,
      },
      containerJaune: {
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 100000,
        height: '20%',//ici pour la taille 
        width: '100%',
        borderWidth:0,
      },
      containerJauneQR:{
        backgroundColor: "rgba(255,255,255,0.4)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 100000,
        height: '100%',//ici pour la taille 
        width: '63%',
        borderWidth:0,
      },
      containerJauneImage: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        
        
        
      },
      containerQRImage: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: '80%',
        width: '80%',
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
        backgroundColor: 'rgba(52, 52, 52, 0)',
        marginTop:'0%'
      },
      containerSmall: {
        flex:1,
        flexDirection:'column',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(191,209,249,0)",
        marginTop:'10%'
      },
      bluespoon: {
        fontFamily: "Font Awesome",
        color: "#fff",
        //textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        marginTop: '2%',
        //marginLeft: 93
      },
      additionTxt: {
        //fontFamily: "Georgian",
        color: "#000",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        marginTop: '30%',
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
      },
      icon:{
       
          color: "#fff",
          fontSize: 60,
          marginRight:'0%',
          marginTop:'0%'
        
      },
      captionIcon: {
        color: "#000",
        fontSize: 100,
        marginRight:'3%'
      },
  });
  
export default Home;