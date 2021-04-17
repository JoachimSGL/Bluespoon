import { StyleSheet, View, TouchableOpacity, Text ,Dimensions} from "react-native";
import { ListItem } from 'react-native-elements';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
class TableServeur extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: 0,
            serveur:false,
            idRestaurant : (this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),
            idTable : (this.props.route.params==undefined ? 1 : this.props.route.params.idTable),
            commande:true,
            addition: false,
            servi : [],
            serviAddition : [],
            nonServi : [],
            nonServiAddition : [],
          };
    }
    
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        let serveurData = await AsyncStorage.getItem("serveur");
        let dataS = JSON.parse(serveurData);
        console.log(dataS);
        if(data!=null && data!=0){
          if(dataS!==null || dataS==true){
            this.setState({id:data});
            this.setState({serveur:dataS});
            
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

ack(plat,servi,addition){
  if(!addition){
      fetch('http://192.168.0.27:3001/addition', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
            servi: servi,
            addition:addition,
            idTable: this.state.idTable,
            idRestaurant: this.state.idRestaurant,
            idPlat:plat.idPlat
        })
      })
    }else{
        fetch('http://192.168.0.27:3001/demandeAddition', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              addition: false,
              idUtilisateur: plat.id
          })
        })
}
}
    componentDidMount(){
        fetch('http://192.168.0.27:3001/commande?idTable='+this.state.idTable+'&&idRestaurant='+this.state.idRestaurant, {
            method: 'GET',
           
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((json) => {
            let servi = [];
            let serviAddition = [];
            let nonServi = [];
            let nonServiAddition = [];
            for(let i = 0 ; i <json.length;i++){
                if(json[i].servi){
                    if(json[i].addition){
                      if(this.isNotIn(json[i].idPlat,serviAddition)){
                        serviAddition.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        this.addNumber(json[i].idPlat,serviAddition);
                      }
                    }else{
                      if(this.isNotIn(json[i].idPlat,servi)){
                        servi.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        this.addNumber(json[i].idPlat,servi);
                      }
                    }
                }else{
                    if(json[i].addition){
                      if(this.isNotIn(json[i].idPlat,nonServiAddition)){
                        nonServiAddition.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        this.addNumber(json[i].idPlat,nonServiAddition);
                      }
                    }else{
                      if(this.isNotIn(json[i].idPlat,nonServi)){
                        nonServi.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        this.addNumber(json[i].idPlat,nonServi);
                      }
                    }
                }
            }
            this.setState({servi:servi});
            this.setState({serviAddition:serviAddition});
            this.setState({nonServiAddition:nonServiAddition});
            this.setState({nonServi:nonServi});
        
        })
    }
    isNotIn(id,arr){
      for(let i = 0;i<arr.length;i++){
        if(id==arr[i].idPlat){
          return false
        }
      }
      return true
    }
    addNumber(id,arr){
      for(let i = 0;i<arr.length;i++){
        if(id==arr[i].idPlat){
          arr[i].nombre=arr[i].nombre+1
        }
      }
    }
  render() {
    

    return (
      <View style={{flex:1,flexDirection: "column",backgroundColor:'#04A70'}}>
    <SafeAreaView style={{width:'100%', height:'100%'}} >
        <ScrollView  style={{ width:'100%', height:'100%',backgroundColor:'#5FACDD'}}>
        {this.state.nonServiAddition.length>0 &&
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.texteSection}>Demande d'addition et de plat :</Text>
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}}>Tout valider</Text></TouchableOpacity>
        </View>
        }
{this.state.nonServiAddition.map((l, i) => (
            <ListItem key={i} bottomDivider >
                <ListItem.Content onPress={()=>{this.ack(l,true,true)}}>
                <ListItem.Title >{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.prix}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}


        {this.state.nonServi.length>0 &&
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.texteSection}>Demande de plat:</Text>
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}}>Tout valider</Text></TouchableOpacity>
        </View>
        }
        {this.state.nonServi.map((l, i) => (
            <ListItem key={i} bottomDivider>
                <ListItem.Content onPress={()=>{this.ack(l,true,false)}}>
                <ListItem.Title>{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.prix}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}


        {this.state.serviAddition.length>0 &&
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.texteSection}>Demande d'addition :</Text>
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}}>Tout valider</Text></TouchableOpacity>
        </View>
        }
{this.state.serviAddition.map((l, i) => (
            <ListItem key={i} bottomDivider>
                <ListItem.Content onPress={()=>{this.ack(l,true,true)}}>
                <ListItem.Title>{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.prix}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}


{this.state.servi.length>0 &&
  <View style={{flex:1,flexDirection:'row'}}>
<Text style={styles.texteSection}>Déja servi :</Text>
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}}>Tout valider</Text></TouchableOpacity>
        </View>
  }
{this.state.servi.map((l, i) => (
            <ListItem key={i} bottomDivider>
                <ListItem.Content >
                <ListItem.Title>{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.prix}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}

        </ScrollView>
    </SafeAreaView>
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
      },
      texteSection:{
        color: "#fff",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '5%',
      },
      boutonValider:{
        backgroundColor:'#413BE1',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        marginLeft:'2%',
        marginTop:'1%',
        height:'80%',
        width:'25%'
      }
  });
  
export default TableServeur;