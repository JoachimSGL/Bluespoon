import React, { Component } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
//import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class QR extends Component {


  onSuccess = e => {
    console.log(e.data);
    console.log(e.data.split("/"));
    if(e.data.split("/")[3]=='Table'){
      this.props.navigation.replace(e.data.split("/")[3], { idRestaurant: parseInt(e.data.split("/")[4]),numTable: parseInt(e.data.split("/")[5]) });
    }
  };

render(){
  return (
    <QRCodeScanner
    onRead={this.onSuccess}
    
  />
        
      
  );
}
}

const styles=StyleSheet.create({
   
  container: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }

});
export default QR;