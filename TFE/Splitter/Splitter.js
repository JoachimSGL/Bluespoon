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
            channel:'contacts',
            cle:1,
            id:0,
            type :0,
            split:true,
            numCommande : (this.props.route.params==undefined ? 2 : this.props.route.params.numCommande),
            idRestaurant : (this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),
            numTable : (this.props.route.params==undefined ? 1 : this.props.route.params.numTable),
            additionValide : false,
            listeContact:[{prenom:'default', nom:'' , prix: 0 , id : 1}],
            noms:[],
            addition:false,

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
          /*
          fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
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
          });
          */
          this.contacts();
        }else{
          this.props.navigation.replace('Home')
        }
        } catch (error) {
        console.log("Something went wrong", error);
      }
    }
componentDidMount(){
 
  /*
  fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
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
    });
    */
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
/*
commandes=()=>{
  if(this.state.channel!='commandes'){
    fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
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
    fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
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
*/
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
          if(json[i].contact==null){
            
          if(!nombrePersonne.includes(json[i].id)){
            
             nombrePersonne.push(json[i].id);
             prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : json[i].prix,contact:json[i].contact});
            
          }else{
            for(let j = 0 ; j < prix.length;j++){
              if(prix[j].id == json[i].id){
                prix[j].prix = prix[j].prix + json[i].prix;
              }
            }
            
          }
        }else{
          if(!nombrePersonne.includes(json[i].contact)){
            nombrePersonne.push(json[i].contact);
            prix.push({id : -1 , nom : '' , prenom : json[i].contact , prix : json[i].prix, contact:json[i].contact});
          }else{
            for(let j = 0 ; j < prix.length;j++){
              if(prix[j].id == -1 && prix[j].nom=='' && prix[j].prenom ==json[i].contact){
                prix[j].prix = prix[j].prix + json[i].prix;
              }
            }
          }
        }
        }
      }else{
        let prixTotal = 0;
        for(let i = 0 ; i < json.length; i++){
          if(json[i].contact==null){
            if(!nombrePersonne.includes(json[i].id)){
              nombrePersonne.push(json[i].id);
              prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : 0});
            }
          }else{
            if(!nombrePersonne.includes(json[i].contact)){
              nombrePersonne.push(json[i].contact);
              prix.push({id : -1 , nom : '' , prenom : json[i].contact , prix : json[i].prix, contact:json[i].contact});
            }
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
      let arr = [];
      for(let i = 0 ; i < prix.length;i++){
        if(this.state.id == prix[i].id){
          arr.push('Ma Commande');
          test.push({prenom: 'Ma' , nom: 'Commande' , prix: prix[i].prix , id : prix[i].id, contact:prix[i].contact});
          //test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>Ma commande:</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Total: {prix[i].prix}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant}); }}><Text style={styles.texte}>Recommander</Text></TouchableOpacity></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }else{
          arr.push(prix[i].prenom +' '+ prix[i].nom);
          test.push({prenom: prix[i].prenom , nom: prix[i].nom , prix: prix[i].prix , id : prix[i].id, contact:prix[i].contact});
          //test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{prix[i].prenom} {prix[i].nom}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Total: {prix[i].prix}€</Text></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }
      }
      this.setState({ chaine: []});
      this.setState({listeContact: test});
      this.setState({noms:arr});
      this.setState({ channel: 'contacts' });
      this.setState({type:0});
      this.setState({addition:false});
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
rechercheContact(val){
  let txt = this.state.noms[val]; 
  this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant,contact:txt});
}
changeNom(val,txt){
  let arr = this.state.noms;
  arr[val] = txt.nativeEvent.text;
  this.setState({noms: arr});

}
addition=()=>{
  
    

      fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        if(this.state.split){
          this.setState({ channel: 'addition' });
          this.setState({ cle: 2 });
          const test = [];
          const autre =[];
          let prix = 0;
          let listeContact=[]
          for(let i = 0 ; i<json.length;i++){
            if(json[i].contact==null){
              prix = prix+json[i]['prix'];
              autre.push(<View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={this.state.cle}><TouchableOpacity style={styles.actionButton1}><Text style={styles.actionText1}>{json[i]['nomPlat']}</Text></TouchableOpacity><TouchableOpacity style={styles.actionButton2}><Text style={styles.actionText2}>{json[i]['prix']}€</Text></TouchableOpacity></View>);
              this.setState({ cle: this.state.cle+1 });
            }else{
              if(!listeContact.includes(json[i].contact)){
                listeContact.push(json[i].contact);
              }
            }

          }
          test.push(<View style={[styles.containerAddition, this.props.style]} key='1'><View style={styles.bodyContent}><Text style={styles.titleGoesHere}>Addition</Text><Text style={styles.subtitleStyle}>{json[0]['prenom']}  {json[0]['nom']}</Text></View>{autre}<View style={styles.body}><Text style={styles.bodyText}>total: {prix}€</Text></View></View>);
          this.setState({ cle: this.state.cle+1 });
          let detailContact=[];
          for(let i = 0 ; i<listeContact.length;i++){

            let prixC=0
            for(let j = 0 ; j<json.length;j++){
              if(listeContact[i]==json[j].contact && json[j].contact!==null){
                
                detailContact.push(<View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={this.state.cle}><TouchableOpacity style={styles.actionButton1}><Text style={styles.actionText1}>{json[j]['nomPlat']}</Text></TouchableOpacity><TouchableOpacity style={styles.actionButton2}><Text style={styles.actionText2}>{json[j]['prix']}€</Text></TouchableOpacity></View>);
                prixC=prixC+json[j].prix;
                this.setState({ cle: this.state.cle+1 });
              }
            }
            test.push(<View style={[styles.containerAddition, this.props.style]} key={this.state.cle}><View style={styles.bodyContent}><Text style={styles.subtitleStyle}>{listeContact[i]}</Text></View>{detailContact}<View style={styles.body}><Text style={styles.bodyText}>total: {prixC}€</Text></View></View>);
            detailContact=[];
            this.setState({ cle: this.state.cle+1 });
          }
          
          //test.push(<TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.demandeAddition()} ><Text style={styles.payement}>Payer</Text></TouchableOpacity>);
          this.setState({ chaine: test });
          this.setState({type:0});
          this.setState({addition:true});
        }else{
          let prix=0;
          let arr=[];
          let bigArr=[];
          let contacts=[];
          this.setState({ cle: 2 });
          for(let i = 0 ; i<json.length;i++){
              prix = prix+json[i]['prix'];
              arr.push(<View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={this.state.cle}><TouchableOpacity style={styles.actionButton1}><Text style={styles.actionText1}>{json[i]['nomPlat']}</Text></TouchableOpacity><TouchableOpacity style={styles.actionButton2}><Text style={styles.actionText2}>{json[i]['prix']}€</Text></TouchableOpacity></View>);
              this.setState({ cle: this.state.cle+1 });
              if(json[i].contact!==null && !contacts.includes(json[i].contact)){
                contacts.push(json[i].contact);
              }
          }
            prix=prix/(contacts.length+1);
            bigArr.push(<View style={[styles.containerAddition, this.props.style]} key='1'><View style={styles.bodyContent}><Text style={styles.titleGoesHere}>Addition</Text></View>{arr}<View style={styles.body}><Text style={styles.bodyText}>total: {prix}€ par personne</Text></View></View>);
            this.setState({ chaine: bigArr });
            this.setState({ channel: 'addition' });
            this.setState({type:0});
            this.setState({addition:true});
        }
        
      });

    
  
}

payement=()=>{
  if(this.state.channel!='payement'){
    this.setState({ channel: 'payement' });
    this.setState({type:1});
    this.setState({addition:false});
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
            <TextInput numberOfLines={1} style={styles.commande} onChange={(text)=>this.changeNom(i,text)}>{l.prenom} {l.nom}:</TextInput>
          }
      </View>
    
    <View style={styles.prixRow}>
      <Text style={styles.prix}>Total: {l.prix}€</Text>

      {(l.id == this.state.id || l.id==-1)&&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant,contact:l.contact}); }}>
        <Text style={styles.texte}>Recommander</Text>
      </TouchableOpacity>
  }

{l.id == 0 &&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.rechercheContact(i); }}>
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
  <View style={{width:'100%', height:'93.2%'}}>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(true)}><Text style={styles.payement}>par plats</Text></TouchableOpacity>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(false)} ><Text style={styles.payement}>Divisé</Text></TouchableOpacity>
    </View>
  }
{this.state.addition &&
<TouchableOpacity style={[styles.typePayementAddition, this.props.style]} onPress={()=>this.demandeAddition()} ><Text style={styles.payement}>Payer</Text></TouchableOpacity>
  }
        <View style={[styles.footer, this.props.style]}>
      
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
*/


const styles = StyleSheet.create({
  containerPrix: {
        minWidth: 288,
        justifyContent: "center",
        backgroundColor: "#0B2444",
        paddingLeft: '10%',
        paddingRight: '10%',
        //borderRadius: 2,
        width: '80%',
        height: '30%',
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
        height: '50%',
        flexDirection: "row",
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '2%'
      },
      boutton: {
        backgroundColor: "#007AFF",
        height: '100%',
        width: '100%',
        marginLeft: '10%',
        flex:1,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      texte: {
        color: "#fff",
      fontSize: 18,
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
      typePayementAddition:{
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '10%',
        width: '100%'
      },
      payement:{
        color: "#fff",
        fontSize: 17
      }
  });
 
export default Splitter;