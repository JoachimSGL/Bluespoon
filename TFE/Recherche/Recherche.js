import { StyleSheet, View, TouchableOpacity, Text, Image,ScrollView,SafeAreaView, Animated ,Easing,TextInput,Dimensions } from "react-native";
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
            imagePlat:'loading.gif',
            prix:'0',
            num:0,
            place:0,
            placeBoissons:0,
            panier:0,
            idPlat:0,
            listBoissons : [[{name:'Pas de boissons disponible',subtitle:'default',prix:0,idPlat:0 }]],
            list : [[{name:'Pas de plats disponible',subtitle:'default',prix:0,idPlat:0 }]],
            listCommande:[],
            listFlat : [[{name:'Pas de plats disponible',subtitle:'default',prix:0,idPlat:0 }]],
            listBoissonFlat: [[{name:'Pas de boissons disponible',subtitle:'default',prix:0,idPlat:0 }]],
            loading:true,
            scrollX:new Animated.Value(0),
            viewabilityConfig : {
              itemVisiblePercentThreshold: 50
            },
            listNote:[[{name:'Eric Cartman',subtitle:'default',note:0,idNotation:0 }]],
            notes:false,
            visibleNote:false,
            placeNote:0,





            fadeAnim: new Animated.Value(0),
          

          };
          this._updateIndex = this._updateIndex.bind(this);
    }
    onPress(){
      
    }
    _updateIndex({ viewableItems }) {
        let currentIndex = viewableItems[0].index;
        this.setState({idPlat:currentIndex+1});

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
        duration: 400,
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
                fetch('https://bluespoon-app.herokuapp.com/table', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'true'
                  },
                  body: JSON.stringify({
                      numero: this.state.numTable,
                      id :this.state.id,
                      password:'4A1cDm$12$'
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
        
        fetch('https://bluespoon-app.herokuapp.com/plats?idRestaurant='+this.state.idRestaurant, {
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
        let compteurId=1;
        let arrFlat=[{name:false,subtitle:'',prix:0,idPlat:0,imagePlat:'null.jpg'}];
        
        for(let i = 0 ; i < json.length; i++){
          if(compteur<4){
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
            compteur++;
            bool = true;
          }else{
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
            arr.push(arrCinq);
            arrCinq = [];
            compteur=0;
            bool = false;
          }
          arrFlat.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
          compteurId=compteurId+1;
        }
        if(bool){
          for(let i = compteur;i<5;i++){
            arrCinq.push({});
          }
          arr.push(arrCinq);
        }
        if(json.length!==0){
        this.setState({list : arr});
        this.setState({listFlat : arrFlat});
        this.setState({panier : 0});
        this.setState({nom : arr[0][0].name});
        this.setState({prix : arr[0][0].prix});
        this.setState({commentaires : arr[0][0].subtitle});
        this.setState({idPlat : arr[0][0].idPlat});
        this.setState({imagePlat : arr[0][0].imagePlat});
        this.setState({loading:false})
        }
      });



      fetch('https://bluespoon-app.herokuapp.com/boissons?idRestaurant='+this.state.idRestaurant, {
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
        let compteurId=1;
        let arrFlat=[{name:false,subtitle:'',prix:0,idPlat:0,imagePlat:'null.jpg'}];
        for(let i = 0 ; i < json.length; i++){
          if(compteur<4){
          arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
            compteur++;
            bool = true;
          }else{
            arrCinq.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
            arr.push(arrCinq);
            arrCinq=[];
            compteur=0;
            bool = false;
            
          }
          compteur++;
          arrFlat.push({name :json[i].nomPlat,subtitle : json[i].commentaires,prix : json[i].prix, idPlat : json[i].idPlat,imagePlat:json[i].imagePlat,id:compteurId});
            compteurId=compteurId+1;
        }
        if(bool){
          for(let i = compteur;i<5;i++){
            arrCinq.push({});
          }
          arr.push(arrCinq);
        }
        if(json.length!==0){
          this.setState({listBoissons : arr});
          this.setState({listBoissonFlat : arrFlat});
          this.setState({loading:false})
        }
      });
      /*
      fetch('https://bluespoon-app.herokuapp.com/image?idPlat=8', {
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
          let idPlat=-1
          if(this.state.panier==0){
            idPlat=this.state.listFlat[this.state.idPlat].idPlat
          }else if(this.state.panier==2){
            idPlat=this.state.listBoissonFlat[this.state.idPlat].idPlat
          }
          for(let i = 0 ; i<arr.length;i++){
            if(arr[i][3]==idPlat){
              arr[i][4]=arr[i][4]+1;
              bool=false;
            }
          }
          if(bool){
            if(this.state.panier==0){
            arr.push([this.state.listFlat[this.state.idPlat].name,this.state.listFlat[this.state.idPlat].subtitle,this.state.listFlat[this.state.idPlat].prix,idPlat,1,false,'']);
            }else if(this.state.panier==2){
              arr.push([this.state.listBoissonFlat[this.state.idPlat].name,this.state.listBoissonFlat[this.state.idPlat].subtitle,this.state.listBoissonFlat[this.state.idPlat].prix,idPlat,1,false,'']);

            }
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
            this.flatListRef.scrollToIndex({animated: true, index: this.state.list[this.state.place][val].id});

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
            this.flatListRef.scrollToIndex({animated: true, index: this.state.listBoissons[this.state.placeBoissons][val].id});

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
            fetch('https://bluespoon-app.herokuapp.com/ajoutCommande', {
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
                  contact:this.state.contact,
                  password:'4A1cDm$12$'
              })
            }).then(response => response.json())
            .then((json) => {
              numCommande=json;
              this.props.navigation.replace('Splitter',{numCommande:numCommande,idRestaurant : this.state.idRestaurant,numTable:this.state.numTable});
            });

          



          }
          
        }
        addCom(key){
          let com = this.state.listCommande;
          com[key][5]=!com[key][5];
          this.setState({listCommande:com})
        }
        addCommentaires(key,txt){
          let com = this.state.listCommande;
          com[key][6]=txt.nativeEvent.text;
          this.setState({listCommande:com})
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
        note(idPlat){
          fetch('https://bluespoon-app.herokuapp.com/notation?idRestaurant='+this.state.idRestaurant, {
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
          if(idPlat==json[i].idPlat){
            if(compteur<3){
              arrCinq.push({name :json[i].prenom+' '+json[i].nom.split('_')[0],subtitle : json[i].commentairesNotation,note : json[i].note,idPlat:json[i].idPlat});
              compteur++;
              bool = true;
            }else{
              arrCinq.push({name :json[i].prenom+' '+json[i].nom.split('_')[0],subtitle : json[i].commentairesNotation,note : json[i].note,idPlat:json[i].idPlat});
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
    const { width, height } = Dimensions.get('window');
    const SPACING = 0.01;
    const ITEM_SIZE = width * 0.95;
    const EMPTY_ITEM_SIZE = (width - ITEM_SIZE)/2 ;

    return (
      <View className='container'>
{this.state.panier == 3 &&
            <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>Veuillez s??l??ctionner au moins un article</Text>
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
                              <ListItem.Subtitle>prix : {l[2]} ???</ListItem.Subtitle>
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
                          {/*
                                    <View style={[styles.containerImage, this.props.style]}>
                                        <Image
                                            source={{uri: "https://bluespoon-app.herokuapp.com/image/"+this.state.imagePlat}}
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
                                                    <Text style={styles.titleStyleAnimated}>Ajout?? ?? la commande</Text>
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
                                                        {this.state.prix} ???
                                                        </Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note()}>
                                                    <Text style={styles.captionNote}>Notes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                    </View>
                                                  */}



                                    {this.state.loading &&
                                    <Image
                                    source={{uri: "https://bluespoon-app.herokuapp.com/image/loading2.gif"}}
                                    style={styles.imageLoading}
                                ></Image>
                                  }

                                    <Animated.FlatList
                                          showsHorizontalScrollIndicator={false}
                                          data={this.state.listFlat}
                                          keyExtractor={(item) => item.id}
                                          horizontal
                                          bounces={false}
                                          decelerationRate={0.98}
                                          renderToHardwareTextureAndroid
                                          contentContainerStyle={{ alignItems: 'center' }}
                                          snapToInterval={width*0.95}
                                          snapToAlignment='start'
                                          onViewableItemsChanged={this._updateIndex}
                                          viewabilityConfig={this.viewabilityConfig}
                                          onScroll={Animated.event(
                                            [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
                                            { useNativeDriver: false }
                                          )}


                                          ref={(ref) => { this.flatListRef = ref; }}
                                          scrollEventThrottle={16}
                                          renderItem={({ item, index }) => {
                                            
                                            if (!item.name) {
                                              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                                            }
                                            const inputRange = [
                                              (index - 2) * ITEM_SIZE,
                                              (index - 1) * ITEM_SIZE,
                                              index * ITEM_SIZE,
                                            ];

                                            const translateY = this.state.scrollX.interpolate({
                                              inputRange,
                                              outputRange: [100, 50, 100],
                                              extrapolate: 'clamp',
                                            });

                                            return (
                                              <View style={{ width: ITEM_SIZE,height:'100%' }} key={index}>
                                                
                                                  <Animated.View  style={[styles.containerImage, this.props.style,{
                                                    marginHorizontal: SPACING/40,
                                                    alignItems: 'center',
                                                    transform: [{ translateY }],
                                                    backgroundColor:"rgba(159,218,215,1)",
                                                    borderRadius: 34,
                                                    marginBottom:'30%'
                                                  }]} >
                                                        <Image
                                                            source={{uri: item.imagePlat}}
                                                            style={styles.cardItemImagePlace}
                                                        ></Image>
                                                              <View style={styles.cardBodyTop}>
                                                                    <View style={styles.bodyContent}>
                                                                    <Text style={styles.titleStyle}>
                                                                        {item.name}
                                                                    </Text>
                                                                    <Text style={styles.subtitleStyle}>
                                                                        {item.subtitle}
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
                                                                      
                                                                      <Text style={styles.titleStyleAnimated}>Ajout?? ?? la commande</Text>
                                                                      <MaterialCommunityIconsIcon
                                                                        name="check"
                                                                        style={styles.captionIconAnimated}
                                                                      ></MaterialCommunityIconsIcon>
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
                                                                        {item.prix} ???
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note(item.idPlat)}>
                                                                    <Text style={styles.captionNote}>Notes</Text>
                                                                    </TouchableOpacity>
                                                                    </View>
                                                                    
                                                                </View>
                                                    </Animated.View>


                                                  
                                              </View>
                                            );
                                          }}
                                        />

                        </View>
            <View style={{flex:1,width:'100%',height:'100%'}}>
            <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.commander()}>
            <MaterialCommunityIconsIcon
              name="plus-circle-outline"
              style={styles.captionIcon}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.caption}>Ajouter ?? la commande</Text>
            
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]} onPress={this.toggleOverlay}>
            <MaterialCommunityIconsIcon
              name="menu"
              style={styles.captionIcon}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.captionMauve}>Menu Plats</Text>
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
                          {/*
                                    <View style={[styles.containerImage, this.props.style]}>
                                        <Image
                                            source={{uri: "https://bluespoon-app.herokuapp.com/image/"+this.state.imagePlat}}
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
                                                    <Text style={styles.titleStyleAnimated}>Ajout?? ?? la commande</Text>
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
                                                        {this.state.prix} ???
                                                        </Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note()}>
                                                    <Text style={styles.captionNote}>Notes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                  </View>*/}
                                                  
                                                  
                                    {this.state.loading &&
                                    <Image
                                    source={{uri: "https://bluespoon-app.herokuapp.com/image/loading2.gif"}}
                                    style={styles.imageLoading}
                                ></Image>
                                  }

                                    <Animated.FlatList
                                          showsHorizontalScrollIndicator={false}
                                          data={this.state.listBoissonFlat}
                                          keyExtractor={(item) => item.id}
                                          horizontal
                                          bounces={false}
                                          decelerationRate={0.98}
                                          renderToHardwareTextureAndroid
                                          contentContainerStyle={{ alignItems: 'center' }}
                                          snapToInterval={width*0.95}
                                          snapToAlignment='start'
                                          onViewableItemsChanged={this._updateIndex}
                                          viewabilityConfig={this.viewabilityConfig}
                                          onScroll={Animated.event(
                                            [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
                                            { useNativeDriver: false }
                                          )}


                                          ref={(ref) => { this.flatListRef = ref; }}
                                          scrollEventThrottle={16}
                                          renderItem={({ item, index }) => {
                                            
                                            if (!item.name) {
                                              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                                            }
                                            const inputRange = [
                                              (index - 2) * ITEM_SIZE,
                                              (index - 1) * ITEM_SIZE,
                                              index * ITEM_SIZE,
                                            ];

                                            const translateY = this.state.scrollX.interpolate({
                                              inputRange,
                                              outputRange: [100, 50, 100],
                                              extrapolate: 'clamp',
                                            });

                                            return (
                                              <View style={{ width: ITEM_SIZE,height:'100%' }} key={index}>
                                                
                                                  <Animated.View  style={[styles.containerImage, this.props.style,{
                                                    marginHorizontal: SPACING/40,
                                                    alignItems: 'center',
                                                    transform: [{ translateY }],
                                                    backgroundColor:"rgba(159,218,215,1)",
                                                    borderRadius: 34,
                                                    marginBottom:'30%'
                                                  }]} >
                                                        <Image
                                                            source={{uri: item.imagePlat}}
                                                            style={styles.cardItemImagePlace}
                                                        ></Image>
                                                              <View style={styles.cardBodyTop}>
                                                                    <View style={styles.bodyContent}>
                                                                    <Text style={styles.titleStyle}>
                                                                        {item.name}
                                                                    </Text>
                                                                    <Text style={styles.subtitleStyle}>
                                                                        {item.subtitle}
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
                                                                      <Text style={styles.titleStyleAnimated}>Ajout?? ?? la commande</Text>
                                                                      <MaterialCommunityIconsIcon
                                                                        name="check"
                                                                        style={styles.captionIconAnimated}
                                                                      ></MaterialCommunityIconsIcon>
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
                                                                        {item.prix} ???
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity style={[styles.containerButtonNote, this.props.style]} onPress={()=>this.note(item.idPlat)}>
                                                                    <Text style={styles.captionNote}>Notes</Text>
                                                                    </TouchableOpacity>
                                                                    </View>
                                                                    
                                                                </View>
                                                    </Animated.View>


                                                  
                                              </View>
                                            );
                                          }}
                                        />

                        </View>
            <View style={{flex:1,width:'100%',height:'100%'}}>
            <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.commander()}>
            <MaterialCommunityIconsIcon
              name="plus-circle-outline"
              style={styles.captionIcon}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.caption}>Ajouter ?? la commande</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]} onPress={this.toggleOverlay}>
            <MaterialCommunityIconsIcon
              name="menu"
              style={styles.captionIcon}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.captionMauve}>Menu Boissons</Text>
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
                        <ListItem.Title>note : {l.note}/5</ListItem.Title>
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
              <ListItem.Subtitle>prix : {l[2]} ???</ListItem.Subtitle>
              {l[5] &&
              <TextInput
              placeholder="Commentaires"
             //style={styles.inputStyle}
              multiline={false}
              onChange={(txt)=>{this.addCommentaires(i,txt)}}
                >{l[6]}</TextInput>
              }
              </ListItem.Content>
              <TouchableOpacity style={[styles.containerTrash, this.props.style]} onPress={()=>this.addCom(i)}>
                
                <MaterialCommunityIconsIcon
              name="cog-outline"
              style={styles.iconTrash}
            ></MaterialCommunityIconsIcon>
              </TouchableOpacity>
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
        height:'95%'
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
        width:'50%',
        height:'25%',
        marginLeft:'25%',
        borderRadius:30,

      },
      titleStyleAnimated: {
        fontSize: 20,
        color: "#FFF",
        marginLeft: '20%',
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
        height: '100%',
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
        },
        imageLoading: {
          backgroundColor: "rgba(159,218,215,1)",
          flex: 1,
          minHeight: '100%',
          width: '100%',
          resizeMode: 'contain',
          backgroundColor: "rgba(159,218,215,1)",
          marginLeft:'35%'
        },
        captionIcon: {
          color: "#fff",
          fontSize: 30,
          marginRight:'3%'
        },
        captionIconAnimated: {
          color: "#fff",
          fontSize: 30,
          marginRight:'3%',
          marginTop:'15%'
        },
        
      
  });
  
export default Recherche;