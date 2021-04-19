import { StyleSheet, View, TouchableOpacity, Text ,Dimensions} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem ,Overlay} from 'react-native-elements';
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
            additionOverlay:[],
            commandeOverlay:[],
            isVisible:false,
            place:0,
          };
    }
    
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        let serveurData = await AsyncStorage.getItem("serveur");
        let dataS = JSON.parse(serveurData);
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

ack(plat,servi,addition,bool=false){
  if(!addition){
      if(!bool){
        fetch('http://192.168.0.8:3001/addition', {
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
        }).then(()=>{()=>{
          this.componentDidMount();
        }
        })
      }else{
        fetch('http://192.168.0.8:3001/additionAll', {
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
              idRestaurant: this.state.idRestaurant
          })
        }).then(()=>{this.componentDidMount()})
      }
    }else{
      if(!bool){
        console.log(plat.id)
        fetch('http://192.168.0.8:3001/demandeAddition', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              addition: false,
              idUtilisateur: plat.idPlat,
              idRestaurant:this.state.idRestaurant
          })
        }).then(()=>{this.componentDidMount()})
      }else{
        fetch('http://192.168.0.8:3001/demandeAdditionAll', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              addition: false,
              idTable: this.state.idTable,
              idRestaurant:this.state.idRestaurant
          })
        }).then(()=>{this.componentDidMount()})
      }
}
}
    componentDidMount(){
        fetch('http://192.168.0.8:3001/commande?idTable='+this.state.idTable+'&&idRestaurant='+this.state.idRestaurant, {
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
            let prix = 0;
            let payement=0;
            let boolServi=true;
            for(let i = 0 ; i <json.length;i++){
              if(json[i].addition){
                if(json[i].payement==0){
                  payement=0;
                  if(json[i].contact==null){
                    if(this.isNotIn(json[i].id,nonServiAddition)){
                        nonServiAddition.push({nom:json[i].nom,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].id,servi:json[i].servi,contact:false,payement:json[i].payement});
                    }else{
                      nonServiAddition = this.addPrix(json[i].id,nonServiAddition,json[i].prix,json[i].servi);
                    }
                  }else if(json[i].contact=='Table'){
                    prix =prix + json[i].prix;
                  }else{
                      if(this.isNotIn(json[i].contact,nonServiAddition)){
                        nonServiAddition.push({nom:json[i].contact,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].contact,contact:true,servi:json[i].servi,payement:json[i].payement});
                      }else{
                        nonServiAddition = this.addPrix(json[i].contact,nonServiAddition,json[i].prix,json[i].servi);
                      }
                  }
                }else if(json[i].payement==1){
                  payement=1;
                  if(json[i].contact==null){
                    if(this.isNotIn(json[i].id,nonServiAddition)){
                      nonServiAddition.push({nom:json[i].nom,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].id,servi:json[i].servi,contact:false,payement:json[i].payement});
                    }
                  }else if(json[i].contact=='Table'){
                  }else{
                      if(this.isNotIn(json[i].contact,nonServiAddition)){
                        nonServiAddition.push({nom:json[i].contact,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].contact,contact:true,servi:json[i].servi,payement:json[i].payement});
                        
                      }
                  }
                  prix=prix+json[i].prix;
                  boolServi=boolServi || json[i].servi;

                }
            }
            if(json[i].payement==1){
              for(let i = 0;i<nonServiAddition.length;i++){
                nonServiAddition[i].servi=boolServi;
              }
            }
              
                if(json[i].servi){
                    if(json[i].addition){
                      
                    }else{
                      if(this.isNotIn(json[i].idPlat,servi)){
                        servi.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        servi = this.addNumber(json[i].idPlat,servi);
                      }
                    }
                }else{
                    if(json[i].addition){
                      
                    }else{
                      if(this.isNotIn(json[i].idPlat,nonServi)){
                        nonServi.push({nomPlat:json[i].nomPlat,commentaire:json[i].commentaire,prix:json[i].prix,idTable:json[i].idTable,idPlat:json[i].idPlat,nombre:1});
                      }else{
                        nonServi = this.addNumber(json[i].idPlat,nonServi);
                      }
                    }
                }
            }
            /*
            for(let i = 0 ; i<serviAddition.length;i++){
              if(payement==0){
              serviAddition[i].prix=(serviAddition[i].prix+(prix/serviAddition.length)).toFixed(2)
              }else if(payement==1){
                serviAddition[i].prix=(prix/serviAddition.length).toFixed(2)
              }
            }*/
            for(let i = 0 ; i<nonServiAddition.length;i++){
              if(payement==0){
                nonServiAddition[i].prix=(nonServiAddition[i].prix+(prix/nonServiAddition.length)).toFixed(2)
                serviAddition.push(nonServiAddition[i]);
              }else if(payement==1){
                nonServiAddition[i].prix=(prix/nonServiAddition.length).toFixed(2)
                serviAddition.push(nonServiAddition[i]);
              }
            }
            nonServiAddition.push({nomPlat:'Commandes pour la table',nom:'Commandes pour la table',prix:0,idTable:this.state.idTable,nombre:1,contact:true,idPlat:'Table'})
            this.setState({servi:servi});
            this.setState({serviAddition:serviAddition});
            this.setState({nonServiAddition:nonServiAddition});
            this.setState({nonServi:nonServi});
        
        })
    }
    isNotIn(id,arr){
      for(let i = 0;i<arr.length;i++){
        if(id==arr[i].idPlat){
          return false;
        }
      }
      return true;
    }
    addNumber(id,arr,nombre=1){
      for(let i = 0;i<arr.length;i++){
        if(id==arr[i].idPlat){
          arr[i].nombre=arr[i].nombre+nombre;
        }
      }
      return arr;
    }
    addPrix(id,arr,prix,servi){
      for(let i = 0;i<arr.length;i++){
        if(id==arr[i].idPlat){
          arr[i].prix=arr[i].prix+prix;
          arr[i].servi=arr[i].servi&&servi;
        }
      }
      return arr;
    }
    commande(arr){
      console.log(arr);
      fetch('http://192.168.0.8:3001/additionSpecifique?idTable='+this.state.idTable+'&&idRestaurant='+this.state.idRestaurant+'&&id='+arr.idPlat+'&&contact='+arr.contact+'&&servi=true', {
            method: 'GET',
           
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((json) => {
            console.log(json);
            this.setState({commandeOverlay:json})
            
            this.setState({isVisible:true});
            this.setState({additionOverlay:[]});
          })
    }
    addition(arr){
      console.log(arr.contact);
      fetch('http://192.168.0.8:3001/additionSpecifique?idTable='+this.state.idTable+'&&idRestaurant='+this.state.idRestaurant+'&&id='+arr.idPlat+'&&contact='+arr.contact+'&&servi=false', {
            method: 'GET',
           
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((json) => {
            console.log(json);
            this.setState({additionOverlay:json})
            this.setState({isVisible:true});
            this.setState({commandeOverlay:[]});
          })
    }
    toggleOverlay=()=>{
      this.setState({isVisible : !this.state.isVisible});
  }
  changePlace=(bool)=>{
    if(bool){
        if(this.state.commandeOverlay.length-1>this.state.place){
          this.setState({place : this.state.place+1});
        }
      }else{
        if(this.state.place>0){
          this.setState({place : this.state.place-1})
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
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}} onPress={()=>{this.ack(this.state.nonServiAddition,true,true,true)}}>Tout valider</Text></TouchableOpacity>
        </View>
        }
{(this.state.additionOverlay.length==0) &&
<Overlay isVisible={this.state.isVisible} onBackdropPress={this.toggleOverlay}  >
                <Text>  Commande:                                                      </Text>
               
                {
                    this.state.commandeOverlay.map((l, i) => (
                      
                    <ListItem key={i} bottomDivider  onPress={() => this.toggleOverlay()}>
                        <ListItem.Content>
                        <ListItem.Title>{l.nomPlat}</ListItem.Title>
                        <ListItem.Subtitle>{l.commentaire}</ListItem.Subtitle>
                        <ListItem.Subtitle>{l.prix} €</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    
                    ))
                }
                
                <View style={[styles.containerStepper, this.props.style]}>
                    <TouchableOpacity
                      style={[
                        styles.leftStepper,
                        {
                          backgroundColor: "rgba(0, 122, 255,0.1)"
                        }
                      ]}
                      onPress={()=>this.changePlace(false)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-left"
                        style={styles.leftIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.rightStepper,
                        {
                          backgroundColor: "rgba(0, 122, 255,0.1)"
                        }
                      ]}
                      onPress={()=>this.changePlace(true)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-right"
                        style={styles.rightIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                  </View>
            </Overlay>
  }

{(this.state.additionOverlay.length!==0) &&
<Overlay isVisible={this.state.isVisible} onBackdropPress={this.toggleOverlay}  >
                <Text>  Addition:                                                      </Text>
               
                {
                    this.state.additionOverlay.map((l, i) => (
                      
                    <ListItem key={i} bottomDivider  onPress={() => this.toggleOverlay()}>
                        <ListItem.Content>
                        <ListItem.Title>{l.nomPlat}</ListItem.Title>
                        <ListItem.Subtitle>{l.prix} €</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    
                    ))
                }
                
                <View style={[styles.containerStepper, this.props.style]}>
                    <TouchableOpacity
                      style={[
                        styles.leftStepper,
                        {
                          backgroundColor: "rgba(0, 122, 255,0.1)"
                        }
                      ]}
                      onPress={()=>this.changePlace(false)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-left"
                        style={styles.leftIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.rightStepper,
                        {
                          backgroundColor: "rgba(0, 122, 255,0.1)"
                        }
                      ]}
                      onPress={()=>this.changePlace(true)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-right"
                        style={styles.rightIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                  </View>
            </Overlay>
  }


                    
{this.state.nonServiAddition.map((l, i) => (
            <ListItem key={i} bottomDivider >
                <ListItem.Content >
                <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1,flexDirection:'column'}}>
                {l.idPlat!=='Table' &&
                <ListItem.Title >{l.nom.split('_')[0]} </ListItem.Title>
  }
                {l.idPlat!=='Table' &&
                  <ListItem.Subtitle>{l.prix} €</ListItem.Subtitle>
                } 
                {l.idPlat=='Table' &&
                  <TouchableOpacity onPress={()=>{this.commande(l)}}>
                  <Text>{l.nom}</Text>
                  </TouchableOpacity>

               }
                </View>


                <View style={{flex:1,flexDirection:'column'}}>


                  {l.servi==false &&
                <TouchableOpacity onPress={()=>{this.commande(l)}}>
                  <Text>Voir la commande</Text>
                  </TouchableOpacity>
                  }
                  {(l.payement==0) &&
                <TouchableOpacity onPress={()=>{this.addition(l)}}><Text>Voir l'addition</Text></TouchableOpacity>
                  }
                </View>

                </View>
                </ListItem.Content>
            </ListItem>
        ))}


        {this.state.nonServi.length>0 &&
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.texteSection}>Demande de plat:</Text>
        <TouchableOpacity style={styles.boutonValider}onPress={()=>{this.ack(this.state.nonServi,true,false,true)}}><Text style={{color:'#fff',fontSize:15}}>Tout valider</Text></TouchableOpacity>
        </View>
        }
        {this.state.nonServi.map((l, i) => (
            <ListItem key={i} bottomDivider onPress={()=>{this.ack(l,true,false)}}>
                <ListItem.Content >
                <ListItem.Title>{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.commentaire}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}


        {(this.state.serviAddition.length>0 && this.state.nonServiAddition.length==0) &&
        <View>
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.texteSection}>Demande d'addition :</Text>
        <TouchableOpacity style={styles.boutonValider}><Text style={{color:'#fff',fontSize:15}} onPress={()=>{this.ack(this.state.serviAddition,true,true,true)}}>Tout valider</Text></TouchableOpacity>
        </View>
        <View>
{this.state.serviAddition.map((l, i) => (
            <ListItem key={i} bottomDivider onPress={()=>{this.ack(l,true,true)}}>
                <ListItem.Content >
                <ListItem.Title>{l.nom.split('_')[0]} :</ListItem.Title>
                <ListItem.Subtitle>{l.prix} €</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}
        </View>
        </View>
}

{this.state.servi.length>0 &&
<Text style={styles.texteSection}>Déja servi :</Text>
  }
{this.state.servi.map((l, i) => (
            <ListItem key={i} bottomDivider>
                <ListItem.Content >
                <ListItem.Title>{l.nomPlat} (x{l.nombre})</ListItem.Title>
                <ListItem.Subtitle>{l.commentaire}</ListItem.Subtitle>
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
      },
      
      containerStepper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF"
      },
      leftStepper: {
        flex: 1,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#007AFF",
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
        borderRightWidth: 0
      },
      leftIcon: {
        fontSize: 30,
        color: "#007AFF"
      },
      rightStepper: {
        flex: 1,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#007AFF",
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3
      },
      rightIcon: {
        fontSize: 30,
        color: "#007AFF"
      },
  });
  
export default TableServeur;