import { StyleSheet, View, TouchableOpacity, Text,TextInput } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import { Overlay,ListItem } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';

class Notation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.route.params==undefined ? 1 : this.props.route.params.id),
            numCommande:(this.props.route.params==undefined ? 1 : this.props.route.params.numCommande),
            idRestaurant:(this.props.route.params==undefined ? 1 : this.props.route.params.idRestaurant),


            nom:'',
            note:4,
            idPlat:0,
            place : 0,
            type:0,
            commentairesNotation:'',
            visible:false,
            list:[{name:'Quick',subtitle:'', idRestaurant:1}],
            listPlat:[[{name:'Pas de plats diponible',subtitle:'',idPlat:0 }]],
            showPlat:1
          };
          this.ratingCompleted =this.ratingCompleted.bind(this); 
          this.commentaires =this.commentaires.bind(this); 
    }
    // idPlat attention
    componentDidMount(){
      fetch('http://192.168.0.8:3001/commande?id='+this.state.id, {
        method: 'GET',
      
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
        let arr = [];        
        let arrTrois = [];
        let compteur=0;
        let bool = true;
        let idVerif=[];
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
            compteur++;
          }
        }
        
        if(bool){
          arr.push(arrTrois);
        }
        
        
          this.setState({listPlat:arr});
          this.setState({nom:this.state.list[0].name});
          this.setState({idRestaurant:json[0].idRestaurant});
          this.setState({list:[{name:'notez le restaurant',subtitle:'', idRestaurant:json[0].idRestaurant}]});
      
      })
    }

// a faire: fetch le nom du resto
    valider(){
      if(this.state.nom==this.state.list[0].name){
        fetch('http://192.168.0.8:3001/ajoutNotation', {
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
              note:this.state.note
          })
        }).then(response => response.json())
        .then((json) => {
          if(json=='done'){
            this.setState({type:1});
            this.toggleOverlay();
          }
        });
      }else{
        fetch('http://192.168.0.8:3001/ajoutNotationPlat', {
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
              idRestaurant:this.state.idRestaurant
          })
        }).then(response => response.json())
        .then((json) => {
          if(json=='done'){
            this.setState({type:1});
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

      this.setState({nom:this.state.listPlat[this.state.place][val].name});
      this.setState({idPlat:this.state.listPlat[this.state.place][val].id});
      this.toggleOverlay();
    }
    changerRestaurant(){
      this.setState({nom:this.state.list[0].name});
      this.toggleOverlay();
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
    
  render() { 
    

    return (
        <View style={styles.container}>


{this.state.type == 0 &&
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

                    }
{this.state.type == 1 &&
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
  }

      <View style={styles.rect}>
        <Text style={styles.nomRestaurant}>{this.state.nom}</Text>
        
        <AirbnbRating
                count={7}
                reviews={["Ne pas recommander", "pas terrible", "Ok",'Bon', "Très bien", "Incroyable", "Dingue"]}
                defaultRating={this.state.note}
                size={20}
                onFinishRating={this.ratingCompleted}
                />
        <View style={[styles.containerInput, this.props.style]}>
        
            <TextInput
                placeholder="Commentaires"
                style={styles.inputStyle}
                multiline={true}
                onChange={this.commentaires}
            >{this.state.commentairesNotation}</TextInput>
            
        </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.valider()}>
        <Text style={styles.caption}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.toggleOverlay()}>
        <Text style={styles.caption}>Noter un plat</Text>
        </TouchableOpacity>
      </View>

     
      

      
      
    </View>
    );
}

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(159,201,233,1)"
      },
      rect: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(159,201,233,1)"
      },
      nomRestaurant: {
        backgroundColor : "rgba(70,94,138,1)",
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        width: '100%',
        height: '5%',
        marginTop: '3%',
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
        height:'35%'
      },
      inputStyle: {
        color: "#000",
        paddingRight: 5,
        fontSize: 16,
        alignSelf: "stretch",
        flex: 1,
        lineHeight: 16,
        paddingTop: 16,
        paddingBottom: 8,
        //marginLeft:'2%',
        backgroundColor: "rgba(32,115,210,0.36)",
        borderRadius: 15,
        height:'100%'
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
        width:'100%',
        height:'20%',
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
        fontSize: 20
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
  
export default Notation;