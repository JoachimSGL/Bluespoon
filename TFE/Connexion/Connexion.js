import { StyleSheet, View, TouchableOpacity, Text, TextInput  } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            secure:true,
            nom:'',
            prenom:'',
            email:'',
            mdp:'',
            mdp2:''
          };
          this.onChangeNom= this.onChangeNom.bind(this);
          this.onChangePrenom= this.onChangePrenom.bind(this);
          this.onChangeEmail= this.onChangeEmail.bind(this);
          this.onChangeMdp= this.onChangeMdp.bind(this);
          this.onChangeMdp2= this.onChangeMdp2.bind(this);
    }
    onPress(){
      
    }
    onChangeNom(txt){
        this.setState({nom:txt.nativeEvent.text});
    }
    onChangePrenom(txt){
        this.setState({prenom:txt.nativeEvent.text});
    }
    onChangeEmail(txt){
        this.setState({email:txt.nativeEvent.text});
    }
    onChangeMdp(txt){
        this.setState({mdp:txt.nativeEvent.text});
    }
    onChangeMdp2(txt){
        this.setState({mdp2:txt.nativeEvent.text});
    }
    async storeToken(m,p) {
        try {
           await AsyncStorage.setItem(p, JSON.stringify(m));
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
     inscription(){
        fetch('http://192.168.0.8:3001/inscription', {
            method: 'POST',
            body: JSON.stringify({
                nom:this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                mdp:this.state.mdp
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((json) => {
          console.log(json);
          if(json!='no' && json!='pas autorisé'){
            this.storeToken(json[0].id,'id');
            this.storeToken(json[0].serveur,'serveur');
            this.props.navigation.replace('Home');
          }else{
              
          }
        });
    }
  render() {
    

    return (
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>S'inscrire</Text>
        <View style={[styles.container, this.props.style]}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput style={styles.inputStyle} onChange={this.onChangeNom}>{this.state.nom}</TextInput>
        </View>
        <View style={[styles.container, this.props.style]}>
            <Text style={styles.label}>Prenom :</Text>
            <TextInput style={styles.inputStyle} onChange={this.onChangePrenom}>{this.state.prenom}</TextInput>
        </View>
        <View style={[styles.container, this.props.style]}>
            <Text style={styles.label}>E-mail :</Text>
            <TextInput style={styles.inputStyle} onChange={this.onChangeEmail}>{this.state.email}</TextInput>
        </View>
        <View style={{marginTop:'10%'}}>
            <View style={[styles.containerPass, this.props.style]}>
            <TextInput
                placeholder='Mot de passe'
                style={styles.inputStylePass}
                secureTextEntry={this.state.secure}
                onChange={this.onChangeMdp}
            >{this.state.mdp}</TextInput>
            <Icon name="eye" style={styles.iconStylePass} onPress={()=>this.setState({secure:!this.state.secure})}></Icon>
            </View>

            <View style={[styles.containerPass, this.props.style]}>
            <TextInput
                placeholder='Répéter le mot de passe'
                style={styles.inputStylePass}
                secureTextEntry={this.state.secure}
                onChange={this.onChangeMdp2}
            >{this.state.mdp2}</TextInput>
            <Icon name="eye" style={styles.iconStylePass} onPress={()=>this.setState({secure:!this.state.secure})}></Icon>
            </View>
        </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]}>
        <Text style={styles.caption} onPress={()=>this.inscription()}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
}

}
const styles = StyleSheet.create({
   
    containerBig: {
        flex: 1,
        backgroundColor: "rgba(191,209,249,1)"
      },
      bluespoon: {
        //fontFamily: "Georgian",
        color: "#121212",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        marginTop: 80,
        //marginLeft: 93
      },
      container: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        backgroundColor: "transparent",
        flexDirection: "row",
        paddingLeft: 16,
        borderRadius: 100,
        backgroundColor: "rgba(196,224,233,1)",
        marginTop: '1%'
      },
      label: {
        fontSize: 16,
        lineHeight: 16,
        paddingTop: 16,
        paddingBottom: 8,
        color: "#000",
        opacity: 0.5,
        alignSelf: "flex-start"
      },
      inputStyle: {
        color: "#000",
        paddingRight: 5,
        fontSize: 16,
        alignSelf: "stretch",
        flex: 1,
        lineHeight: 16,
        paddingTop: 14,
        paddingBottom: 8,
        paddingLeft: 30
      },
      containerPass: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(193,197,225,1)",

      },
      iconStylePass: {
        color: "#616161",
        fontSize: 24,
        paddingRight: 8
      },
      inputStylePass: {
        color: "#000",
        paddingRight: 16,
        fontSize: 16,
        alignSelf: "stretch",
        flex: 1,
        lineHeight: 16,
        paddingTop: 14,
        paddingBottom: 8
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
        height: '10%',
        width: '50%',
        marginTop: '5%',
        marginLeft: '25%',
        
        borderRadius: 120,

      },
      caption: {
        color: "#fff",
        fontSize: 17
      }
  });
  
export default Connexion;