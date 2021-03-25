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
            search:''
          };
          this.changeSearch= this.changeSearch.bind(this);
    }
    changeSearch(txt){
      this.setState({search:txt.nativeEvent.text});
      let arr = [];
      for(let i = 0 ; i<this.state.list.length;i++){
        if(this.state.list[i].name.includes(txt.nativeEvent.text) || this.state.list[i].adresse.includes(txt.nativeEvent.text)){
          arr.push(this.state.list[i]);
        }
      }
      this.setState({listShow:arr});
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
        for(let i = 0 ; i<json.length;i++){
          arr.push({name:json[i].nomRestaurant,id : json[i].id,adresse:json[i].adresse, localisation:json[i].adresse});// changer ici qd j aurai mis la localisation
        }
        this.setState({list:arr});
        this.setState({listShow:arr});
      })


    }

        
  render() {
    

    return (
      
      <View style={styles.container}>



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


    <ScrollView  style={{ width:'100%', height:'100%'}}>
{ this.state.listShow.map((l, i) =>    (
      <View style={styles.rect} key={i}>
        <View style={styles.quickRow}>
          <Text style={styles.quick}>{l.name}</Text>
          <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>{this.props.navigation.navigate('CarteRestaurant',{idRestaurant:l.id})}}>
            <Text style={styles.voirLaCarte}>Voir la carte</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loremIpsum}>
         adresse: {l.adresse}  
        </Text>
        <Text style={styles.loremIpsum}>
          localisation:{l.localisation}
        </Text>
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
  voirLaCarte: {
    color: "#fff",
    fontSize: 14
  }
      
  });
  
export default Carte;