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
import HeaderBackButton from "@react-navigation/stack";
import { TransitionSpecs,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
const Stack = createStackNavigator();

function Routes() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
          title: 'Acceuil',
          headerStyle: {
            backgroundColor: "rgba(68,146,225,0.5)",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="QR" component={QR}  options={{
          title: 'Scan le QR code',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }} />
      <Stack.Screen name="Splitter" component={Splitter}  options={{
          title: "Splitter d'addition",
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Recherche" component={Recherche}  options={{
          title: 'Choisissez votre commande ',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Carte" component={Carte} options={{
          title: 'Recherche de restaurant',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          
          
        }}  />
      <Stack.Screen name="CarteRestaurant" component={CarteRestaurant}  options={{
          title: 'Carte du Restaurant',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec ,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Connexion" component={Connexion}  options={{
          title: 'Inscription',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Reconnexion" component={Reconnexion}  options={{
          title: 'Connexion',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Notation" component={Notation}  options={{
          title: 'Veuillez notez le restaurant',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Serveur" component={Serveur}  options={{
          title: 'Inscription en tant que serveur',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="HomeServeur" component={HomeServeur}  options={{
          title: 'Acceuil',
          headerStyle: {
            backgroundColor: '#4492E1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
headerLeft={ ()=>{ return null}}
*/
export default Routes;