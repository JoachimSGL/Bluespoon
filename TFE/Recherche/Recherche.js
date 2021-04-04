import { StyleSheet, View, TouchableOpacity, Text, Image,ScrollView,SafeAreaView, Animated ,Easing } from "react-native";
import React from 'react';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay,ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Recherche extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: -1,
            idRestaurant: (this.props.route.params== undefined ? 1  :this.props.route.params.idRestaurant),
            numTable: (this.props.route.params== undefined ? 0  :this.props.route.params.numero),
            contact: (this.props.route.params== undefined ? null  :this.props.route.params.contact),
            visible:false,
            nom:'Pas de plats diponible',
            commentaires:'default',
            imagePlat:'null.jpg',
            prix:'0',
            num:0,
            place:0,
            placeBoissons:0,
            panier:0,
            idPlat:0,
            listBoissons : [[{name:'Pas de boissons disponible',subtitle:'default',prix:0,idPlat:0 }]],
            list : [[{name:'Pas de plats disponible',subtitle:'default',prix:0,idPlat:0 }]],
            listCommande:[],


            listNote:[[{name:'Eric Cartman',subtitle:'default',note:0,idNotation:0 }]],
            notes:false,
            visibleNote:false,
            placeNote:0,





            fadeAnim: new Animated.Value(0),
          

          };
    }
    onPress(){
      
    }
    fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.sequence([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing:Easing.elastic(2),
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true
      }),
    ]
      ).start();
      
      
    };
  
    async getToken() {
          try {
            
            let userData = await AsyncStorage.getItem("id");
            let data = JSON.parse(userData);
            if(data!=null){
              this.setState({id:data});
              if(Number.isInteger(parseInt(this.state.numTable)) && this.state.numTable!=0 ){
                fetch('http://192.168.0.27:3001/table', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'true'
                  },
                  body: JSON.stringify({
                      numero: this.state.numTable,
                      id :this.state.id,
                  })
                })
      
      
            }else{
              this.props.navigation.replace('Home'); 
            }
            }else{
              this.setState({id:0});
            }
          } catch (error) {
              console.log("Something went wrong", error);
      }
    }
    componentDidMount(){
        
        fetch('http://192.168.0.27:3001/plats?idRestaurant='+this.state.idRestaurant, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let arr = [];
        let arrCinq = [];
        let compteur=0;
        let bool = true;
        for(let i = 0 ; i < json.length; i++){
          if(compteur<4){
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat});
            compteur++;
            bool = true;
          }else{
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat});
            arr.push(arrCinq);
            arrCinq = [];
            compteur=0;
            bool = false;
          }
        }
        if(bool){
          for(let i = compteur;i<5;i++){
            arrCinq.push({});
          }
          arr.push(arrCinq);
        }
        if(json.length!==0){
        this.setState({list : arr});
        this.setState({panier : 0});
        this.setState({nom : arr[0][0].name});
        this.setState({prix : arr[0][0].prix});
        this.setState({commentaires : arr[0][0].subtitle});
        this.setState({idPlat : arr[0][0].idPlat});
        this.setState({imagePlat : arr[0][0].imagePlat});
        }
      });



      fetch('http://192.168.0.27:3001/boissons?idRestaurant='+this.state.idRestaurant, {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let arr = [];
        let arrCinq = [];
        let compteur=0;
        let bool = true;
        for(let i = 0 ; i < json.length; i++){
          if(compteur<4){
          arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat});
            compteur++;
            bool = true;
          }else{
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat});
            arr.push(arrCinq);
            arrCinq=[];
            compteur=0;
            bool = false;
          }
          compteur++;
        }
        if(bool){
          for(let i = compteur;i<5;i++){
            arrCinq.push({});
          }
          arr.push(arrCinq);
        }
        if(json.length!==0){
          this.setState({listBoissons : arr});
        }
      });
      /*
      fetch('http://192.168.0.27:3001/image?idPlat=8', {
        method: 'GET',
       
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
          console.log(json);
                    
          var bytes = utf8.encode(json);
          var encoded = base64.encode(bytes);
          this.setState({image : encoded});
        
      });
*/




          
        }
        changePlaceFood=(bool)=>{
          if(bool){
            
              if(this.state.list.length-1>this.state.place){
                this.setState({place : this.state.place+1});
              }
            }else{
              if(this.state.place>0){
                this.setState({place : this.state.place-1})
              }
            }

        }
        changePlaceBoissons=(bool)=>{
          if(bool){
            
              if(this.state.listBoissons.length-1>this.state.placeBoissons){
                this.setState({placeBoissons : this.state.placeBoissons+1});
              }
            }else{
              if(this.state.placeBoissons>0){
                this.setState({placeBoissons : this.state.placeBoissons-1})
              }
            }

        }
        changePlaceNote=(bool)=>{
          if(bool){
            
              if(this.state.listNote.length-1>this.state.placeNote){
                this.setState({placeNote : this.state.placeNote+1});
              }
            }else{
              if(this.state.placeNote>0){
                this.setState({placeNote : this.state.placeNote-1})
              }
            }

        }
        toggleOverlay=()=>{
            this.setState({visible : !this.state.visible});
        }
        toggleOverlayNote=()=>{
          this.setState({visibleNote : !this.state.visibleNote});
          this.setState({notes : !this.state.notes});
      }
        food=()=>{
          this.setState({panier : 0});
          this.setState({nom : this.state.list[0][0].name});
          this.setState({prix : this.state.list[0][0].prix});
          this.setState({commentaires : this.state.list[0][0].subtitle});
          this.setState({idPlat : this.state.list[0][0].idPlat});
          this.setState({imagePlat : this.state.list[0][0].imagePlat});
          this.setState({placeNote:0});
          this.setState({placeBoissons:0});
          this.setState({place:0});
        }
        boissons=()=>{
          this.setState({panier : 2});
          this.setState({nom : this.state.listBoissons[0][0].name});
          this.setState({prix : this.state.listBoissons[0][0].prix});
          this.setState({commentaires : this.state.listBoissons[0][0].subtitle});
          this.setState({idPlat : this.state.listBoissons[0][0].idPlat});
          this.setState({imagePlat : this.state.listBoissons[0][0].imagePlat});
          
          this.setState({placeNote:0});
          this.setState({placeBoissons:0});
          this.setState({place:0});
        }
        panier=()=>{
          this.setState({panier : 1});
        }
        commander=()=>{
          
          let arr = this.state.listCommande;
          let bool=true;
          for(let i = 0 ; i<arr.length;i++){
            if(arr[i][3]==this.state.idPlat){
              arr[i][4]=arr[i][4]+1;
              bool=false;
            }
          }
          if(bool){
            arr.push([this.state.nom,this.state.commentaires,this.state.prix,this.state.idPlat,1]);
          }
          this.fadeIn();
          //this.fadeOut();
          this.setState({listCommande : arr});
        }
        splitter=()=>{
          this.props.navigation.replace('Splitter'); 
        }
        changerPlat=(val)=>{
          if(Object.entries(this.state.list[this.state.place][val]).length==0){
            this.toggleOverlay();
            this.setState({placeNote:0});
            this.setState({place:0});
            this.setState({placeBoissons:0});
          }else{
            this.setState({nom : this.state.list[this.state.place][val].name});
            this.setState({prix : this.state.list[this.state.place][val].prix});
            this.setState({commentaires : this.state.list[this.state.place][val].subtitle});
            this.setState({idPlat : this.state.list[this.state.place][val].idPlat});
            this.setState({imagePlat : this.state.list[this.state.place][val].imagePlat});

            this.toggleOverlay();
            this.setState({placeNote:0});
            this.setState({placeBoissons:0});
            this.setState({place:0});
          }
        }
        changerBoisson=(val)=>{
          if(Object.entries(this.state.listBoissons[this.state.placeBoissons][val]).length==0){
            this.toggleOverlay();
            this.setState({placeNote:0});
            this.setState({place:0});
            this.setState({placeBoissons:0});
          }else{
            this.setState({nom : this.state.listBoissons[this.state.placeBoissons][val].name});
            this.setState({prix : this.state.listBoissons[this.state.placeBoissons][val].prix});
            this.setState({commentaires : this.state.listBoissons[this.state.placeBoissons][val].subtitle});
            this.setState({idPlat : this.state.listBoissons[this.state.placeBoissons][val].idPlat});
            this.setState({imagePlat : this.state.listBoissons[this.state.placeBoissons][val].imagePlat});
            this.toggleOverlay();
            this.setState({placeNote:0});
            this.setState({placeBoissons:0});
            this.setState({place:0});
          }
      }
      changerNote=(val)=>{
        this.toggleOverlayNote();
      }
        Passercommande=()=>{
          if(this.state.listCommande.length==0 ){
            this.setState({panier:3});
            this.toggleOverlay();
          }else{
            let numCommande=0;
            fetch('http://192.168.0.27:3001/ajoutCommande', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': 'true'
              },
              body: JSON.stringify({
                  commande: this.state.listCommande,
                  idRestaurant:this.state.idRestaurant,
                  id:this.state.id,
                  idTable:this.state.numTable,
                  contact:this.state.contact
              })
            }).then(response => response.json())
            .then((json) => {
              numCommande=json;
              this.props.navigation.replace('Splitter',{numCommande:numCommande,idRestaurant : this.state.idRestaurant,numTable:this.state.numTable});
            });

          



          }
          
        }
        supprimer=(key)=>{
          let com = this.state.listCommande;
          if(com[key][4]==1){
            com.splice(key,1);
          }else{
            com[key][4]=com[key][4]-1;
          }
          this.setState({listCommande : com});
        }
        note(){
          fetch('http://192.168.0.27:3001/notation?idRestaurant='+this.state.idRestaurant, {
  method: 'GET',
 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true'
  }
}).then(response => response.json())
.then((json) => {
    let arr = [];
        let arrCinq = [];
        let compteur=0;
        let bool = true;
        for(let i = 0 ; i < json.length; i++){
          if(this.state.idPlat==json[i].idPlat){
            if(compteur<3){
              arrCinq.push({name :json[i].prenom+' '+json[i].nom,subtitle : json[i].commentairesNotation,note : json[i].note,idPlat:json[i].idPlat});
              compteur++;
              bool = true;
            }else{
              arrCinq.push({name :json[i].prenom+' '+json[i].nom,subtitle : json[i].commentairesNotation,note : json[i].note,idPlat:json[i].idPlat});
              arr.push(arrCinq);
              arrCinq=[];
              compteur=0;
              bool = false;
            }
            compteur++;
          }
        }
        if(bool){
          arr.push(arrCinq);
        }
        if(json.length!==0){
          this.setState({listNote : arr});
          this.setState({notes:true});
          this.setState({visibleNote:true});
          this.setState({placeNote:0});
        }
  
});
          
        }
  render() {
    

    return (
      <View className='container'>
{this.state.panier == 3 &&
            <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>Veuillez séléctionner au moins un article</Text>
            </Overlay>
  }


        {this.state.panier == 3 &&
                <SafeAreaView style={{width:'100%', height:'89.7%'}} >
                          <ScrollView  style={{ width:'100%', height:'100%'}}>

                          {this.state.listCommande.map((l, i) => (
                          <ListItem key={i} onPress={()=>this.supprimer(i)}>
                              <ListItem.Content>
                              <ListItem.Title>{l[0]}</ListItem.Title>
                              <ListItem.Subtitle>{l[1]}</ListItem.Subtitle>
                              <ListItem.Subtitle>prix : {l[2]} €</ListItem.Subtitle>
                              </ListItem.Content>
                          </ListItem>
                          
                          ))}
                          </ScrollView>
                          
                        <TouchableOpacity style={[styles.containerButtonCommande, this.props.style]} onPress={()=>this.Passercommande()}>
                        <Text style={styles.caption}>Passer commande</Text>
                        </TouchableOpacity>
                        </SafeAreaView>
                }

{this.state.panier == 0 &&
            <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>Menu:                                                               page : {this.state.place+1}/{this.state.list.length}</Text>
               
                {
                    this.state.list[this.state.place].map((l, i) => (
                      
                    <ListItem key={i} bottomDivider onPress={() => this.changerPlat(i)} >
                        <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
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
                      onPress={()=>this.changePlaceFood(false)}
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
                      
                      onPress={()=>this.changePlaceFood(true)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-right"
                        style={styles.rightIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                  </View>
            </Overlay>
  }



            {this.state.panier == 0 &&
        <View style={styles.rect}>
                        <View style={styles.materialButtonPrimary1Row}>
                                    <View style={[styles.containerImage, this.props.style]}>
                                        <Image
                                            source={{uri: "http://192.168.0.8:3001/image/"+this.state.imagePlat}}
                                            style={styles.cardItemImagePlace}
                                        ></Image>
                                                <View style={styles.cardBodyTop}>
                                                    <View style={styles.bodyContent}>
                                                    <Text style={styles.titleStyle}>
                                                        {this.state.nom}
                                                    </Text>
                                                    <Text style={styles.subtitleStyle}>
                                                    {this.state.commentaires}
                                                    </Text>
                                                    </View>
                                                    
                                                    </View>


                                                    <Animated.View style={[styles.cardBodyAnimated,{opacity: this.state.fadeAnim, transform: [
                            
                                                    {
                                                        translateY: this.state.fadeAnim.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [0, 25]
                                                        })
                                                    }]}]} >
                                                    <View style={styles.actionBody}>
                                                    <Text style={styles.titleStyleAnimated}>Ajouté à la commande</Text>
                                                    </View>
                                                    </Animated.View>


                                                    <View style={styles.cardBody}>
                                                    <View style={styles.actionBody}>
                                                    <TouchableOpacity style={styles.actionButton1}>
                                                        <Text style={styles.actionText1}>
                                                        Prix :
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.actionButton2}>
                                                        <Text style={styles.actionText2}>
                                                        {this.state.prix} €
                                                        </Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note()}>
                                                    <Text style={styles.captionNote}>Notes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                    </View>

                        </View>
            <View style={{flex:1,width:'100%',height:'100%'}}>
            <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.commander()}>
            <Text style={styles.caption}>Ajouter à la commande</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]} onPress={this.toggleOverlay}>
            <Text style={styles.captionMauve}>Catalogue</Text>
            </TouchableOpacity>
            
            </View>  
            <View>
            
            </View>
        </View >

        }

{this.state.panier == 2 &&
            <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>Menu:                                                               page : {this.state.placeBoissons+1}/{this.state.listBoissons.length}</Text>
               
                {
                    this.state.listBoissons[this.state.placeBoissons].map((l, i) => (
                      
                    <ListItem key={i} bottomDivider onPress={() => this.changerBoisson(i)} >
                        <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
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
                      onPress={()=>this.changePlaceBoissons(false)}
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
                      
                      onPress={()=>this.changePlaceBoissons(true)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-right"
                        style={styles.rightIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                  </View>
            </Overlay>
  }



            {this.state.panier == 2 &&
        <View style={styles.rect}>
                        <View style={styles.materialButtonPrimary1Row}>
                                    <View style={[styles.containerImage, this.props.style]}>
                                        <Image
                                            source={{uri: "http://192.168.0.8:3001/image/"+this.state.imagePlat}}
                                            style={styles.cardItemImagePlace}
                                        ></Image>
                                                <View style={styles.cardBodyTop}>
                                                    <View style={styles.bodyContent}>
                                                    <Text style={styles.titleStyle}>
                                                        {this.state.nom}
                                                    </Text>
                                                    <Text style={styles.subtitleStyle}>
                                                    {this.state.commentaires}
                                                    </Text>
                                                    </View>
                                                    </View>

                                                    <Animated.View style={[styles.cardBodyAnimated,{opacity: this.state.fadeAnim, transform: [
                            
                                                    {
                                                        translateY: this.state.fadeAnim.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [0, 25]
                                                        })
                                                    }]}]} >
                                                    <View style={styles.actionBody}>
                                                    <Text style={styles.titleStyleAnimated}>Ajouté à la commande</Text>
                                                    </View>
                                                    </Animated.View>

                                                    <View style={styles.cardBody}>
                                                    <View style={styles.actionBody}>
                                                    <TouchableOpacity style={styles.actionButton1}>
                                                        <Text style={styles.actionText1}>
                                                        Prix :
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.actionButton2}>
                                                        <Text style={styles.actionText2}>
                                                        {this.state.prix} €
                                                        </Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note()}>
                                                    <Text style={styles.captionNote}>Notes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                    </View>

                        </View>
            <View style={{flex:1,width:'100%',height:'100%'}}>
            <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.commander()}>
            <Text style={styles.caption}>Ajouter à la commande</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]} onPress={this.toggleOverlay}>
            <Text style={styles.captionMauve}>Catalogue</Text>
            </TouchableOpacity>
            
            </View>  
            <View>
            
            </View>
        </View >

        }
{this.state.notes &&
            <Overlay isVisible={this.state.visibleNote} onBackdropPress={this.toggleOverlayNote}  >
                <Text>Notes:                                                               page : {this.state.placeNote+1}/{this.state.listNote.length}</Text>
               
                {
                    this.state.listNote[this.state.placeNote].map((l, i) => (
                      
                    <ListItem key={i} bottomDivider onPress={() => this.changerNote(i)} >
                        <ListItem.Content>
                        <ListItem.Title>note : {l.note}/7</ListItem.Title>
                        <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
                        <ListItem.Subtitle>Commentaire : {l.subtitle}</ListItem.Subtitle>
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
                      onPress={()=>this.changePlaceNote(false)}
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
                      
                      onPress={()=>this.changePlaceNote(true)}
                    >
                      <MaterialCommunityIconsIcon
                        name="arrow-right"
                        style={styles.rightIcon}
                      ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                  </View>
            </Overlay>
  }





        {this.state.panier == 1 &&
        <SafeAreaView style={{width:'100%', height:'90%'}} >
          <ScrollView  style={{ width:'100%', height:'100%'}}>

          {this.state.listCommande.map((l, i) => (
          <ListItem key={i}>
              <ListItem.Content>
              <ListItem.Title>{l[0]} (x{l[4]})</ListItem.Title>
              <ListItem.Subtitle>{l[1]}</ListItem.Subtitle>
              <ListItem.Subtitle>prix : {l[2]} €</ListItem.Subtitle>
              
              </ListItem.Content>
              <TouchableOpacity style={[styles.containerTrash, this.props.style]} onPress={()=>this.supprimer(i)}>
                <Icon name="ios-trash" style={styles.iconTrash}></Icon>
              </TouchableOpacity>
          </ListItem>
          
          ))}
          </ScrollView>
          
        <TouchableOpacity style={[styles.containerButtonCommande, this.props.style]} onPress={()=>this.Passercommande()}>
        <Text style={styles.caption}>Passer commande</Text>
        </TouchableOpacity>
        </SafeAreaView>
        }
        




            







            <View style={[styles.containerFooter, this.props.style]}>
            <TouchableOpacity style={styles.btnWrapper1} onPress={()=>this.food()}>
                <MaterialCommunityIconsIcon
                name={this.props.icon1 || "food"}
                style={styles.icon1}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.btn1Text}>Plats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activebtnWrapper} onPress={()=>this.boissons()}>
                <MaterialCommunityIconsIcon
                name={this.props.activeIcon || "cup"}
                style={styles.activeIcon}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.activeText}>Boissons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrapper2} onPress={()=>this.panier()}>
                <MaterialCommunityIconsIcon
                name={this.props.icon2 || "package-variant-closed"}
                style={styles.icon2}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.btn2Text}>Commande</Text>
            </TouchableOpacity>
            
            </View>
            
            </View>



    
    );
}

}

/*
<SafeAreaView style={{flex: 1,paddingTop:'0%', width:'100%', height:'100%'}} >
      <ScrollView  style={styles.container}>


<TouchableOpacity style={[styles.containerButtonCommande, this.props.style]} onPress={()=>this.supprimer(i)}>
              <Text style={styles.caption}>Supprimer</Text>
              </TouchableOpacity>

<View style={styles.container}>

    <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]}>
      <Text style={styles.captionMauve}>Commander</Text>
    </TouchableOpacity>
<MaterialButtonPrimary1
              caption="Commander"
              style={styles.materialButtonPrimary1}
            ></MaterialButtonPrimary1>
            <MaterialButtonViolet
              caption="BUTTON"
              caption="Supprimer"
              style={styles.materialButtonViolet}
            ></MaterialButtonViolet>
            <MaterialButtonHamburger
              style={styles.materialButtonHamburger}
            ></MaterialButtonHamburger>







            source={{ uri: `data:image/jpg;base64,`+this.state.image }}
*/
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex:1
      },
      rect: {
        width: '100%',
        height: '90%',
        backgroundColor: "rgba(159,218,215,1)",
        borderRadius: 0,
       //marginBottom: '2%'

      },

      containerImage: {
        borderWidth: 1,
        borderRadius: 20,
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
        overflow: "hidden",
        width: '100%',
        height:'100%'
      },
      cardItemImagePlace: {
        backgroundColor: "#ccc",
        flex: 1,
        minHeight: '100%',
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: "rgba(159,218,215,1)",
      },
      cardBody: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        left: 0,
        right: 14,
        width:'100%',
        height:'25%'

      },
      cardBodyAnimated: {
        position: "absolute",
        bottom: '40%',
        backgroundColor: "rgba(159,218,215,1)",
        left: 0,
        right: 14,
        width:'100%',
        height:'25%'

      },
      titleStyleAnimated: {
        fontSize: 20,
        color: "#FFF",
        marginLeft: '10%',
        marginTop:'8%'
      },
      cardBodyTop: {
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        left: 0,
        right: 14,
        width:'100%',
        height:'30%'

      },
      bodyContent: {
        padding: 16,
        paddingTop: 24,
        justifyContent: "center"
      },
      titleStyle: {
        fontSize: 30,
        color: "#FFF",
        paddingBottom: 12
      },
      subtitleStyle: {
        fontSize: 17,
        color: "#FFF",
        lineHeight: 16,
        opacity: 0.5
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
        fontSize: 18,
        color: "#FFF",
        opacity: 0.9
      },
      actionButton2: {
        padding: 8,
        height: 36
      },
      actionText2: {
        fontSize: 18,
        color: "#FFF",
        opacity: 0.9
      },
      materialButtonPrimary1Row: {
        height: '70%',
        flexDirection: "row",
        marginTop: '2%',
        marginLeft: '0%',
        marginRight: '0%'
      },
      containerButton: {
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: '50%',
        width: '100%',
        marginLeft:'0%',
        marginTop:'1%'
      },
      caption: {
        color: "#fff",
        fontSize: 19
      },
      containerButtonCommande:{
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: '20%',
        width: '100%',
        marginBottom:'1%',
        marginTop:'1%'
      },
      containerButtonMauve: {
        backgroundColor: "#3F51B5",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: '50%',
        width: '100%',
        marginLeft:'0%'
      },
      captionMauve: {
        color: "#fff",
        fontSize: 19
      },
      containerButtonNote: {
        backgroundColor: "#FDF427",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: '40%',
        width: '50%',
        marginLeft:'0%'
      },
      captionNote: {
        color: "#000",
        fontSize: 19
      },
      containerButtonOverlay: {
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%',
        width: '100%',
        marginLeft:'0%',
        marginTop:'1%'
      },
      containerFooter: {
        backgroundColor: "#4C83B9",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: -2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 3,
        height:'10%'
      },
      btnWrapper1: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 6,
        paddingHorizontal: 12,
        minWidth: 80,
        maxWidth: 168,
        alignItems: "center"
      },
      icon1: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24,
        opacity: 0.8
      },
      btn1Text: {
        color: "#FFFFFF",
        opacity: 0.8
      },
      activebtnWrapper: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 6,
        paddingHorizontal: 12,
        minWidth: 80,
        maxWidth: 168,
        alignItems: "center"
      },
      activeIcon: {
        //backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24,
        opacity: 0.8
      },
      activeText: {
        color: "#FFFFFF",
        fontSize: 14,
        paddingTop: 4
      },
      btnWrapper2: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 6,
        paddingHorizontal: 12,
        minWidth: 80,
        maxWidth: 168,
        alignItems: "center"
      },
      icon2: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24,
        opacity: 0.8
      },
      btn2Text: {
        color: "#FFFFFF",
        opacity: 0.8
      },
      btnWrapper3: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 6,
        paddingHorizontal: 12,
        minWidth: 80,
        maxWidth: 168,
        alignItems: "center"
      },
      icon3: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24,
        opacity: 0.8
      },
      btn3Text: {
        color: "#FFFFFF",
        opacity: 0.8
      },
      containerButtons:{
          flex:1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
          width:'100%',
          height:'100%'
        },
        Overlay:{
            height: '100%',
            width:'100%'
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
        containerTrash: {
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 5,
          justifyContent: 'center'
        },
        iconTrash: {
          color: "#000",
          fontSize: 24
        }
      
  });
  
export default Recherche;