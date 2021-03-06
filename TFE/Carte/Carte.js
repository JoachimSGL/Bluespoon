import { StyleSheet, View, TouchableOpacity, Text, Image,ScrollView,SafeAreaView, StatusBar,TextInput,FlatList ,ImageBackground } from "react-native";
import React from 'react';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay,ListItem, Avatar } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import MapView ,{PROVIDER_GOOGLE,Marker}from 'react-native-maps';

class Carte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            list:[{name:'Loading'}],
            listShow:[{name:'Loading'}],
            listAdresse:[{adresse:'default'}],
            visible:false,
            search:'',
            method:true,
            listePlat:[{name:'Quick'}],
            listePlatCorrespondant:[],
            listePlatCorrespondantShow:[],
            noteRestaurant:[],
            location:false,
            lat:0,
            long:0,
            specialite:'',
            idRestaurant:0,
            nomRestaurant:'',
            type:[{id:1,nom:'Tous les restos'},{id:2,nom:'Jap'},{id:3,nom:'Chinois'},{id:4,nom:'Fast Food'},{id:5,nom:'Gastronomique'},{id:6,nom:'Italien'},{id:7,nom:'Grec'},{id:8,nom:'Haut de gamme'},{id:9,nom:'fruit de mer'}],
            markersShow:[{latlng:{ latitude :  38 , longitude :  -123 },title:'Quick',description:'Nous c est le gout'},{latlng:{ latitude :  36 , longitude :  -121 },title:'MC DO',description:'Nous c est PAS le gout'}],
            markers:[],
            regionLat:0,
            regionLong:0,
            error:false,
          };
          this.changeSearch= this.changeSearch.bind(this);
    }


    goToLocation(id){
      let arr = this.state.markers;
      for(let i = 0 ; i <arr.length;i++){
        if(arr[i].id==id){
          this.setState({idRestaurant:arr[i].id});
          this.setState({nomRestaurant:arr[i].nomRestaurant});
          this.setState({regionLat:arr[i].latlng.latitude});
          this.setState({regionLong:arr[i].latlng.longitude});
          this.setState({markersShow:[arr[i]]});
        }
      }
      this.permissionHandle();
    }

    voirCarte(id,nom,ob){
      this.setState({idRestaurant:id});
      this.setState({nomRestaurant:nom});
      this.setState({regionLat:ob.latitude});
      this.setState({regionLong:ob.longitude});
    }

    rechercheSpec(val){
      if(val == 'Tous les restos'){
        this.setState({markersShow:this.state.markers});
        this.setState({idRestaurant:0});
        this.setState({nomRestaurant:''});
        this.setState({regionLat:this.state.lat});
        this.setState({regionLong:this.state.long});
      }else{
        this.setState({specialite:val});
        let arr = this.state.markers;
        let mark=[];
        for(let i = 0 ; i <arr.length;i++){
          if(arr[i].specialite==val){
            mark.push(arr[i]);
          }
        }
        this.setState({markersShow:mark});
        this.setState({idRestaurant:0});
        this.setState({nomRestaurant:''});
        this.setState({regionLat:this.state.lat});
        this.setState({regionLong:this.state.long});
      }
    }
changeStyle(){
  return{
    backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 2,
    minWidth: 88,
    borderRadius:20,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop:5,
    marginRight:5,
    marginLeft:5,
    marginBottom:5,
    height:'95%'
  }
}


    
    changeSearch(txt){
      this.setState({search:txt.nativeEvent.text});
      if(this.state.method){
        let arr = [];
        console.log(txt.nativeEvent.text.toLowerCase());
        for(let i = 0 ; i<this.state.list.length;i++){
          console.log(this.state.list[i].name.toLowerCase());
          if(this.state.list[i].name.toLowerCase().includes(txt.nativeEvent.text.toLowerCase()) || this.state.list[i].adresse.toLowerCase().includes(txt.nativeEvent.text.toLowerCase())){
            arr.push(this.state.list[i]);

          }
        }
        this.setState({listShow:arr});
      }else{
        let arr = [];
        let alreadyIn=[];
        let plats=[];
        for(let i = 0 ; i<this.state.listePlat.length;i++){
          if(this.state.listePlat[i].nomPlat.toLowerCase().includes(txt.nativeEvent.text.toLowerCase())){
            if(!alreadyIn.includes(this.state.listePlat[i].id)){
              alreadyIn.push(this.state.listePlat[i].id);
              arr.push(this.state.listePlat[i]);
              plats.push({id:this.state.listePlat[i].id,nomPlat:this.state.listePlat[i].nomPlat,commentaires:this.state.listePlat[i].commentaires})
            }else{
              plats.push({id:this.state.listePlat[i].id,nomPlat:this.state.listePlat[i].nomPlat,commentaires:this.state.listePlat[i].commentaires})
            }
          }
        }
        
        this.setState({listePlatCorrespondant:plats});
        this.setState({listShow:arr});
      }
    }
    clearSearch(){
      this.setState({listShow:this.state.list});
      this.setState({search:''});
    }
    cancelSearch(){
      this.setState({listShow:this.state.list});
      this.setState({search:''});
    }
    toggleOverlay=()=>{
      this.setState({visible : !this.state.visible});
  }
    componentDidMount(){
      let id=[];
      fetch('https://bluespoon-app.herokuapp.com/restaurant', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let arr=[];
        let arrPlat=[];
        let location = [];
        for(let i = 0 ; i<json.length;i++){
          if(!id.includes(json[i].id)){
            id.push(json[i].id);
            arrPlat.push({id:json[i].id,nomPlat:json[i].nomPlat,name:json[i].nomRestaurant,commentaires:json[i].commentaires, imageRestaurant: json[i].imageRestaurant});
            arr.push({name:json[i].nomRestaurant,id : json[i].id,adresse:json[i].adresse, localisation:json[i].adresse, imageRestaurant: json[i].imageRestaurant});// changer ici qd j aurai mis la localisation
            location.push({title:json[i].nomRestaurant,description:json[i].adresse,id:json[i].id,specialite:json[i].specialite,latlng:{longitude:json[i].longitude,latitude:json[i].latitude}})
          }else{
            arrPlat.push({id:json[i].id,nomPlat:json[i].nomPlat,name:json[i].nomRestaurant,commentaires:json[i].commentaires, imageRestaurant: json[i].imageRestaurant});
          }
        }

        fetch('https://bluespoon-app.herokuapp.com/notationRestaurant', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let noteRestaurant=[];
        for(let j = 0 ;j<id.length;j++){
          let note = 0;
          let compteur=0;
          for(let i = 0 ; i<json.length;i++){
            if(id[j]==json[i].idRestaurant){
              note=note+json[i].note;
              compteur++;
            }
          }
          note=Number.parseFloat(note/compteur).toFixed(2);
          noteRestaurant.push({idRestaurant:id[j],note:note});
          note=0;
          compteur=0;
      }
      this.setState({noteRestaurant:noteRestaurant});
      this.setState({list:arr});
      this.setState({listShow:arr});
      this.setState({listePlat:arrPlat});
      this.setState({markers:location});
      this.setState({markersShow:location});
      this.sortRestaurant();
      })
        
        
      })
      
      /*
      setInterval(() => {
        Geolocation.getCurrentPosition(
          (position) => {
          console.log(position);
          this.setState({long: position.coords.longitude}); 
          this.setState({lat: position.coords.latitude});
          
         },
         (error) => {
          console.log('error :'+error);
         },
         {enableHighAccuracy: true, timeout: 20000})
      }, 20000);
*/
    }
    sortRestaurant(){
      let arr = this.state.list;
      let idSorted=[];
      let arrSorted=[];
      for(let i =0;i<arr.length;i++){
        let note=this.findNoteChiffre(arr[i].id);
        if(note==-1){
          idSorted.push({id:arr[i].id,note:note})
        }else{
          
          let len = idSorted.length;
          let position = -1;
          for(let j = 0 ; j <len;j++){
            
            if(note<=idSorted[j].note && j==idSorted.length-1 ){
              //idSorted.push({id:arr[i].id,note:note})
              position=len;
            }else if(note>=idSorted[j].note && j==0){
              //idSorted.splice(0, 0, {id:arr[i].id,note:note});
              position=0;
            }else if(note<=idSorted[j].note && note>=idSorted[j+1].note ){
              //idSorted.splice(j, 0, {id:arr[i].id,note:note});
              position=j+1
            }


            
          }
          if(position!==-1){
            idSorted.splice(position, 0, {id:arr[i].id,note:note});
          }


          if(idSorted.length==0){
            idSorted.push({id:arr[i].id,note:note});
          }
        }
      }
      for(let i =0;i<idSorted.length;i++){
        for(let j = 0 ; j <arr.length;j++){
          if(arr[j].id==idSorted[i].id){
            arrSorted.push(arr[j])
          }
        }
      }
      this.setState({list:arrSorted});
      this.setState({listShow:arrSorted});
    }
    changeFontLeft(){
      if(!this.state.location){
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
    }else{
      return{
        fontSize: 13,
        color:  "#007AFF"
      }
    }
    }
    changeStyleLeft(){
      if(!this.state.location){
        if(this.state.method){
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
    changeFontRight(){
      if(!this.state.location){
        if(!this.state.method){
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
      }else{
        return{
          fontSize: 13,
          color:  "#007AFF"
        }
      }
    }
    changeFontLocation(){
      if(!this.state.location){
        if(!this.state.method){
          return{
            fontSize: 13,
            color: "#007AFF"
          }
        }else{
          return{
            fontSize: 13,
            color: "#007AFF"
          }
        }
      }else{
        return{
          fontSize: 13,
          color:  "#ffffff"
        }
      }
    }
    changeStyleRight(){
      if(!this.state.location){
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
    changeStyleLocation(){
      if(!this.state.location){
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
              backgroundColor: "#FFFFFF",
              padding: 6,
              borderWidth: 1,
              borderColor: "#007AFF",
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5
            }
          
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
  this.setState({location:false});
  this.setState({method:bool});
  this.setState({listShow:this.state.list});
  this.setState({listePlatCorrespondant:[]});
  this.setState({search:''});
  this.setState({error:false});
  
}


permissionHandle = async () => {
  this.setState({location:true});
  Geolocation.getCurrentPosition(
    (position) => {
    console.log(position);
    this.setState({long: position.coords.longitude});
    this.setState({lat: position.coords.latitude});
    this.setState({regionLat:position.coords.latitude});
    this.setState({regionLong:position.coords.longitude});
    //commanter si jamais
    this.setState({error:false});
   },
   (error) => {
    console.log('error :'+error);
    this.setState({error:true});
   },
   {enableHighAccuracy: true, timeout: 2000})
/*
   Geocoder.init("AIzaSyA3YVpK0yL9NyQMUB6iYFbsBmvEwGngn_Q");
   Geocoder.from(this.state.lat, this.state.long)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			      console.log(addressComponent);
		})
		.catch(error => console.warn(error));
*/

}



affichePlats(val){
  let id = this.state.listShow[val].id;
  let arr=[];
  for(let i = 0 ; i <this.state.listePlatCorrespondant.length;i++){
    if(id==this.state.listePlatCorrespondant[i].id){
      arr.push(this.state.listePlatCorrespondant[i]);
    }
  }
  this.setState({listePlatCorrespondantShow:arr});
  this.toggleOverlay();
}
findNote(id){
  let arr=  this.state.noteRestaurant;
  for(let i = 0 ; i <arr.length;i++){
    if(id==arr[i].idRestaurant){
      if(!isNaN(arr[i].note)){
        return ' not?? : '+arr[i].note+' /5'
      }else{
        return ' '
      }
    }
  }
  return  ' '
}
findNoteChiffre(id){
  let arr=  this.state.noteRestaurant;
  for(let i = 0 ; i <arr.length;i++){
    if(id==arr[i].idRestaurant){
      if(!isNaN(arr[i].note)){
        return arr[i].note
      }else{
        return -1
      }
    }
  }
  return  -1
}
mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
  render() {
    

    return (
      
      <View style={styles.container}>


{this.state.method &&
<Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
  
                <Text>Adresse:                                                               </Text>
               
                {
                    this.state.listAdresse.map((l, i) => (
                      
                    <ListItem key={i} bottomDivider onPress={() => this.toggleOverlay()} >
                        <ListItem.Content>
                        <ListItem.Title>{l.adresse}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    
                    ))
                }

            </Overlay>

              }
{!this.state.method &&
  <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
  
  <Text>Plats correspondants:                                                               </Text>
 
  {
      this.state.listePlatCorrespondantShow.map((l, i) => (
        
      <ListItem key={i} bottomDivider onPress={() => this.toggleOverlay()} >
          <ListItem.Content>
          <ListItem.Title>{l.nomPlat}</ListItem.Title>
          <ListItem.Subtitle>{l.commentaires}</ListItem.Subtitle>
          </ListItem.Content>
      </ListItem>
      
      ))
  }

</Overlay>
  }







        <SafeAreaView style={{width:'100%', height:'100%'}} >
        {!this.state.location &&
<View style={[styles.containerSearch, this.props.style]}>
      <View style={styles.inputBox}>
        <MaterialCommunityIconsIcon
          name="magnify"
          style={styles.inputLeftIcon}
        ></MaterialCommunityIconsIcon>
        <TextInput placeholder="Search" style={styles.inputStyle} onChange={this.changeSearch}>{this.state.search}</TextInput>
        <MaterialCommunityIconsIcon
          name="close-circle"
          style={styles.inputRightIcon}
          onPress={()=>this.clearSearch()}
        ></MaterialCommunityIconsIcon>
      </View>
    </View>

        }
    
    <View style={[styles.containerPicker, this.props.style]}>
      <View style={styles.textWrapper}>
        <TouchableOpacity style={this.changeStyleLeft()} onPress={()=>{this.changeMethod(true)}}>
          <Text style={this.changeFontLeft()} >Par restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.changeStyleRight()} onPress={()=>{this.changeMethod(false)}}>
          <Text style={this.changeFontRight()}>Par plat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.changeStyleLocation()} onPress={this.permissionHandle}>
          <Text style={this.changeFontLocation()}>Localisation</Text>
        </TouchableOpacity>
      </View>
    </View>
{!this.state.location &&
    <ScrollView  style={{ width:'100%', height:'100%'}}>
{ this.state.listShow.map((l, i) =>    (
      <View style={styles.rect} key={i}>
        <ImageBackground style={[styles.containerImage, this.props.style]} source={{uri: l.imageRestaurant}}>
        <View style={styles.quickRow}>
        
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
          <Text style={styles.quick}>{l.name}</Text>
          <Text style={styles.quickPetit}>{this.findNote(l.id)}</Text>
          </View>
          {this.state.method &&
        <View style={{flex:1,flexDirection:'row'}}>
                
                <TouchableOpacity style={[styles.containerButtonVoirSurCarte, this.props.style]} onPress={()=>{this.goToLocation(l.id)}}>
                
                {//<Image source={{uri: 'https://bluespoon-app.herokuapp.com/image/resto.png'}} style={{ width: 40, height: 50 }}  />
  }
                <MaterialCommunityIconsIcon
                  name="google-maps"
                  style={styles.iconPlat}
                ></MaterialCommunityIconsIcon>
              </TouchableOpacity>
              </View>
          }
          {!this.state.method &&
          <View style={{flex:1,flexDirection:'row',alignItems: "center",width:'100%',height:'100%'}}>
                <TouchableOpacity style={[styles.containerButtonVoirSurCarte, this.props.style]} onPress={()=>{this.affichePlats(i)}}>
                {//<Text style={styles.voirLaCarte}>Plats</Text>
                     }
                <MaterialCommunityIconsIcon
                  name="food-fork-drink"
                  style={styles.iconPlat}
                ></MaterialCommunityIconsIcon>
              </TouchableOpacity>
            </View>
              
          }

          <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>{this.props.navigation.navigate('CarteRestaurant',{idRestaurant:l.id})}}>
            <Text style={styles.voirLaCarte}>Voir le menu</Text>
            <MaterialCommunityIconsIcon
            name="chevron-right"
            style={styles.voirLaCarte}
          ></MaterialCommunityIconsIcon>
          </TouchableOpacity>
        </View>
        
        </ImageBackground>
      </View>
    ))
  }


  
  </ScrollView>
  }
{/*this.state.error &&
  
  <View style={{backgroundColor:"#142B7F",height:'92%'}}>
    <Text style={styles.specialite} >Veuillez activer la localisation</Text>
    </View>
    */
}
{this.state.location &&
<View style={{backgroundColor:"#142B7F",height:'92%'}}>
    <MapView
    style={{height:'80%',width:'100%'}}
    provider={PROVIDER_GOOGLE}
    region={{
      latitude: this.state.regionLat,
      longitude: this.state.regionLong,
      latitudeDelta: this.state.error? 2: 0.9,
      longitudeDelta: this.state.error? 2: 0.9,
    }}
    customMapStyle={this.mapStyle}>
      {!this.state.error &&
    <Marker
    coordinate={{ latitude :  this.state.lat , longitude :  this.state.long }}
    title='You are here'
        description='vous vous situez ici'
  />
      }
    
{this.state.markersShow.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
      onPress={()=>{this.voirCarte(marker.id,marker.title,marker.latlng)}}
      //image={{uri: 'https://bluespoon-app.herokuapp.com/image/resto2.png'}}
      //style={{width: 10, height: 10}}
    >
    <Image source={{uri: 'https://bluespoon-app.herokuapp.com/image/resto.png'}} style={{ width: 40, height: 50 }} />
    </Marker>
  ))}

  </MapView>
      <View style={styles.textWrapper}>
<FlatList 
horizontal
pagingEnabled
bounces={true}
data={this.state.type}
renderItem={({item,index})=>{return(
  <TouchableOpacity style={this.changeStyle()} key={index} id={index} onPress={()=>{this.rechercheSpec(item.nom)}}>
          <Text style={styles.voirLaCarte} >{item.nom}</Text>
        </TouchableOpacity>
)}}
keyExtractor={item => item.id}
style={{flexGrow:0,height:'100%'}}
contentContainerStyle={{height:'100%'}}
showsHorizontalScrollIndicator={false}
></FlatList>
        
      </View>
      <View style={{flex:1,flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
        {this.state.nomRestaurant !== ''&&
      <TouchableOpacity style={styles.containerButtonCarte} onPress={()=>{this.props.navigation.navigate('CarteRestaurant',{idRestaurant:this.state.idRestaurant});}}>
      <Text style={styles.specialite} > Voir la carte : {this.state.nomRestaurant} </Text>
      {this.state.error &&
          <Image source={{uri: 'https://bluespoon-app.herokuapp.com/image/loading2.gif'}} style={{ width: '15%', height: '100%' }} />
        }
      </TouchableOpacity>
  }
      
        </View>
   </View>
  
  }
  </SafeAreaView>


    </View>



    
    );
}

}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor:'#356DBD'
  },
  rect: {
    width: '100%',
    height: 200,
    backgroundColor: "#D9EBF1",
    borderRadius: 5,
    marginTop: '2%',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  quick: {
    color: "#fff",
    fontSize: 23,
    marginTop: '1%'
  },
  quickPetit: {
    color: "#fff",
    fontSize: 15,
    marginTop: '1%'
  },
  quickRow: {
    height: '50%',
    flexDirection: "row",
    marginTop: '2%',
    marginLeft: '0%',
    marginRight: '0%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'space-between',
    alignItems:'center'

  },
  loremIpsum: {
    color: "#121212",
    marginTop: 30,
    marginLeft: 48
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFF4",
    padding: 8,
    paddingRight: 0,
    height:'10%'
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#CECED2",
    borderRadius: 5
  },
  inputLeftIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  inputStyle: {
    height: 44,
    alignSelf: "flex-start",
    fontSize: 17,
    lineHeight: 15,
    color: "#000",
    flex: 1
  },
  inputRightIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  rightIconButton: {
    alignItems: "center",
    padding: 8
  },
  rightButtonText: {
    color: "#007AFF",
    fontSize: 15
  },
  containerButton: {
    //backgroundColor: "#D9EBF1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    paddingLeft: '3%',
    paddingRight: '3%',
    marginLeft:'0%',
    height:'90%',
    

  },
  containerButtonVoirSurCarte: {
    //backgroundColor: "#D9EBF1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 210,
    marginLeft:'30%',
    marginTop:'0%',
    height:'100%',
    color:'#fff',
  },
  containerButtonCarte:{
    backgroundColor:'#5C86D5',
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
    height:'100%',
    width:'100%'
  },
  containerButtonPlat: {
    backgroundColor: "#405495",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    height:'50%',
    width:'50%',
    marginTop:'2%',
    borderRadius:20,
    marginLeft:'5%'
  },
  voirLaCarte: {
    color: "#fff",
    fontSize: 20
  },
  specialite: {
    color: "#fff",
    fontSize: 25
  },
  containerPicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    backgroundColor: '#84AFEA',
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
  segmentTextWrapperLeft: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  titleLeft: {
    fontSize: 13,
    color: "#ffffff"
  },
  segmentTextWrapperRight: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  titleRight: {
    fontSize: 13,
    color: "#007AFF"
  },
  iconPlat:{
       
    color: "#fff",
    fontSize: 50,
    marginRight:'0%',
    marginTop:'0%'
  
},
containerImage:{
  height:'100%',
  width:'100%',
  borderRadius:200,
  opacity:1,
  resizeMode: "cover",
  flex:1,
  flexDirection:'column',
  justifyContent:'flex-end'
}
      
  });
  
export default Carte;