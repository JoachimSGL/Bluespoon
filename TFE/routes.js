import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home/Home';
import HomeServeur from './Home/HomeServeur';
import QR from './QR/QR';
import Splitter from './Splitter/Splitter';
import Recherche from './Recherche/Recherche';
import Carte from './Carte/Carte';
import CarteRestaurant from './Carte/CarteRestaurant';
import Table from './Table/Table';
import Notation from './Notation/Notation';
import Connexion from './Connexion/Connexion';
import Reconnexion from './Connexion/Reconnexion';
import Serveur from './Connexion/Serveur';
import React from 'react';
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="QR" component={QR} />
      <Stack.Screen name="Splitter" component={Splitter} />
      <Stack.Screen name="Recherche" component={Recherche} />
      <Stack.Screen name="Carte" component={Carte} />
      <Stack.Screen name="CarteRestaurant" component={CarteRestaurant} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Reconnexion" component={Reconnexion} />
      <Stack.Screen name="Notation" component={Notation} />
      <Stack.Screen name="Serveur" component={Serveur} />
      <Stack.Screen name="HomeServeur" component={HomeServeur} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;