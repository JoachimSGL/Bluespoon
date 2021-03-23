import { StyleSheet, View, TouchableOpacity, Text,TextInput } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';

class Notation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
          };
    }
    onPress(){
      
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
      }
    
  render() {
    

    return (
        <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.nomRestaurant}>Quick</Text>
        <View style={[styles.containerInput, this.props.style]}>
        <AirbnbRating
                count={7}
                reviews={["Ne pas recommander", "pas terrible", "Ok",'Bon', "Très bien", "Incroyable", "Dingue"]}
                defaultRating={4}
                size={20}
                onFinishRating={this.ratingCompleted}
                />
            <TextInput
                placeholder="Commentaires"
                style={styles.inputStyle}
                multiline={true}
            ></TextInput>
            
        </View>
        <TouchableOpacity style={[styles.containerButton, this.props.style]}>
        <Text style={styles.caption}>Valider</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rect2}>
      <TouchableOpacity style={[styles.containerButton, this.props.style]}>
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
        height: '70%',
        backgroundColor: "rgba(159,201,233,1)"
      },
      rect: {
        width: '100%',
        height: '80%',
        backgroundColor: "rgba(159,201,233,1)"
      },
      nomRestaurant: {
        color: "#121212",
        fontSize: 20,
        textAlign: "center",
        width: '100%',
        height: '20%',
        marginTop: '3%',
        marginBottom: '1%',
      },
      rect2: {
        width: '100%',
        height: '90%',
        backgroundColor: "rgba(58,94,138,1)",
        marginTop:'4%'
      },
      containerInput: {
        borderBottomWidth: 1,
        borderColor: "#D9D5DC",
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        height:'50%'
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
        marginLeft:'2%',
        backgroundColor: "rgba(32,115,210,0.36)",
        borderRadius: 15,
      },
      containerButton: {
        backgroundColor: "#F44336",
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
      caption: {
        color: "#fff",
        fontSize: 20
      }
  });
  
export default Notation;