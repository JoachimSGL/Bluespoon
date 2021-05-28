import { StyleSheet, View, TouchableOpacity, Text,TextInput, FlatList } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import { Overlay,ListItem } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
class Notation extends React.Component {
    constructor(props) {
        super(props);
        this.getToken();
        this.state = {
            id: (this.props.route.params==undefined ? 1 : this.props.route.params.id),
            idRestaurant:(this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),
            numTable:(this.props.route.params==undefined ? 1 : this.props.route.params.numTable),
            photo:'https://bluespoon-app.herokuapp.com/image/accueil.jpg',
            nom:'Notez le restaurant',
            note:4,
            idPlat:0,
            place : 0,
            type:0,
            commentairesNotation:'',
            visible:false,
            list:[{name:'Notez le restaurant',subtitle:'', idRestaurant:0}],
            listPlat:[[{name:'Pas de plats diponible',subtitle:'',idPlat:0 }]],
            showPlat:1,
            listFull:[]
          };
          this.ratingCompleted =this.ratingCompleted.bind(this); 
          this.commentaires =this.commentaires.bind(this); 
    }
    async getToken() {
      try {
        
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        
        if(data!=null){
          this.setState({id:data});
          
        }else{
          this.props.navigation.replace('Home')
        }
        } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    componentDidMount(){
      fetch('https://bluespoon-app.herokuapp.com/commande?idTable='+this.state.numTable+'&&idRestaurant='+this.state.idRestaurant, {
        method: 'GET',
      
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let imageResto = '';
        let nomResto = '';

        fetch('https://bluespoon-app.herokuapp.com/restaurant', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((jsons) => {
          for(let i = 0 ; i<jsons.length;i++){
            if(jsons[i].idRestaurant==this.state.idRestaurant){
              imageResto = jsons[i].imageRestaurant;
              nomResto = jsons[i].nomRestaurant;
              break;
            }
          }
          
          }).then(()=>{
        let arr = [];        
        let arrTrois = [];
        let compteur=0;
        let bool = true;
        let idVerif=[];
        let arrComplet=[];
        arrComplet.push({name:nomResto,subtitle:'', idRestaurant:this.state.idRestaurant,photo:imageResto})
        
        for(let i = 0; i<json.length;i++){

          let verif = true;

          for(let j = 0; j<idVerif.length;j++){
            if(idVerif[j]==json[i].idPlat){
              verif=false;
            }
          }

          if(verif){
            if((compteur%2)<1){
              arrTrois.push({name:json[i].nomPlat,subtitle:json[i].commentaires, id:json[i].idPlat});
              idVerif.push(json[i].idPlat);
              bool = true;
              
            }else{
              arrTrois.push({name:json[i].nomPlat,subtitle:json[i].commentaires, id:json[i].idPlat});
              idVerif.push(json[i].idPlat);
              arr.push(arrTrois);
              arrTrois=[];
              bool = false;
            }
            arrComplet.push({name:json[i].nomPlat,subtitle:json[i].commentaires, id:json[i].idPlat,photo:json[i].imagePlat})
            compteur++;
          }
        }
        
        if(bool){
          arr.push(arrTrois);
        }
        
          this.setState({listFull:arrComplet});
          this.setState({listPlat:arr});
          this.setState({nom:this.state.listFull[0].name});
          this.setState({photo:imageResto});
          this.setState({idRestaurant:this.state.idRestaurant});
          this.setState({list:[{name:nomResto,subtitle:'', idRestaurant:this.state.idRestaurant,photo:imageResto}]});
        })
      })
    }

    valider(){
      if(this.state.nom==this.state.listFull[0].name){
        
        fetch('https://bluespoon-app.herokuapp.com/ajoutNotation', {
          method: 'POST',
        
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              idRestaurant:this.state.idRestaurant,
              id:this.state.id,
              commentairesNotation:this.state.commentairesNotation,
              note:this.state.note,
              password:'4A1cDm$12$'
          })
        }).then(response => response.json())
        .then((json) => {
          if(json=='done'){
            this.setState({type:0});
            this.setState({note:4});
            this.setState({nom:this.state.listFull[0].name});
            this.setState({commentairesNotation:''});
            this.toggleOverlay();
          }
        });
      }else{
        
        fetch('https://bluespoon-app.herokuapp.com/ajoutNotationPlat', {
          method: 'POST',
        
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              idPlat:this.state.idPlat,
              id:this.state.id,
              commentairesNotation:this.state.commentairesNotation,
              note:this.state.note,
              idRestaurant:this.state.idRestaurant,
              password:'4A1cDm$12$'
          })
        }).then(response => response.json())
        .then((json) => {
          if(json=='done'){
            this.setState({type:0});
            this.setState({note:4});
            this.setState({nom:this.state.listFull[0].name});
            this.setState({commentairesNotation:''});
            this.toggleOverlay();
          }
        });
      }
    }
    ratingCompleted(rating) {
        this.setState({note:rating});
      }
      toggleOverlay=()=>{
        this.setState({visible : !this.state.visible});
    }
    commentaires(txt){
      this.setState({commentairesNotation:txt.nativeEvent.text});
    }
    changerPlat(val){

      this.setState({nom:this.state.listFull[val].name});
      this.setState({idPlat:this.state.listFull[val].id});
      this.setState({photo:this.state.listFull[val].photo});
      //this.toggleOverlay();
    }
    changerRestaurant(){
      this.setState({nom:this.state.list[0].name});
      //this.toggleOverlay();
    }
    changePlace=(bool)=>{
      if(bool){
          if(this.state.listPlat.length-1>this.state.place){
            this.setState({place : this.state.place+1});
          }
        }else{
          if(this.state.place>0){
            this.setState({place : this.state.place-1})
          }
        }

    }
    toggleAndClear(){
      this.toggleOverlay();
      this.setState({type:0});
      this.setState({commentairesNotation:''});
      this.setState({nom:this.state.list[0].name});
    }
    changeStyle(){
      return{
        backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
        
       
        width: 200,
        borderRadius:20,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop:'5%',
        marginRight:5,
        marginLeft:5,
        marginBottom:0,
        height:'80%',
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-end'
      }
    }
    
  render() { 
    

    return (
      <ImageBackground style={styles.container} source={{uri:this.state.photo}} > 
        <View style={styles.container}>


{/*this.state.type == 0 &&
<Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>  Noter le restaurant:                                                      </Text>
               
                {
                    this.state.list.map((l, i) => (
                      
                    <ListItem key={i} bottomDivider  onPress={() => this.changerRestaurant()}>
                        <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    
                    ))
                }
                <Text>  Noter les plats commandés:                                             </Text>
                {
                    this.state.listPlat[this.state.place].map((l, i) => (
                      
                    <ListItem key={i} bottomDivider  onPress={() => this.changerPlat(i)}>
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

                    */}

  <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>  Votre note a bien étée enregistrée:               </Text>
               
                
                <View>
                <TouchableOpacity style={[styles.containerButtonOverlay, this.props.style]} onPress={()=>this.toggleAndClear()}>
                <Text style={styles.caption}>Notation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.containerButtonOverlay, this.props.style]} onPress={()=>this.props.navigation.replace('Home') }>
                <Text style={styles.caption}>Home</Text>
                </TouchableOpacity>
                </View>
            </Overlay>
  

      
        <Text style={styles.nomRestaurant}>{this.state.nom}</Text>
        <View style={[styles.containerRating, this.props.style]}>
        <AirbnbRating
                count={5}
                reviews={["Ne pas recommander", "pas terrible", "Ok",'Bon', "Très bien"]}
                defaultRating={this.state.note}
                size={20}
                onFinishRating={this.ratingCompleted}
                />
                </View>
        <View style={[styles.containerInput, this.props.style]}>
        
            <TextInput
                placeholder="Commentaires"
                placeholderTextColor="#fff" 
                style={styles.inputStyle}
                multiline={true}
                onChange={this.commentaires}
            >{this.state.commentairesNotation}</TextInput>
            
        </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.valider()}>
        <Text style={styles.caption}>Valider</Text>
        <MaterialCommunityIconsIcon
                        name="check-circle-outline"
                        style={styles.leftIcon}
                      ></MaterialCommunityIconsIcon>
        </TouchableOpacity>


        <FlatList 
          horizontal
          pagingEnabled
          bounces={true}
          data={this.state.listFull}
          renderItem={({item,index})=>{return(
            <ImageBackground style={this.changeStyle()} source={{uri:item.photo}} key={index} id={index}> 
            <TouchableOpacity style={{height:'100%',flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'center'}}  onPress={()=>{this.changerPlat(index)}}>
              
                    <Text style={styles.PlatImageFont} >{item.name}</Text>
                    
                  </TouchableOpacity>
                  </ImageBackground>
          )}}
          keyExtractor={item => item.id}
          style={{flexGrow:0,height:'100%'}}
          contentContainerStyle={{height:'100%'}}
          showsHorizontalScrollIndicator={false}
        ></FlatList>

{/*
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>{this.toggleOverlay()}}>
        <Text style={styles.caption}>Noter un plat</Text>
        </TouchableOpacity>

*/}

        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.props.navigation.replace('Home')}>
        
        <MaterialCommunityIconsIcon
                        name="home"
                        style={styles.leftIcon}
                      ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      
      
     
      

      
      
    </View>
    </ImageBackground>
    );
}

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.1)",
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
      },
      rect: {
        width: '100%',
        height: '100%',
        //backgroundColor: "rgba(159,201,233,1)"
      },
      nomRestaurant: {
        backgroundColor : "rgba(70,94,138,0.5)",
        color: "#fff",
        fontSize: 30,
        textAlign: "center",
        width: '100%',
        height: '5%',
        marginTop: '8%',
        marginBottom: '0%',
      },
      rect2: {
        width: '100%',
        height: '90%',
        backgroundColor: "rgba(70,94,138,1)",
        marginTop:'4%'
      },
      containerInput: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        backgroundColor: "transparent",
        //flexDirection: "row",
        //alignItems: "center",
        height:'20%',
        width:'100%'
      },
      inputStyle: {
        color: "#fff",
        paddingRight: 5,
        fontSize: 16,
        alignSelf: "stretch",
        flex: 1,
        lineHeight: 16,
        paddingTop: 16,
        paddingBottom: 8,
        //marginLeft:'2%',
        backgroundColor: "rgba(32,115,210,0.8)",
        borderRadius: 15,
        height:'50%'
      },
      containerButton: {
        backgroundColor: "rgba(70,94,138,1)",
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
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        width:'50%',
        height:'8%',
        marginTop:'2%'
      },
      containerButtonOverlay: {
        backgroundColor: "rgba(70,94,138,1)",
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
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        width:'100%',
        height:'30%',
        marginTop:'2%'
      },
      caption: {
        color: "#fff",
        fontSize: 20,
        marginRight:'5%'
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
      PlatImageFont:{
        fontSize:25,
        color:'#fff',

      },
      containerRating:{
        height:'15%',
        marginTop:'5%',
        width:'50%',
        borderRadius:20,
        backgroundColor:"rgba(70,94,138,0.5)",
        /*flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'*/
      },
      leftIcon: {
        fontSize: 30,
        color: "#fff",
      },
  });
  
export default Notation;