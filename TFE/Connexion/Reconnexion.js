import { StyleSheet, View, TouchableOpacity, Text, TextInput, ImageBackground,Image } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from "react-native-bcrypt";


class Reconnexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            secure:true,
            email:'',
            password:'',
            loading:false,
            error:false,
          };
          this.onChange= this.onChange.bind(this);
          this.onChangePass= this.onChangePass.bind(this);
    }
    
    onChange(txt){
        this.setState({email:txt.nativeEvent.text});
    }
    onChangePass(txt){
        this.setState({password:txt.nativeEvent.text});
    }
    async storeToken(m,p) {
      
        try {
           await AsyncStorage.setItem(p, JSON.stringify(m));
        } catch (error) {
          console.log("Something went wrong", error);
        }
        
  
      
      }
    connexion(){
      if(this.state.password!=="" && this.state.email!==""){
      let pass =this.state.password;
      let t = this;
      this.setState({loading:true});
       
      this.setState({error:false});
        fetch('http://192.168.0.8:3001/reconnexion?email='+this.state.email, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          }).then(response => response.json())
          .then((json) => {
          console.log(json);
          if(json!=='no'){
          bcrypt.compare(pass, json[0].password, function(err, res) {
            console.log(res);
          if(res){
            t.storeToken(json[0].id,'id');
            if(json[0].serveur){
              t.setState({loading:false});
              t.storeToken(json[0].serveur,'serveur');
              t.props.navigation.navigate('HomeServeur',{serveur:json[0].serveur,numTable:json[0].numTable});
            }else{
              t.setState({loading:false});
              t.storeToken(json[0].serveur,'serveur');
              t.props.navigation.replace('Home',{serveur:json[0].serveur});
            }
          }else{
            console.log(err);
          }

        });
          }else{
            t.setState({error:true})
          } 
        });
      }else{
        this.setState({error:true})
      }
      
    }
  render() {
    

    return (
        <View style={styles.containerBig}>
      <Text style={styles.bluespoon}>Se connecter</Text>
        <View style={[styles.container, this.props.style]}>
            <Text style={styles.label}>E-mail :</Text>
            <TextInput style={styles.inputStyle} onChange={this.onChange}>{this.state.email}</TextInput>
        </View>
        <View style={{marginTop:'10%'}}>
            <View style={[styles.containerPass, this.props.style]}>
            <TextInput
                placeholder='Mot de passe'
                style={styles.inputStylePass}
                secureTextEntry={this.state.secure}
                onChange={this.onChangePass}
            >{this.state.password}</TextInput>
            <Icon name="eye" style={styles.iconStylePass} onPress={()=>this.setState({secure:!this.state.secure})}></Icon>
            </View>
        </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]} onPress={()=>this.connexion()}>
        <Text style={styles.caption}>Se connecter</Text>
        </TouchableOpacity>
        {this.state.loading &&
            <Image
            source={{uri: "http://192.168.0.8:3001/image/loading2.gif"}}
            style={styles.imageLoading}
        ></Image>
          
        }
        {this.state.error &&
        <Text style={styles.captionRed} >Vous avez une erreur dans vos informations</Text>

        }
        <Text style={styles.lien} onPress={()=>this.props.navigation.navigate('Serveur')}>Créer un compte serveur?</Text>
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
      lien: {
        //fontFamily: "Georgian",
        color: "#121212",
        textDecorationLine: "underline",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        marginTop: '2%',
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
      imageLoading: {
        backgroundColor: "rgba(191,209,249,1)",
        flex: 1,
        height:'10%',
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: "rgba(191,209,249,1)",
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
  
export default Reconnexion;