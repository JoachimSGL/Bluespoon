import { StyleSheet, View, TouchableOpacity, Text, TextInput,Image  } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import bcrypt from "react-native-bcrypt";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
class Serveur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            secure:true,
            nom:'',
            prenom:'',
            email:'',
            mdp:'',
            mdp2:'',
            mdpR:'',
            activeR:false,
            nomRestaurant:'',
            loading:false,
            error:false,
          };
          this.onChangeNom= this.onChangeNom.bind(this);
          this.onChangeNomRestaurant= this.onChangeNomRestaurant.bind(this);
          this.onChangePrenom= this.onChangePrenom.bind(this);
          this.onChangeEmail= this.onChangeEmail.bind(this);
          this.onChangeMdp= this.onChangeMdp.bind(this);
          this.onChangeMdpR= this.onChangeMdpR.bind(this);
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
    onChangeMdpR(txt){
        this.setState({mdpR:txt.nativeEvent.text});
    }
    onChangeMdp2(txt){
        this.setState({mdp2:txt.nativeEvent.text});
    }
    onChangeNomRestaurant(txt){
        this.setState({nomRestaurant:txt.nativeEvent.text});
    }
    async storeToken(m,n) {
        try {
           await AsyncStorage.setItem(n, JSON.stringify(m));
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
     inscription(){
if(this.state.mdp==this.state.mdp2 && this.state.mdp!==""&& this.state.mdp2!==""&& this.state.nom!==""&& this.state.prenom!==""&& this.state.email!==""&& this.state.mdpR!==""&& this.state.nomRestaurant!==""){
      let t = this;
      this.setState({error:false});
      let pass = this.state.mdp;
      this.setState({loading:true});

      fetch('https://bluespoon-app.herokuapp.com/reconnexionRestaurant?nom='+this.state.nomRestaurant, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((resultatRestaurant) => {
        bcrypt.compare(t.state.mdpR, resultatRestaurant[0].passwordRestaurant, function(err2, res) {
          console.log(res)
          console.log(t.state.mdpR)
          if(res){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
          console.log(hash);
        fetch('https://bluespoon-app.herokuapp.com/inscriptionServeur', {
            method: 'POST',
            body: JSON.stringify({
                nom:t.state.nom,
                prenom: t.state.prenom,
                email: t.state.email,
                mdp:hash,
                mdpR:t.state.mdpR,
                nomRestaurant:t.state.nomRestaurant
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
            t.setState({loading:false});
            t.storeToken(json[0].id,'id');
            t.storeToken(json[0].serveur,'serveur');
            t.props.navigation.navigate('HomeServeur',{serveur:true,numTable:json[0].numTable});
          }else{
              console.log(json);
              t.setState({loading:false});
          }
        });
      });
    });

  }else{
    this.setState({error:true});
  }
});

  });
}else{
  this.setState({error:true});
}

    }
  render() {
    

    return (
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>S'inscrire en tant que serveur</Text>
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
        <View style={{marginTop:'5%'}}>
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
        <View style={[styles.containerR, this.props.style]}>
            <Text style={styles.label}>Nom du restaurant :</Text>
            <TextInput style={styles.inputStyle} onChange={this.onChangeNomRestaurant}>{this.state.nomRestaurant}</TextInput>
        </View>
        <View style={{marginTop:'5%'}}>
        <View style={[styles.containerPass, this.props.style]}>
            <TextInput
                placeholder='Mot de passe de votre restaurant'
                style={styles.inputStylePass}
                secureTextEntry={this.state.secureR}
                onChange={this.onChangeMdpR}
            >{this.state.mdpR}</TextInput>
            <Icon name="eye" style={styles.iconStylePass} onPress={()=>this.setState({secureR:!this.state.secureR})}></Icon>
            </View>
            </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.inscription()}>
          {!this.state.loading &&
        <Text style={styles.caption} >S'inscrire</Text>
          }
        {this.state.loading &&
            <Image
            source={{uri: "https://bluespoon-app.herokuapp.com/image/loading2.gif"}}
            style={styles.imageLoading}
        ></Image>
          
        }
        </TouchableOpacity>
        {this.state.error &&
        <Text style={styles.captionRed} >Vous avez une erreur dans vos informations</Text>

        }
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
        fontSize: 20,
        marginTop: '5%',
        marginBottom:'5%'
        //marginLeft: 93
      },
      imageLoading: {
        flex: 1,
        height:'90%',
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: "#2196F3",
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
      containerR: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        backgroundColor: "transparent",
        flexDirection: "row",
        paddingLeft: 16,
        borderRadius: 100,
        backgroundColor: "rgba(196,224,233,1)",
        marginTop: '5%'
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
      },
      captionRed:{
        color: "red",
        fontSize: 20
      }
  });
  
export default Serveur;