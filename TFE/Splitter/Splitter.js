import { StyleSheet, View, TouchableOpacity, Text,ScrollView,SafeAreaView, StatusBar   } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            idRestaurant : (this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant)

          };
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
      test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
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
      test.push(<View style={styles.rect} key={this.state.cle} ><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{json[i]['nomPlat']}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {json[i]['prix']}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
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


      this.setState({ channel: 'contacts' });
      this.setState({ cle: 1 });
      const test = [];
      for(let i = 0 ; i < prix.length;i++){
        if(this.state.id == prix[i].id){
          test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>Ma commande:</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {prix[i].prix}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }else{
          test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{prix[i].prenom} {prix[i].nom}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Prix: {prix[i].prix}€</Text><TouchableOpacity style={[styles.boutton, this.props.style]} ><Text style={styles.texte}>button</Text></TouchableOpacity></View></View>);
          this.setState({ cle: this.state.cle+1 });
        }
      }
      this.setState({ chaine: test });
      this.setState({type:0});
    });



    
    
  
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
          test.push(<View style={[styles.containerAddition, this.props.style]} key='1'><View style={styles.bodyContent}><Text style={styles.titleGoesHere}>Addition</Text><Text style={styles.subtitleStyle}>{json[0]['prenom']}  {json[0]['nom']}</Text></View>{autre}<View style={styles.body}><Text style={styles.bodyText}>total: {prix}€</Text></View><TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.props.navigation.navigate('Notation',{id :this.state.id,numCommande: this.state.numCommande,idRestaurant:this.state.idRestaurant})} ><Text style={styles.payement}>Payer</Text></TouchableOpacity></View>);
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
       
        
        </ScrollView >

        }
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
<TouchableOpacity style={[styles.boutton, this.props.style]} }><Text style={styles.commande}>plats partagés</Text></TouchableOpacity>
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