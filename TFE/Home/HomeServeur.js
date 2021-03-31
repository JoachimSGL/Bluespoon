import { StyleSheet, View, TouchableOpacity, Text,SafeAreaView,ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay,ListItem } from 'react-native-elements';
//import {Permissions} from 'expo';
class HomeServeur extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: 0,
            serveur:(this.props.route.params== undefined ? false  :this.props.route.params.serveur),
            makeRequest:true,
            idRestaurant:1,
            list:[],
            listFull:[],
            listOverlay:[{nomPlat:'fez',prix:'df'}],
            visible:false,
            vue : [],
            vueId:[],
            listAddition:[],
            textAccept:'Accepter la commande',
            textDelete:"Commande Servie",
            textAddition:"Addition envoyée",
            prixAddition:0,
          };
    }
    onPress(){
      
    }
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        let serveurData = await AsyncStorage.getItem("serveur");
        let dataS = JSON.parse(serveurData);
        
        if(data!=null){
            if(dataS){
                this.setState({id:data});
                this.setState({serveur:dataS});
            }else{
                this.props.navigation.replace('Home');
            }
        }else{
            this.props.navigation.navigate('Reconnexion');
        }
      } catch (error) {
          console.log("Something went wrong", error);
          this.props.navigation.navigate('Reconnexion');
  }
}
toggleOverlay=()=>{
    this.setState({visible : !this.state.visible});
}
fetched(){
    fetch('http://192.168.0.8:3001/commandeRestaurant?idRestaurant='+this.state.idRestaurant, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
        }
        }).then(response => response.json())
        .then((json) => {
            let arr = [];
            let arrComplet=[];
            let id=[];
            let arrAddition =[];
            for(let i = 0 ; i<json.length;i++){
                if(!json[i].servi){   
                    if(this.findValue(id,json[i].numCommande,json[i].idUtilisateur)){
                        arr.push(json[i]);
                        id.push({num :json[i].numCommande,id:json[i].idUtilisateur,addition:false});
                    }
                    arrComplet.push(json[i]);
                }else{
                    if(json[i].addition){
                        if(this.findValueAddition(id,json[i].idUtilisateur,json[i].contact)){
                            arr.push(json[i]);
                            id.push({num :json[i].contact,id:json[i].idUtilisateur,addition:true});
                        }
                        arrAddition.push(json[i]);
                    }
                }
            }
            this.setState({list : arr});
            this.setState({listFull : arrComplet});
            this.setState({listAddition : arrAddition});
        });
}
    componentDidMount(){



        this.fetched();
                
        
        setInterval(() => {
            if(this.state.makeRequest){
                this.fetched();
                }
            
           }, 5000)
        
    }
    findValue(arr,num,id){//A FAIRE: boucle pour trouver si la com est dedans(en fct de la numcom et de  l id)
        for(let i = 0 ; i<arr.length;i++){
            
            if(arr[i].id == id && arr[i].num == num){
               return false;
            }
        }
        return true;
    }
    findValueAddition(arr,id,contact){//A FAIRE: boucle pour trouver si la com est dedans(en fct de la numcom et de  l id)
        for(let i = 0 ; i<arr.length;i++){
            if(contact==null){
                if(arr[i].id == id){
                    return false;
                }
            }else{
                if(arr[i].num==contact){
                    return false
                }
            }
        }
        return true;
    }
    findIndexOf(arr,num,id){//A FAIRE: boucle pour trouver l'index
    for(let i = 0 ; i<arr.length;i++){
        if(arr[i].id == id && arr[i].num == num){
           return i;
        }
    }
    return 0;
    }
    showCommande(cle){
        let arr = [];
        let full = this.state.listFull;
        for(let i = 0 ; i<full.length;i++){
            
            if(full[i].numCommande==cle.numCommande && full[i].idUtilisateur==cle.idUtilisateur){
                arr.push(full[i]);
            }
        }
        this.setState({listOverlay: arr});
        this.setState({visible:true});
    }
    showAddition(cle){
        let arr = [];
        let full = this.state.listAddition;
        let prix = 0;
        for(let i = 0 ; i<full.length;i++){
            if(cle.contact==null){
                if(full[i].idUtilisateur==cle.idUtilisateur && full[i].contact==null){
                    arr.push(full[i]);
                    prix= prix+full[i].prix;
                }
            }else{
                if(full[i].contact==cle.contact && full[i].idUtilisateur==cle.idUtilisateur ){
                    arr.push(full[i]);
                    prix= prix+full[i].prix;
                }
            }
        }
        this.setState({prixAddition:prix});
        this.setState({listOverlay: arr});
        this.setState({visible:true});
    }


    
    ack(num,id,addition){
        if(!this.findValue(this.state.vue,num,id) && !addition){
            fetch('http://192.168.0.8:3001/addition', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'true'
                  },
                  body: JSON.stringify({
                      servi: true,
                      numCommande: num,
                      idUtilisateur: id
                  })
                })
                this.fetched();
                let arr = this.state.vue;
                const index = this.findIndexOf(arr,num,id);
                if (index > -1) {
                arr.splice(index, 1);
                }
                this.setState({vue:arr});
        }else if(this.findValue(this.state.vue,num,id) && !addition){
            let t = this.state.vue;
            t.push({num:num,id:id});
            this.setState({vue:t});
        }else{
            fetch('http://192.168.0.8:3001/demandeAddition', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({
                    addition: false,
                    numCommande: num,
                    idUtilisateur: id
                })
              })
              this.fetched();
        }
    }
    rectStyle(val,id,addition){
        if(!this.findValue(this.state.vue,val,id) && !addition){
        return {
            width: '100%',
            height: 150,
            backgroundColor: "rgba(165,198,231,1)",
            borderRadius: 33,
            marginTop: 13,
            marginLeft: 1
          }
        }else if(this.findValue(this.state.vue,val,id) && !addition){
            return {
                width: '100%',
                height: 150,
                backgroundColor: "rgba(0,198,231,1)",
                borderRadius: 33,
                marginTop: 13,
                marginLeft: 1
              } 
        }else{
            return {
                width: '100%',
                height: 150,
                backgroundColor: "rgba(255,0,0,1)",
                borderRadius: 33,
                marginTop: 13,
                marginLeft: 1
              }  
        }

    }
    afficherTextButton(val,id,addition){
        if(!this.findValue(this.state.vue,val,id) && !addition){
            return this.state.textDelete
        }else if(this.findValue(this.state.vue,val,id) && !addition){
            return this.state.textAccept
        }else{
            return this.state.textAddition
        }
    }
  render() {
    

    return (
        <View style={styles.container}>



<Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>Commande:                                                                        </Text>
               
                {
                    this.state.listOverlay.map((l, i) => (
                      
                    <ListItem key={i} bottomDivider onPress={() => this.toggleOverlay()} >
                        <ListItem.Content>
                        <ListItem.Title>{l.nomPlat} : {l.prix} €</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    
                    ))
                }
    {this.state.prixAddition!==0 &&
        <ListItem key={-1} bottomDivider onPress={() => this.toggleOverlay()} >
        <ListItem.Content>
        <ListItem.Title>total : {this.state.prixAddition} €</ListItem.Title>
        </ListItem.Content>
        </ListItem>
    }

</Overlay>



      <View style={styles.rect2}>
        <Text style={styles.commandes}>Commandes:</Text>
        
      </View>
      <SafeAreaView style={{width:'100%', height:'92%'}} >
        <ScrollView  style={{ width:'100%', height:'100%'}}>

        {this.state.list.map((l, i) => (
        <View style={this.rectStyle(l.numCommande,l.idUtilisateur,l.addition)} key={i} id={i}>
            <View style={{flexDirection:'row'}}>
                    <Text style={styles.table20}>Table: {l.idTable}</Text>
                    <TouchableOpacity style={[styles.containerButtonConfirmation, this.props.style]} onPress={()=>this.ack(l.numCommande,l.idUtilisateur,l.addition)}>
                        <Text style={styles.voirLaCommande}>{this.afficherTextButton(l.numCommande,l.idUtilisateur,l.addition)}</Text>
                        </TouchableOpacity>
                </View>
            <View style={styles.commande2Row}>
            
            {!l.addition &&
            <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.showCommande(l)}>
                <Text style={styles.voirLaCommande}>Voir la commande</Text>
                </TouchableOpacity>
            }
            {l.addition==true &&
                <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.showAddition(l)}>
                <Text style={styles.voirLaCommande}>Voir l'addition</Text>
                </TouchableOpacity>
            }
            
            </View>
            
        </View>
        ))}
      
        </ScrollView>
        </SafeAreaView>

    </View>
    );
}

}
const styles = StyleSheet.create({
    containerButton: {
        backgroundColor: "#5856D6",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16
      },
      containerButtonConfirmation: {
        backgroundColor: "#5856D6",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        width:'50%',
        height:'60%',
        marginTop:'5%',
        marginLeft:'3%'
      },
      voirLaCommande: {
        color: "#fff",
        fontSize: 17
      },
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(94,110,171,1)"
      },
      rect2: {
        width: '100%',
        height: 37,
        backgroundColor: "rgba(124,162,194,1)"
      },
      commandes: {
        color: "#121212",
        fontSize: 20,
        textDecorationLine: "underline",
        marginTop: 6,
        marginLeft: 121
      },
      rect: {
        width: '100%',
        height: 150,
        backgroundColor: "rgba(165,198,231,1)",
        borderRadius: 33,
        marginTop: 13,
        marginLeft: 1
      },
      table20: {
        color: "#121212",
        fontSize: 18,
        marginTop: 28,
        marginLeft: 37
      },
      commande2: {
        color: "#121212",
        fontSize: 16,
        marginTop: 9
      },
      cupertinoButtonPurple1: {
        height: 37,
        width: 169,
        marginLeft: 20
      },
      commande2Row: {
        height: 37,
        flexDirection: "row",
        marginTop: 22,
        marginLeft: 37,
        marginRight: 47
      }
  });
  
export default HomeServeur;