import React, { Component } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
//import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class QR extends Component {
 // const [hasPermission, setHasPermission] = useState(null);
  //const [scanned, setScanned] = useState(false);
/*
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(type==256){
      //data = toString(data);
      //let res = data.substr(-2, -1);
      console.log(data.split("/"));
      if(data.split("/")[3]=='Recherche'){
        navigation.replace(data.split("/")[3], { idRestaurant: parseInt(data.split("/")[4]),numero: parseInt(data.split("/")[5]) });
      }
    }
  };*/
  onSuccess = e => {
    console.log(e.data);
    console.log(e.data.split("/"));
    if(e.data.split("/")[3]=='Recherche'){
      this.props.navigation.replace(e.data.split("/")[3], { idRestaurant: parseInt(e.data.split("/")[4]),numero: parseInt(e.data.split("/")[5]) });
    }
  };
/*
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
*/
render(){
  return (
    <QRCodeScanner
    onRead={this.onSuccess}
    
   
    
  />
        
      
  );
}
}
/*
<BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
*/
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