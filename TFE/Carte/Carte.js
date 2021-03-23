import { StyleSheet, View, TouchableOpacity, Text, Image,ScrollView,SafeAreaView, StatusBar  } from "react-native";
import React from 'react';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay,ListItem, Avatar } from 'react-native-elements';
class Carte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.route.params.id ? this.props.route.params.id : 0),
            visible:false,
            nom:'Giant',
            commentaires:'encore mieux que le mc do',
            prix:'13',

          };
    }
    onPress(){
      
    }
    componentDidMount(){
        if(this.state.id==0){
            this.props.navigation.navigate('Splitter');    
        
        }
        }

        toggleOverlay=()=>{
            this.setState({visible : !this.state.visible});
        }
        changerPlat=(val)=>{
            console.log(val);
        }
  render() {
    

    return (
      <View className='container'>


            
            <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}  >
                <Text>                                                                                  </Text>
                {
                    list.map((l, i) => (
                    <ListItem key={i} bottomDivider onPress={this.changerPlat(val)} >
                        <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    ))
                }
            </Overlay>

        <View style={styles.rect}>
                        <View style={styles.materialButtonPrimary1Row}>
                                    <View style={[styles.containerImage, this.props.style]}>
                                        <Image
                                            source={require("./giant.jpg")}
                                            style={styles.cardItemImagePlace}
                                        ></Image>
                                                <View style={styles.cardBody}>
                                                    <View style={styles.bodyContent}>
                                                    <Text style={styles.titleStyle}>
                                                        {this.state.nom}
                                                    </Text>
                                                    <Text style={styles.subtitleStyle}>
                                                    {this.state.commentaires}
                                                    </Text>
                                                    </View>
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
                                                </View>
                                    </View>

                        </View>
            <View style={{flex:1,width:'100%',height:'100%'}}>
            <TouchableOpacity style={[styles.containerButton, this.props.style]}>
            <Text style={styles.caption}>Commander</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerButtonMauve, this.props.style]} onPress={this.toggleOverlay}>
            <Text style={styles.captionMauve}>Catalogue</Text>
            </TouchableOpacity>
            
            </View>  
            <View>
            
            </View>
        </View >



        




            







            <View style={[styles.containerFooter, this.props.style]}>
            <TouchableOpacity style={styles.btnWrapper1}>
                <MaterialCommunityIconsIcon
                name={this.props.icon1 || "food"}
                style={styles.icon1}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.btn1Text}>Plats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activebtnWrapper}>
                <MaterialCommunityIconsIcon
                name={this.props.activeIcon || "cup"}
                style={styles.activeIcon}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.activeText}>Boissons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrapper2}>
                <MaterialCommunityIconsIcon
                name={this.props.icon2 || "package-variant-closed"}
                style={styles.icon2}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.btn2Text}>Panier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrapper3}>
                <MaterialCommunityIconsIcon
                name={this.props.icon3 || "calculator"}
                style={styles.icon3}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.btn3Text}>Splitter</Text>
            </TouchableOpacity>
            </View>
            
            </View>



    
    );
}

}

/*
<SafeAreaView style={{flex: 1,paddingTop:'0%', width:'100%', height:'100%'}} >
      <ScrollView  style={styles.container}>




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
*/
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex:1
      },
      rect: {
        width: '100%',
        height: '86%',
        backgroundColor: "rgba(159,218,215,1)",
        borderRadius: 21,
        marginTop: '2%',
        marginBottom: '2%'

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
        minHeight: '100%'
      },
      cardBody: {
        position: "absolute",
        bottom: 5,
        backgroundColor: "rgba(0,0,0,0.2)",
        left: 0,
        right: 14
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
        backgroundColor: "#3f51b5",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: -2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 3
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
        paddingTop: 6,
        paddingBottom: 10,
        paddingHorizontal: 12,
        minWidth: 80,
        maxWidth: 168,
        alignItems: "center"
      },
      activeIcon: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24
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
        }
      
  });
  
export default Carte;