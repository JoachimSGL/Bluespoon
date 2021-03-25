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
            idRestaurant:(this.props.route.params== undefined ? 1  :this.props.route.params.idRestaurant),
            numero:1,
            active:true,
          };
          this.changeNum= this.changeNum.bind(this);
    }
    changeNum(txt){
        this.setState({numero:txt.nativeEvent.text});
    }
    changeBackground(){
      this.setState({active:!this.state.active});
    }
    async getToken() {
        try {
          
          let userData = await AsyncStorage.getItem("id");
          let data = JSON.parse(userData);
          
          if(data!=null){
            console.log(data);
            this.setState({id:data});
          }
        } catch (error) {
            console.log("Something went wrong", error);
    }
}
    Carte(){
        if(Number.isInteger(parseInt(this.state.numero)) && this.state.numero!=0){
            fetch('http://192.168.0.8:3001/table', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': 'true'
              },
              body: JSON.stringify({
                  numero: this.state.numero,
                  id :this.state.id,
              })
            }).then(response => response.json())
            .then((json) => {
              this.props.navigation.navigate('Recherche',{numero:this.state.numero, idRestaurant:this.state.idRestaurant});
            });


        }

        }
  render() {
    

let table = this.props.active ? require('./Table.png') : require('./Table2.png');
    return (
      <SafeAreaView style={{width:'100%', height:'100%'}} >
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon} >Indiquez le numéro de votre table:</Text>
      
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