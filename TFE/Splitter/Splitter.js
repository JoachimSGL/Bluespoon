import { StyleSheet, View, TouchableOpacity, Text,ScrollView,SafeAreaView, StatusBar ,TextInput  } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import stripe from 'tipsi-stripe';

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
            split:0,
            prixTable:0,
            idRestaurant : (this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),
            numTable : (this.props.route.params==undefined ? 1 : this.props.route.params.numTable),
            additionValide : false,
            listeContact:[{prenom:'default', nom:'' , prix: 0 , id : 1}],
            noms:[],
            addition:false,
            method:false,
            listeCommande:[{nom:'test',prenom:'zfdsfs',plats:[{nomPlat:'fuizjf',prix:123}],prix:123}]
            
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
          fetch('https://bluespoon-app.herokuapp.com/table', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({
                    numero: this.state.numTable,
                    id:this.state.id,
                    password:'4A1cDm$12$'
                })
              });
         
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
  fetch('https://bluespoon-app.herokuapp.com/commande?id='+this.state.id, {
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
toggleSplit=(num)=>{
  this.setState({split: num});
  
  fetch('https://bluespoon-app.herokuapp.com/payement', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({
                    payement: num,
                    idTable:this.state.numTable,
                    password:'4A1cDm$12$'
                })
              });
  this.addition();
  
}
 demandeAddition(bool,force){
  if(bool){
  fetch('https://bluespoon-app.herokuapp.com/demandeAddition', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'true'
                  },
                  body: JSON.stringify({
                      addition: true,
                      idUtilisateur: this.state.id,
                      idRestaurant:this.state.idRestaurant,
                      force:force,
                      password:'4A1cDm$12$'
                  })
                }).then(response => response.json())
                .then((json) => {
                    if(json=='done'){
                      this.props.navigation.replace('Notation',{id :this.state.id,idRestaurant:this.state.idRestaurant,numTable:this.state.numTable});
                    }else{
                      this.toggleOverlay();
                    }
                  });
                }else{
                  this.toggleOverlay();
                }
              /*
             stripe.setOptions({
                publishableKey: 'pk_test_51IWLThAs3sbJpSLAKBL9tAwrWaQJqYevvYTqcOB9kTOpG2Oc8FdKSYc29UNQFx4Rng3Za9bEEeM6ir9g5uBGMFPh00z1lexyT0',
                //merchantId: 'MERCHANT_ID', // Optional
                androidPayMode: 'test', // Android only
              })

                  try {
                    const paymentMethod = await stripe.createPaymentMethod({
                      card : {
                        number : '4000002500003155',
                        cvc : '123',
                        expMonth : 11,
                        expYear : 2020
                      }
                    })
                  } catch (e) {
                    // Handle error
                  }*/
}
/*
commandes=()=>{
  if(this.state.channel!='commandes'){
    fetch('https://bluespoon-app.herokuapp.com/commande?id='+this.state.id, {
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
    fetch('https://bluespoon-app.herokuapp.com/commande?id='+this.state.id, {
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
    this.setState({method:true});
    fetch('https://bluespoon-app.herokuapp.com/personnes?id='+this.state.id, {
      method: 'GET',
     
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true'
      }
    }).then(response => response.json())
    .then((json) => {
      
      if(json[0]==undefined){
        this.setState({split:0});
        this.setState({ channel: 'contacts' });
        this.setState({type:0});
        this.setState({addition:false});
        this.setState({listeContact: [{prenom: 'Ma' , nom: 'Commande' , prix: 0 , id : this.state.id, contact:''}]});
      }else{
        let nombrePersonne = [];
        let prix = [];
        let prixTable=0;
        this.setState({split:json[0].payement});
        if(this.state.split==0){
          for(let i = 0 ; i < json.length; i++){
            if(json[i].idTable==this.state.numTable){
                  if(json[i].contact==null){
                    
                  if(!nombrePersonne.includes(json[i].id)){
                    
                    nombrePersonne.push(json[i].id);
                    prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : json[i].prix,contact:json[i].contact,idRef:0});
                    
                  }else{
                    for(let j = 0 ; j < prix.length;j++){
                      if(prix[j].id == json[i].id){
                        let prixCompte = prix[j].prix + json[i].prix;
                        prixCompte = parseFloat(prixCompte).toFixed(2);
                        prix[j].prix = prixCompte;
                      }
                    }
                    
                  }
                }else if(json[i].contact=='Table'){
                  prixTable= (prixTable+json[i].prix).toFixed(2);
                  this.setState({prixTable:prixTable});
                }else{
                  if(!nombrePersonne.includes(json[i].contact)){
                    nombrePersonne.push(json[i].contact);
                    prix.push({id : -1 , nom : '' , prenom : json[i].contact , prix : json[i].prix, contact:json[i].contact,idRef:json[i].id});
                  }else{
                    for(let j = 0 ; j < prix.length;j++){
                      if(prix[j].id == -1 && prix[j].nom=='' && prix[j].prenom ==json[i].contact){
                        prix[j].prix = (prix[j].prix + json[i].prix).toFixed(2);
                      }
                    }
                  }
                }
              }
          }
        }else if(this.state.split==1){
          let prixTotal = 0;
          let prixTable=0;
          for(let i = 0 ; i < json.length; i++){
              if(json[i].contact==null){
                if(!nombrePersonne.includes(json[i].id)){
                  nombrePersonne.push(json[i].id);
                  prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : 0,idRef:0});
                }
              }else if(json[i].contact=='Table'){
                prixTable= prixTable+json[i].prix;
                this.setState({prixTable:prixTable});
              }else{
                if(!nombrePersonne.includes(json[i].contact)){
                  nombrePersonne.push(json[i].contact);
                  prix.push({id : -1 , nom : '' , prenom : json[i].contact , prix : json[i].prix, contact:json[i].contact,idRef:json[i].id});
                }
              }
              prixTotal = prixTotal + json[i].prix;
            }
            prixTotal = prixTotal/prix.length;
            prixTotal= prixTotal.toFixed(2)
            for(let i = 0 ; i < prix.length; i++){
              prix[i].prix = prixTotal;
            }
        
        }else{
          
            let prixTotal = 0;
            for(let i = 0 ; i < json.length; i++){
                if(json[i].contact==null){
                  if(nombrePersonne.length==0 && json[i].id==this.state.id){
                    nombrePersonne.push(json[i].id);
                    prix.push({id :json[i].id , nom : json[i].nom , prenom : json[i].prenom , prix : 0});
                  }
                }
              let prixCompte = prixTotal + json[i].prix;
              prixCompte = parseFloat(prixCompte).toFixed(2);
              prixTotal = prixCompte;
            
            }
            console.log(prix);
            prix[0].prix=prixTotal;
          
        }


        
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
            test.push({prenom: prix[i].prenom , nom: prix[i].nom.split('_')[0] , prix: prix[i].prix , id : prix[i].id, contact:prix[i].contact,idRef:prix[i].idRef});
            //test.push(<View style={styles.rect} key={this.state.cle}><View style={[styles.containerPrix, this.props.style]}><Text numberOfLines={1} style={styles.commande}>{prix[i].prenom} {prix[i].nom}</Text></View><View style={styles.prixRow}><Text style={styles.prix}>Total: {prix[i].prix}€</Text></View></View>);
            this.setState({ cle: this.state.cle+1 });
          }
        }
        if(!nombrePersonne.includes(this.state.id)){
          test.splice(0,0,{prenom: 'Ma' , nom: 'Commande' , prix: 0 , id : this.state.id, contact:null})
        }
        this.setState({ chaine: []});
        this.setState({listeContact: test});
        this.setState({noms:arr});
        this.setState({ channel: 'contacts' });
        this.setState({type:0});
        this.setState({addition:false});
    }
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
rechercheContact(val,id){
  if(id==0){
    let txt = this.state.noms[val]; 
    this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant,contact:txt});
  }else{
    this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant});
  }
}
changeNom(val,txt){
  let arr = this.state.noms;
  arr[val] = txt.nativeEvent.text;
  this.setState({noms: arr});

}
addition=()=>{
  
    

      fetch('https://bluespoon-app.herokuapp.com/commande?idTable='+this.state.numTable+'&&idRestaurant='+this.state.idRestaurant, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        if(this.state.split==0){
          this.setState({ channel: 'addition' });
          const test = [];
          const autre =[];
          let plats=[];
          let prix = 0;
          let listeContact=[];
          let nom='';
          let prenom='';

          for(let i = 0 ; i<json.length;i++){
            
            if(json[i].contact==null && json[i].id==this.state.id){
              prix = prix+json[i]['prix'];
              prenom=json[i].prenom;
              nom=json[i].nom.split('_')[0];
              if(!plats.includes(json[i].nomPlat)){
                autre.push({nomPlat:json[i].nomPlat,prix:json[i].prix,nombre:1});
                plats.push(json[i].nomPlat);
              }else{
                for(let j = 0;j<autre.length;j++){
                  if(autre[j].nomPlat==json[i].nomPlat){
                    autre[j].nombre=autre[j].nombre+1;
                  }
                }
              }
              
            }else{
              if(!listeContact.includes(json[i].id) && json[i].contact==null){
                listeContact.push(json[i].id);
              }else{
                if(!listeContact.includes(json[i].contact)&& json[i].contact!==null){
                  listeContact.push(json[i].contact);
                }
              }
            
            }

          }
          test.push({nom:nom,prenom:prenom,prix:prix,plats:autre});
          let detailContact=[];
          let detailTable=[];
          for(let i = 0 ; i<listeContact.length;i++){
            if(listeContact[i]=='Table'){
              let plats=[];
              for(let j = 0 ; j<json.length;j++){
                if(json[j].contact=='Table'){

                  if(!plats.includes(json[j].nomPlat)){
                    detailTable.push({nomPlat:json[j].nomPlat,prix:json[j].prix,nombre:1});
                    plats.push(json[j].nomPlat);
                  }else{
                    for(let k = 0;k<detailTable.length;k++){
                      if(detailTable[k].nomPlat==json[j].nomPlat){
                        detailTable[k].nombre=detailTable[k].nombre+1;
                      }
                    }
                  }

                }
              }
            }else if(isNaN(listeContact[i])){
              if(this.state.method){
              let platsC=[];
              let prixC=0
              for(let j = 0 ; j<json.length;j++){
                if(listeContact[i]==json[j].contact && json[j].contact!==null){
                  let prixCompte=prixC+json[j].prix;
                  prixCompte = parseFloat(prixCompte).toFixed(2);
                  prixC = prixCompte;

                  if(!platsC.includes(json[j].nomPlat)){
                    detailContact.push({nomPlat:json[j].nomPlat,prix:json[j].prix,nombre:1});
                    platsC.push(json[j].nomPlat);
                  }else{
                    for(let k = 0;k<detailContact.length;k++){
                      if(detailContact[k].nomPlat==json[j].nomPlat){
                        detailContact[k].nombre=detailContact[k].nombre+1;
                      }
                    }
                  }

                }
              }
              test.push({nom:'',prenom:listeContact[i],prix:prixC,plats:detailContact});
              detailContact=[];
            }
            }else{
              if(this.state.method){
              let platsC=[];
              let prixC=0;
              let nom = '';

              for(let j = 0 ; j<json.length;j++){
                if(listeContact[i]==json[j].id && json[j].contact==null){
                  prixC=prixC+json[j].prix;
                  nom=json[j].nom.split('_')[0];
                  if(!platsC.includes(json[j].nomPlat)){
                    detailContact.push({nomPlat:json[j].nomPlat,prix:json[j].prix,nombre:1});
                    platsC.push(json[j].nomPlat);
                  }else{
                    for(let k = 0;k<detailContact.length;k++){
                      if(detailContact[k].nomPlat==json[j].nomPlat){
                        detailContact[k].nombre=detailContact[k].nombre+1;
                      }
                    }
                  }

                }
              }
              test.push({nom:nom,prenom:'',prix:prixC.toFixed(2),plats:detailContact});
              detailContact=[];
            }
          }
          }

          for(let i = 0 ; i<detailTable.length;i++){
            let prixPlat=(detailTable[i].prix*detailTable[i].nombre)/(listeContact.length);
            for(let j = 0; j<test.length;j++){
              test[j].plats.push({nomPlat:'Commande groupée : '+detailTable[i].nombre +' '+detailTable[i].nomPlat,prix:prixPlat.toFixed(2),nombre:1});
              let prixTest =(test[j].prix+prixPlat);
              prixTest = parseFloat(prixTest)
              prixTest = prixTest.toFixed(2);
              test[j].prix = prixTest;
            }
          }


          this.setState({listeCommande:test});
          this.setState({type:0});
          this.setState({addition:true});

        }else if(this.state.split==1){
          let prix=0;
          let arr=[];
          let bigArr=[];
          let contacts=[];
          let plats=[];
          for(let i = 0 ; i<json.length;i++){
              let prixCompte = prix+json[i]['prix'];
              prixCompte = parseFloat(prixCompte).toFixed(2);
              prix = prixCompte;

              if(!plats.includes(json[i].nomPlat)){
                arr.push({nomPlat:json[i].nomPlat,prix:json[i].prix,nombre:1});
                plats.push(json[i].nomPlat);
              }else{
                for(let j = 0;j<arr.length;j++){
                  if(arr[j].nomPlat==json[i].nomPlat){
                    arr[j].nombre=arr[j].nombre+1;
                  }
                }
              }
              if( this.state.id!==json[i].id && !contacts.includes(json[i].id) &&json[i].contact==null){
                contacts.push(json[i].id);
              }
              if(json[i].contact!==null && json[i].contact!=='Table' && !contacts.includes(json[i].contact)){
                contacts.push(json[i].contact);
              }
          }
            prix=prix/(contacts.length+1);
            prix=prix.toFixed(2);
            bigArr.push({nom:'',prenom:'',prix:prix,plats:arr});
            this.setState({listeCommande:bigArr});
            this.setState({ channel: 'addition' });
            this.setState({type:0});
            this.setState({addition:true});

        }else{
          let prix=0;
          let arr=[];
          let bigArr=[];
          let plats=[];
          for(let i = 0 ; i<json.length;i++){
              let prixCompte = prix+json[i]['prix'];
              prixCompte = parseFloat(prixCompte).toFixed(2);
              prix = prixCompte;
              if(!plats.includes(json[i].nomPlat)){
                arr.push({nomPlat:json[i].nomPlat,prix:json[i].prix,nombre:1});
                plats.push(json[i].nomPlat);
              }else{
                for(let j = 0;j<arr.length;j++){
                  if(arr[j].nomPlat==json[i].nomPlat){
                    arr[j].nombre=arr[j].nombre+1;
                  }
                }
              }
          }
            bigArr.push({nom:'',prenom:'',prix:prix.toFixed(2),plats:arr});
            this.setState({ listeCommande: bigArr });
            this.setState({ channel: 'addition' });
            this.setState({type:0});
            this.setState({addition:true});
        }
        
      });

    
  
}

payement=()=>{
    this.setState({ channel: 'payement' });
    this.setState({type:1});
    this.setState({addition:false});
    this.setState({method:true});
    
}
changeFontLeft(){
    if(this.state.method){
      return{
        fontSize: 13,
        color: "#ffffff"
      }
    }else{
      return{
        fontSize: 13,
        color: "#007AFF"
      }
    }
}
changeFontRight(){
  if(this.state.method){
    return{
      fontSize: 13,
      color: "#007AFF"
    }
  }else{
    return{
      fontSize: 13,
      color: "#ffffff"
    }
  }
}
changeStyleRight(){
    if(!this.state.method){
      return {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#007AFF",
        padding: 6,
        borderWidth: 1,
        borderColor: "#007AFF",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
      }
    }else{
      return {
          flex: 1,
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: 6,
          borderWidth: 1,
          borderColor: "#007AFF",
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5
        }
      
    }
  

}
changeStyleLeft(){
  if(!this.state.method){
    return {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 6,
      borderWidth: 1,
      borderColor: "#007AFF",
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5
    }
  }else{
    return {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#007AFF",
        padding: 6,
        borderWidth: 1,
        borderColor: "#007AFF",
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5
      }
    
  }


}
changeMethod(bool){
  this.setState({method:bool});
  this.addition();
  
}
  render() {
    return (
      
      <SafeAreaView style={{flex: 1,paddingTop: StatusBar.currentHeight}} >
        {(this.state.channel=='addition' && this.state.split==0) && 
        <View style={[styles.containerPicker, this.props.style]}>
          <View style={styles.textWrapper}>
          <TouchableOpacity style={this.changeStyleLeft()} onPress={()=>{this.changeMethod(true)}}>
              <Text style={this.changeFontLeft()}>addition de la table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.changeStyleRight()} onPress={()=>{this.changeMethod(false)}}>
              <Text style={this.changeFontRight()} >Mon addition</Text>
            </TouchableOpacity>
            
          </View>
        </View>
  }
        {this.state.type == 0 &&
      <ScrollView  style={styles.container}>

        {this.state.channel=='addition' && 

<View>




<View style={[styles.containerAddition, this.props.style]} key='1'>
  
  <View style={styles.bodyContent}><Text style={styles.titleGoesHere}>
    Addition
    </Text>
    </View>
    {this.state.listeCommande.map((m, i) => (
      <View key={i} style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Text style={styles.subtitleStyle}>
      {m.prenom}  {m.nom}
      </Text>
      
      {this.state.listeCommande[i]['plats'].map((l, j) => (
          <View style={[styles.actionBody,{backgroundColor: this.props.actionBody || undefined}]} key={j}>
            <TouchableOpacity style={styles.actionButton1}>
              <Text style={styles.actionText1}>
                {l.nomPlat} (x{l.nombre})
              </Text>
            </TouchableOpacity><TouchableOpacity style={styles.actionButton2}>
              <Text style={styles.actionText2}>
                {l.prix}€
              </Text>
              </TouchableOpacity>
          </View>

        ))}
      <View style={styles.body}>
        <Text style={styles.titleGoesHere}>total: {m.prix}€</Text>
        </View>
        </View>
    ))}
</View>





</View>
        }
      
        

       {this.state.channel=='contacts' &&
    this.state.listeContact.map((l, i) => (
      <View style={styles.rect} key={i}>
        
        <View style={[styles.containerPrix, this.props.style]}>
          {l.id!==0 &&
          <Text numberOfLines={1} style={styles.commande}>{l.prenom} {l.nom}:</Text>
          
          }
          {l.id==0 &&
            <TextInput numberOfLines={1} placeholder='Nouveau contact' style={styles.textInputContact}  onChange={(text)=>this.changeNom(i,text)}></TextInput>
          }
          <Text style={styles.prix}>Total: {l.prix}€</Text>
      </View>
    
    <View style={styles.prixRow}>
      

      {((l.id == this.state.id || (l.id==-1 && l.idRef==this.state.id))&& l.prix!==0 )&&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant,contact:l.contact}); }}>
        <MaterialCommunityIconsIcon
            name="food"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
        <Text style={styles.texte}>Recommander</Text>
        
      </TouchableOpacity>
  }

{(l.id == 0 || l.prix==0)&&
      <TouchableOpacity style={[styles.boutton, this.props.style]} onPress={()=>{this.rechercheContact(i,l.id); }}>
        <MaterialCommunityIconsIcon
            name="food"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
        <Text style={styles.texte}>Commander</Text>
      </TouchableOpacity>
  }
        </View>
        </View>
        ))
    }
    {this.state.channel=='contacts' &&
    <TouchableOpacity style={[styles.rectGroup, this.props.style,{flex:1,flexDirection:'row',alignItems:'center', justifyContent: "center",}]} onPress={()=>{this.props.navigation.replace('Recherche',{numero:this.state.numTable,idRestaurant:this.state.idRestaurant,contact:'Table'}); }}>
      {this.state.split==0 &&
          <Text numberOfLines={1} style={styles.commandeGroupe}>Commandes groupées : (Total: {this.state.prixTable} €)</Text>
      }

{this.state.split!==0 &&
          <Text numberOfLines={1} style={styles.commandeGroupe}>Commandes groupées </Text>
      }
          </TouchableOpacity>
  }
        {this.state.channel=='contacts' &&
        <TouchableOpacity style={[styles.containerAdd, this.props.style]} onPress={()=>{this.ajoutPersonne()}}><Icon name="account-plus" style={styles.iconAdd} ></Icon></TouchableOpacity>
        
       }
        </ScrollView >

        }



<Overlay isVisible={this.state.additionValide} onBackdropPress={this.toggleOverlay}  >
          <View style={{height:100}}>
                <Text>  Votre plat n'a pas encore été servi voulez vous demander l'addition en même temps               </Text>
                <View style={{flex:1,flexDirection:'row',height:80}}>
                <TouchableOpacity style={[styles.boutonAddition, this.props.style]} onPress={()=>this.demandeAddition(true,true)}><Text style={styles.payement}>Oui</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.boutonAddition, this.props.style]} onPress={()=>this.demandeAddition(false,false)} ><Text style={styles.payement}>Non</Text></TouchableOpacity>
    
                </View>
                </View>
            </Overlay>




  {this.state.type == 1 &&
  <View style={{width:'100%', height:'90%'}}>
    <View style={styles.boxButton}>
    <Text style={styles.infoPayement}>Les plats sont séparés en fonction des commandes.</Text>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(0)}>
    <MaterialCommunityIconsIcon
            name="food"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
      <Text style={styles.payement}>Par personne</Text>
    
    </TouchableOpacity>
    </View>
    <View style={styles.boxButton}>
    <Text style={styles.infoPayement}>Les plats sont divisés par le nombre de personnes assises à la table</Text>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(1)} >
    <MaterialCommunityIconsIcon
            name="account-group"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
      <Text style={styles.payement}>Divisé</Text>
    
    </TouchableOpacity>
    </View>
    <View style={styles.boxButton}>
    <Text style={styles.infoPayement}>Vous payer l'addition de toute la table.</Text>
    <TouchableOpacity style={[styles.typePayement, this.props.style]} onPress={()=>this.toggleSplit(2)} >
    <MaterialCommunityIconsIcon
            name="account-hard-hat"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
      <Text style={styles.payement}>Je paye l'addition</Text>
    
    </TouchableOpacity>
    </View>
    </View>
  }
{this.state.addition &&
<TouchableOpacity style={[styles.typePayementAddition, this.props.style]} onPress={()=>this.demandeAddition(true,false)} >
<MaterialCommunityIconsIcon
            name="credit-card-check-outline"
            style={styles.texteIcon}
          ></MaterialCommunityIconsIcon>
  <Text style={styles.payement}>Payer</Text>
  </TouchableOpacity>
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



const styles = StyleSheet.create({
  containerPrix: {
        justifyContent: "center",
        backgroundColor: "rgba(156,175,227,1)",
        //borderRadius: 2,
        width: '40%',
        height: '90%',
        borderRadius: 100,
        marginTop: '2%',
        marginLeft: '3%'
      },
      containerAdd: {
        backgroundColor: "#3F51B5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 280,
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 2,
        height:80,
        width:'20%',
        marginLeft:'80%'
      },
      iconAdd: {
        color: "#fff",
        fontSize: 24,
        alignSelf: "center"
      },
      commande: {
        fontSize: 17,
        color: "rgba(0,0,0,1)"
      },
      textInputContact:{
        fontSize: 17,
        color: "#fff",
        height:'60%',
        borderRadius:20,
        width:'100%',
        padding:'10%',
        backgroundColor:"#3F51B5"
      },
      commandeGroupe: {
        fontSize: 20,
        color: "rgba(255,255,255,1)",
      },
      container: {
        flex: 1,
        backgroundColor:"rgba(191,209,249,1)"
      },
      rect: {
        width: '100%',
        height: 100,
        backgroundColor: "rgba(156,175,227,1)",
        marginTop: '2%',
        borderRadius: 15,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      rectGroup:{
        width: '100%',
        height: 100,
        backgroundColor: "#007AFF",
        marginTop: 10,
        borderRadius: 15
      },
      prix: {
        color: "#121212",
        fontSize: 18,
        marginTop: 11
      },
      prixRow: {
        height: '70%',
        width:'50%',
        flexDirection: "row",
        marginTop: '4%',
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
        flexDirection:'row'
      },
      texte: {
        color: "#fff",
      fontSize: 18,
      marginTop:'2%'
      },
      texteIcon: {
        color: "#fff",
      fontSize: 30,
      marginRight:'5%'
      },




      footer: {
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100%",
        height:'10%'
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
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: "center"
      },
      titleGoesHere: {
        fontSize: 24,
        color: "#000",
        paddingBottom: 12
      },
      subtitleStyle: {
        fontSize: 18,
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
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '40%',
        width: '100%'
      },
      boutonAddition:{
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 20,
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%',
        width: '50%'
      },
      typePayementAddition:{
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        paddingLeft: 16,
        paddingRight: 16,
        height: '10%',
        width: '100%'
      },
      payement:{
        color: "#fff",
        fontSize: 17
      },
      infoPayement:{
        color: "#000",
        fontSize: 17,
        marginBottom:'5%'
      },
      containerPicker: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        backgroundColor: "rgba(180,238,239,1)",
        width:'100%',
        height:'8%'
      },
      textWrapper: {
        height: 29,
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: "row"
      },
      boxButton:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:'center',
        height:'30%',
        backgroundColor:"rgba(156,175,227,1)"

      }
  });
 
export default Splitter;