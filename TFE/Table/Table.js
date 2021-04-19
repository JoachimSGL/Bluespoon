import { StyleSheet, View, TextInput, Text ,TouchableOpacity,ImageBackground,SafeAreaView,ScrollView} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Permissions} from 'expo';
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: 0,
            idRestaurant:(this.props.route.params== undefined ? 0  :this.props.route.params.idRestaurant),
            numTable:(this.props.route.params== undefined ? 0  :this.props.route.params.numTable),
            nom:'',
          };
          this.changeNom= this.changeNom.bind(this);
    }
    changeNom(txt){
        this.setState({nom:txt.nativeEvent.text});
    }
    changeBackground(){
      this.setState({active:!this.state.active});
    }
    async storeToken(m,p) {
      try {
         await AsyncStorage.setItem(p, JSON.stringify(m));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    async getToken() {
        try {
          
          let userData = await AsyncStorage.getItem("id");
          let data = JSON.parse(userData);
          
          if(data!=null){
            this.props.navigation.replace('Splitter',{idRestaurant:this.state.idRestaurant, numTable:this.state.numTable});
          }
        } catch (error) {
            console.log("Something went wrong", error);
    }
}
    Carte(){
      console.log(this.state.nom);
        if(this.state.nom!==''){
            fetch('http://192.168.0.8:3001/inscription', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': 'true'
              },
              body: JSON.stringify({
                  numTable: this.state.numTable,
                  nom:this.state.nom,
                  idRestaurant:this.state.idRestaurant,
                  id :this.state.id,
              })
            }).then(response => response.json())
            .then((json) => {
              console.log(json);
              if(json!='no' && json!='pas autorisé'){
              this.storeToken(json[0].id,'id');
              this.storeToken(json[0].serveur,'serveur');
              this.props.navigation.replace('Splitter',{numTable:this.state.numTable, idRestaurant:this.state.idRestaurant});
              }else{
                this.props.navigation.replace('Home');
              }
            });


        }

        }
  render() {
    

let table = this.props.active ? require('./Table.png') : require('./Table2.png');
    return (
      <SafeAreaView style={{width:'100%', height:'100%'}} >
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon} >Vous êtes à la table numéro: {this.state.numTable}</Text>
      <View style={[styles.container, this.props.style]}>
                        <Text style={styles.label}>Veuillez indiquer votre nom:</Text>
                        <TextInput
                            placeholder="Nom"
                            style={styles.inputStyle}
                            onChange={this.changeNom}
                        >{this.state.nom}</TextInput>
                    </View>
                    
        <TouchableOpacity style={[styles.containerMauve, this.props.style]} onPress={() => { this.Carte(); }} >
        <Text style={styles.confirmer}>Confirmer</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
}

}
/*
<View style={[styles.container, this.props.style]}>
                        <Text style={styles.label}>Numéro de votre table:</Text>
                        <TextInput
                            placeholder="Numéro"
                            style={styles.inputStyle}
                            onChange={this.changeNum}
                            keyboardType="numeric"
                        />
                        <Text style={styles.helper}>Si vous ne savez pas, demandez au serveur</Text>
                    </View>










          <ScrollView  style={{ width:'100%', height:'100%',flex:1}} >
        {this.state.active &&
                    <ImageBackground
                        source={require("./Table.png")}
                        style={styles.cardItemImagePlace}
                        
                    ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
        }
        {!this.state.active &&
                    <ImageBackground
                        source={require("./Table2.png")}
                        style={styles.cardItemImagePlace}
                        
                        ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
         }

{this.state.active &&
                    <ImageBackground
                        source={require("./Table.png")}
                        style={styles.cardItemImagePlace}
                        
                    ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
        }
        {!this.state.active &&
                    <ImageBackground
                        source={require("./Table2.png")}
                        style={styles.cardItemImagePlace}
                        
                        ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
         }

{this.state.active &&
                    <ImageBackground
                        source={require("./Table.png")}
                        style={styles.cardItemImagePlace}
                        
                    ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
        }
        {!this.state.active &&
                    <ImageBackground
                        source={require("./Table2.png")}
                        style={styles.cardItemImagePlace}
                        
                        ><TouchableOpacity style={{ width:'100%', height:'100%'}} onPress={()=>this.changeBackground()}><Text style={styles.numero} >n°1</Text></TouchableOpacity></ImageBackground>
         }
                    </ScrollView>
*/
const styles = StyleSheet.create({
    
    containerBig: {
        flex: 1,
        backgroundColor: "rgba(191,209,249,1)"
      },
      bluespoon: {
        color: "#121212",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        
        marginTop: '3%',
        marginBottom: '2%',
      },
      numero: {
        color: "#fff",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        marginLeft:'25%',
        marginTop: '25%',
      },

      container: {
        backgroundColor: "transparent",
        height: '40%',
        width: '100%',
        backgroundColor: "rgba(169,187,216,1)",
        overflow: "visible"
      },
      label: {
        fontSize: 15,
        textAlign: "left",
        color: "#000",
        opacity: 0.6,
        width: '100%',
        height:'20%',
      },
      inputStyle: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        color: "#000",
        fontSize: 20,
        alignSelf: "stretch",
        lineHeight: 16,
        paddingTop: '2%',
        paddingBottom: '2%',
        flex: 1,
        width: '100%',
        height:'100%',
      },
      helper: {
        fontSize: 14,
        textAlign: "left",
        color: "#000",
        opacity: 0.6,
        paddingTop: 8
      },
      containerMauve: {
        backgroundColor: "rgba(34,50,132,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '10%',
        width: '100%'
      },
      confirmer: {
        color: "#fff",
        fontSize: 17
      },
      cardItemImagePlace: {
        flex:1,
        marginBottom:5,
        height: 100,
        width: 150,
        flexDirection: "row",
        alignItems: "flex-start",
      },
  });

export default Table;