import { StyleSheet, View, TouchableOpacity, Text, Image,ScrollView,SafeAreaView, StatusBar,TextInput  } from "react-native";
import React from 'react';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay,ListItem, Avatar } from 'react-native-elements';
class Carte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            list:[{name:'Quick'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'}],
            listShow:[{name:'Quick'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'},{name:'Mc Do'}],
            listAdresse:[{adresse:'default'}],
            visible:false,
            search:'',
            method:true,
            listePlat:[{name:'Quick'}],
            listePlatCorrespondant:[],
            listePlatCorrespondantShow:[],
            noteRestaurant:[],
          };
          this.changeSearch= this.changeSearch.bind(this);
    }
    changeSearch(txt){
      this.setState({search:txt.nativeEvent.text});
      if(this.state.method){
        let arr = [];
        for(let i = 0 ; i<this.state.list.length;i++){
          if(this.state.list[i].name.includes(txt.nativeEvent.text) || this.state.list[i].adresse.includes(txt.nativeEvent.text)){
            arr.push(this.state.list[i]);
          }
        }
        this.setState({listShow:arr});
      }else{
        let arr = [];
        let alreadyIn=[];
        let plats=[];
        for(let i = 0 ; i<this.state.listePlat.length;i++){
          if(this.state.listePlat[i].nomPlat.includes(txt.nativeEvent.text)){
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
      fetch('http://192.168.0.8:3001/restaurant', {
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
        
        for(let i = 0 ; i<json.length;i++){
          if(!id.includes(json[i].id)){
            id.push(json[i].id);
            arrPlat.push({id:json[i].id,nomPlat:json[i].nomPlat,name:json[i].nomRestaurant,commentaires:json[i].commentaires});
            arr.push({name:json[i].nomRestaurant,id : json[i].id,adresse:json[i].adresse, localisation:json[i].adresse});// changer ici qd j aurai mis la localisation

          }else{
            arrPlat.push({id:json[i].id,nomPlat:json[i].nomPlat,name:json[i].nomRestaurant,commentaires:json[i].commentaires});
          }
        }
        this.setState({list:arr});
        this.setState({listShow:arr});
        this.setState({listePlat:arrPlat});
      })

      fetch('http://192.168.0.8:3001/notationRestaurant', {
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
      })



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
    changeStyleLeft(){
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
    }
    changeFontRight(){
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
changeMethod(bool){
  this.setState({method:bool});
  this.setState({listShow:this.state.list});
  this.setState({listePlatCorrespondant:[]});
  this.setState({search:''});
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
  console.log(arr);
  for(let i = 0 ; i <arr.length;i++){
    if(id==arr[i].idRestaurant){
      if(!isNaN(arr[i].note)){
        return ' noté : '+arr[i].note+' /7'
      }else{
        return ' '
      }
    }
  }
  return  ' '
}
        
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
      <TouchableOpacity style={styles.rightIconButton} onPress={()=>this.cancelSearch()}>
        <Text style={styles.rightButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>


    
    <View style={[styles.containerPicker, this.props.style]}>
      <View style={styles.textWrapper}>
        <TouchableOpacity style={this.changeStyleLeft()} onPress={()=>{this.changeMethod(true)}}>
          <Text style={this.changeFontLeft()} >Par restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.changeStyleRight()} onPress={()=>{this.changeMethod(false)}}>
          <Text style={this.changeFontRight()}>Par plat</Text>
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView  style={{ width:'100%', height:'100%'}}>
{ this.state.listShow.map((l, i) =>    (
      <View style={styles.rect} key={i}>
        <View style={styles.quickRow}>
          <Text style={styles.quick}>{l.name}</Text>
          <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>{this.props.navigation.navigate('CarteRestaurant',{idRestaurant:l.id})}}>
            <Text style={styles.voirLaCarte}>Voir la carte</Text>
          </TouchableOpacity>
          <Text style={styles.quick}>{this.findNote(l.id)}</Text>
        </View>
        {this.state.method &&
                <Text style={styles.loremIpsum}>
                adresse: {l.adresse}  
                </Text>
          }
          {!this.state.method &&
          
                <TouchableOpacity style={[styles.containerButtonPlat, this.props.style]} onPress={()=>{this.affichePlats(i)}}>
                <Text style={styles.voirLaCarte}>Voir les plats correspondants</Text>
              </TouchableOpacity>
              
          }
      </View>
    ))
  }
  </ScrollView>
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
    height: 135,
    backgroundColor: "rgba(150,175,208,1)",
    borderRadius: 12,
    marginTop: '2%'
  },
  quick: {
    color: "#121212",
    fontSize: 20,
    marginTop: 6
  },
  quickRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 48,
    marginRight: 52
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
    height: 32,
    alignSelf: "flex-start",
    fontSize: 15,
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
    backgroundColor: "#2196F3",
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
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft:'5%'
  },
  containerButtonPlat: {
    backgroundColor: "#2196F3",
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
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop:'8%'
  },
  voirLaCarte: {
    color: "#fff",
    fontSize: 14
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
  }
      
  });
  
export default Carte;