import { StyleSheet, View, TouchableOpacity, Text,ScrollView,SafeAreaView, StatusBar ,TextInput  } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class Splitter extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            chaine: [],
            channel:'',
            cle:1,
            id:0,
            type :0,
            split:true,
            numCommande : (this.props.route.params==undefined ? 2 : this.props.route.params.numCommande),
            idRestaurant : (this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),
            numTable : (this.props.route.params==undefined ? 1 : this.props.route.params.numTable),
            additionValide : false,
            listeContact:[{prenom:'default', nom:'fuhzifo' , prix: 12 , id : 1}],

          };
          this.toggleOverlay= this.toggleOverlay.bind(this);
          this.ajoutPersonne= this.ajoutPersonne.bind(this);
    }
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        
        if(data!=null){
          this.setState({id:data});

          fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
              method: 'GET',
            
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true'
              }
            }).then(response => response.json())
            .then((json) => {
            this.setState({ channel: 'commandes' });
            const test = [];
            this.setState({ cle: 1 });
            for(let i=0; i<json.length;i++){
            test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
            this.setState({ cle: this.state.cle+1 });
            }

            this.setState({ chaine: test });
          });

        }else{
          this.props.navigation.replace('Home')
        }
        } catch (error) {
        console.log("Something went wrong", error);
      }
    }
componentDidMount(){
  fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      this.setState({ channel: 'commandes' });
      const test = [];
      this.setState({ cle: 1 });
      for(let i=0; i<json.length;i++){
      test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
      this.setState({ cle: this.state.cle+1 });
      }

      this.setState({ chaine: test });
    });
}
toggleSplit=(bool)=>{
  this.setState({split: bool});
}
demandeAddition(){
  fetch('http://192.168.0.8:3001/demandeAddition', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'true'
                  },
                  body: JSON.stringify({
                      addition: true,
                      numCommande: this.state.numCommande,
                      idUtilisateur: this.state.id
                  })
                }).then(response => response.json())
                .then((json) => {
                    if(json=='done'){
                    this.props.navigation.replace('Notation',{id :this.state.id,numCommande: this.state.numCommande,idRestaurant:this.state.idRestaurant});
                    }else{
                      this.toggleOverlay();
                    }
                  });
}
commandes=()=>{
  if(this.state.channel!='commandes'){
    fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      this.setState({ channel: 'commandes' });
      const test = [];
      this.setState({ cle: 1 });
      for(let i=0; i<json.length;i++){
      test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text></View></View>);
      this.setState({ cle: this.state.cle+1 });
      }

      this.setState({ chaine: test });
      this.setState({type:0});
    });
    
  }else{
    fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      this.setState({ channel: 'commandes' });
      const test = [];
      this.setState({ cle: 1 });
      for(let i=0; i<json.length;i++){
      test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text></View></View>);
      this.setState({ cle: this.state.cle+1 });
      }

      this.setState({ chaine: test });
      this.setState({type:0});
    });
    
  }
}
contacts=()=>{
    fetch('http://192.168.0.8:3001/personnes?id='+this.state.id, {
      method: 'GET',
     
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true'
      }
    }).then(response => response.json())
    .then((json) => {
      let nombrePersonne = [];
      let prix = [];

      if(this.state.split){
        for(let i = 0 ; i < json.length; i++){
          if(!nombrePersonne.includes(json[i].id)){
            nombrePersonne.push(json[i].id);
            prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : json[i].prix});
          }else{
            for(let j = 0 ; j < prix.length;j++){
              if(prix[j].id == json[i].id){
                prix[j].prix = prix[j].prix + json[i].prix;
              }
            }
            
          }
        }
      }else{
        let prixTotal = 0;
        for(let i = 0 ; i < json.length; i++){
          if(!nombrePersonne.includes(json[i].id)){
            nombrePersonne.push(json[i].id);
            prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : 0});
          }
          prixTotal = prixTotal + json[i].prix;
        }
        prixTotal = prixTotal/prix.length;
        for(let i = 0 ; i < prix.length; i++){
          prix[i].prix = prixTotal;
        }
      }


      this.setState({ cle: 1 });
      const test = [];
      for(let i = 0 ; i < prix.length;i++){
        if(this.state.id == prix[i].id){
          
          test.push({prenom: 'Ma' , nom: 'Commande' , prix: prix[i].prix , id : prix[i].id});
          //test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>Ma commande:</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Total: {prix[i].prix}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant}); }}><Text style={styles.texte}>Recommander</Text></TouchableOpacity></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }else{
          test.push({prenom: prix[i].prenom , nom: prix[i].nom , prix: prix[i].prix , id : prix[i].id});
          //test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{prix[i].prenom} {prix[i].nom}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Total: {prix[i].prix}€</Text></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }
      }
      console.log(test);
      this.setState({ chaine: []});
      this.setState({listeContact: test});
      this.setState({ channel: 'contacts' });
      this.setState({type:0});
    });



    
    
  
}
toggleOverlay(){
  this.setState({additionValide:!this.state.additionValide});
}
ajoutPersonne(){
  let arr = this.state.listeContact;
  arr.push({prenom:'Nouveau',nom:'contact', prix:0,id:0});
  this.setState({listeContact : arr});
}
addition=()=>{
  
  if(this.state.channel!='addition'){
    

      fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        this.setState({ channel: 'addition' });
        this.setState({ cle: 1 });
        const test = [];
        const autre =[];
        this.setState({ cle: 1 });
        let prix = 0;
        for(let i = 0 ; i<json.length;i++){
          prix = prix+json[i]['prix'];
          autre.push(<View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={this.state.cle}><TouchableOpacity style={styles.actionButton1}><Text style={styles.actionText1}>{json[i]['nomPlat']}</Text></TouchableOpacity><TouchableOpacity style={styles.actionButton2}><Text style={styles.actionText2}>{json[i]['prix']}€</Text></TouchableOpacity></View>);
          this.setState({ cle: this.state.cle+1 });
        }
          test.push(<View style={[styles.containerAddition, this.props.style]} key='1'><View style={styles.bodyContent}><Text style={styles.titleGoesHere}>Addition</Text><Text style={styles.subtitleStyle}>{json[0]['prenom']}  {json[0]['nom']}</Text></View>{autre}<View style={styles.body}><Text style={styles.bodyText}>total: {prix}€</Text></View><TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.demandeAddition()} ><Text style={styles.payement}>Payer</Text></TouchableOpacity></View>);
        this.setState({ chaine: test });
        this.setState({type:0});
        
      });

    
  }else{


    fetch('http://192.168.0.8:3001/commande?id='+this.state.id+'&&numCommande='+this.state.numCommande, {
      method: 'GET',
     
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true'
      }
    }).then(response => response.json())
    .then((json) => {
      this.setState({ channel: 'addition' });
      this.setState({ cle: 1 });
      const test = [];
      const autre =[];
      this.setState({ cle: 1 });
      let prix = 0;
      for(let i = 0 ; i<json.length;i++){
        prix = prix+json[i]['prix'];
        autre.push(<View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={this.state.cle}><TouchableOpacity style={styles.actionButton1}><Text style={styles.actionText1}>{json[i]['nomPlat']}</Text></TouchableOpacity><TouchableOpacity style={styles.actionButton2}><Text style={styles.actionText2}>{json[i]['prix']}€</Text></TouchableOpacity></View>);
        this.setState({ cle: this.state.cle+1 });
      }
        test.push(<View style={[styles.containerAddition, this.props.style]} key='1'><View style={styles.bodyContent}><Text style={styles.titleGoesHere}>Addition</Text><Text style={styles.subtitleStyle}>{json[0]['prenom']}  {json[0]['nom']}</Text></View>{autre}<View style={styles.body}><Text style={styles.bodyText}>total: {prix}€</Text></View></View>);
      this.setState({ chaine: test });
      this.setState({type:0});
    });
  }
  
}

payement=()=>{
  if(this.state.channel!='payement'){
    this.setState({ channel: 'payement' });
    this.setState({type:1});
    /*
    const test = [];
    test.push(<View key={1}><TouchableOpacity style={[styles.typePayement, this.props.style]}><Text style={styles.payement}>par plats</Text></TouchableOpacity><TouchableOpacity style={[styles.typePayement, this.props.style]}><Text style={styles.payement}>Divisé</Text></TouchableOpacity></View>);
    this.setState({ chaine: test });
    */
  }else{
    /*
    const test = [];
    test.push(<View key={1}><TouchableOpacity style={[styles.typePayement, this.props.style]}><Text style={styles.payement}>par plats</Text></TouchableOpacity><TouchableOpacity style={[styles.typePayement, this.props.style]}><Text style={styles.payement}>Divisé</Text></TouchableOpacity></View>);
    this.setState({ chaine: test });
    */
  }
}


  render() {
    return (
      
      <SafeAreaView style={{flex: 1,paddingTop: StatusBar.currentHeight}} >
        {this.state.type == 0 &&
      <ScrollView  style={styles.container}>

        
      
        {this.state.chaine.map((value) => value)}
       {this.state.channel=='contacts' &&
    this.state.listeContact.map((l, i) => (
      <View style={styles.rect} key={i}>
        
        <View style={[styles.containerPrix, this.props.style]}>
          {l.id!==0 &&
          <Text numberOfLines={1} style={styles.commande}>{l.prenom} {l.nom}:</Text>
          }
          {l.id==0 &&
            <TextInput numberOfLines={1} style={styles.commande}>{l.prenom} {l.nom}:</TextInput>
          }
      </View>
    
    <View style={styles.prixRow}>
      <Text style={styles.prix}>Total: {l.prix}€</Text>

      {l.id == this.state.id &&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant}); }}>
        <Text style={styles.texte}>Recommander</Text>
      </TouchableOpacity>
  }

{l.id == 0 &&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant}); }}>
        <Text style={styles.texte}>Commander</Text>
      </TouchableOpacity>
  }
        </View>
        </View>
        ))
    }
        {this.state.channel=='contacts' &&
        <TouchableOpacity style={[styles.containerAdd, this.props.style]} onPress={()=>{this.ajoutPersonne()}}><Icon name="account-plus" style={styles.iconAdd} ></Icon></TouchableOpacity>
        
       }
        </ScrollView >

        }



<Overlay isVisible={this.state.additionValide} onBackdropPress={this.toggleOverlay}  >
                <Text>  Veuillez attendre que votre plat soit arrivé avant de commander l'addition               </Text>
               
                
            </Overlay>




  {this.state.type == 1 &&
  <View style={{width:'100%', height:'92.2%'}}>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(true)}><Text style={styles.payement}>par plats</Text></TouchableOpacity>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(false)} ><Text style={styles.payement}>Divisé</Text></TouchableOpacity>
    </View>
  }
        <View style={[styles.footer, this.props.style]}>
      <TouchableOpacity style={styles.btnWrapper1} onPress={this.commandes}>
        <MaterialCommunityIconsIcon
          name={this.props.icon || "food"}
          style={[
            styles.icon,
            {
              color: this.props.active ? "#007AFF" : "#616161"
            }
          ]}
          
        ></MaterialCommunityIconsIcon>
        <Text
          style={[
            styles.btn1Caption,
            {
              color: this.props.active ? "#007AFF" : "#9E9E9E"
            }
          ]}
        >
          Commandes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2}  onPress={this.contacts}>
        <MaterialCommunityIconsIcon
          name={this.props.icon1 || "contacts"}
          style={styles.icon1}
         
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn2Caption}>
          Contacts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper4} onPress={this.payement}>
        <MaterialCommunityIconsIcon
          name="credit-card"
          style={styles.icon3}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn4Caption}>Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper3}  onPress={this.addition}>
        <MaterialCommunityIconsIcon
          name="poll"
          style={styles.icon2}
         
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn3Caption}>Addition</Text>
      </TouchableOpacity>
    </View>
        </SafeAreaView>
      
    );
}

}

/*
  <TouchableOpacity style={[styles.containerAdd, thisprops.style]}><Icon name="share-variant" style={styles.iconAdd}></Icon></TouchableOpacity>
*/


const styles = StyleSheet.create({
  containerPrix: {
        minWidth: 288,
        justifyContent: "center",
        backgroundColor: "#323232",
        paddingLeft: 24,
        paddingRight: 24,
        //borderRadius: 2,
        width: 322,
        height: 48,
        borderRadius: 100,
        marginTop: 8,
        marginLeft: 19
      },
      containerAdd: {
        backgroundColor: "#3F51B5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 2,
        minWidth: 40,
        minHeight: 40
      },
      iconAdd: {
        color: "#fff",
        fontSize: 24,
        alignSelf: "center"
      },
      commande: {
        fontSize: 17,
        color: "rgba(255,255,255,1)"
      },
      container: {
        flex: 1,
        backgroundColor:"rgba(191,209,249,1)"
      },
      rect: {
        width: '100%',
        height: 150,
        backgroundColor: "rgba(156,175,227,1)",
        marginTop: 10,
        borderRadius: 15
      },
      prix: {
        color: "#121212",
        fontSize: 18,
        marginTop: 11
      },
      prixRow: {
        height: 44,
        flexDirection: "row",
        marginTop: 25,
        marginLeft: 76,
        marginRight: 46
      },
      boutton: {
        backgroundColor: "#007AFF",
        height: '80%',
        width: '40%',
        marginLeft: 66,
        flex:1,
        borderRadius: 15,
      },
      texte: {
        color: "#fff",
      fontSize: 17,
      justifyContent: "center",
        alignItems: "center",
      },





      footer: {
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100%"
      },
      btnWrapper1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      icon: {
        backgroundColor: "transparent",
        fontSize: 24,
        opacity: 0.8
      },
      btn1Caption: {
        fontSize: 12,
        backgroundColor: "transparent",
        paddingTop: 4
      },
      btnWrapper2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      icon1: {
        backgroundColor: "transparent",
        color: "#616161",
        fontSize: 24,
        opacity: 0.8
      },
      btn2Caption: {
        fontSize: 12,
        color: "#9E9E9E",
        backgroundColor: "transparent",
        paddingTop: 4
      },
      btnWrapper3: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      icon2: {
        backgroundColor: "transparent",
        color: "#616161",
        fontSize: 24,
        opacity: 0.8
      },
      btn3Caption: {
        fontSize: 12,
        color: "#9E9E9E",
        backgroundColor: "transparent",
        paddingTop: 4
      },
      btnWrapper4: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      icon3: {
        backgroundColor: "transparent",
        color: "#616161",
        fontSize: 24,
        opacity: 0.8
      },
      btn4Caption: {
        fontSize: 12,
        color: "#9E9E9E",
        backgroundColor: "transparent",
        paddingTop: 4
      },




      containerAddition: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
          width: -2,
          height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
        overflow: "hidden"
      },
      bodyContent: {
        padding: 16,
        paddingTop: 24,
        justifyContent: "center"
      },
      titleGoesHere: {
        fontSize: 24,
        color: "#000",
        paddingBottom: 12
      },
      subtitleStyle: {
        fontSize: 14,
        color: "#000",
        lineHeight: 16,
        opacity: 0.5
      },
      body: {
        padding: 16,
        paddingTop: 8
      },
      bodyText: {
        lineHeight: 20,
        fontSize: 14,
        color: "#424242",
        flexWrap: "wrap"
      },
      actionBody: {
        padding: 8,
        flexDirection: "row"
      },
      actionButton1: {
        padding: 8,
        height: 36
      },
      actionText1: {
        fontSize: 14,
        color: "#000",
        opacity: 0.9
      },
      actionButton2: {
        padding: 8,
        height: 36
      },
      actionText2: {
        fontSize: 14,
        color: "#000",
        opacity: 0.9
      },
      typePayement:{
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '30%',
        width: '100%'
      },
      payement:{
        color: "#fff",
        fontSize: 17
      }
  });
 
export default Splitter;