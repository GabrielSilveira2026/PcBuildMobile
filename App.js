import {useContext, useState, useEffect} from 'react';
import { SafeAreaView ,Button, StyleSheet, Text, Image, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome5} from 'react-native-vector-icons';

import styles from './Constantes/Styles'
import Cores from './Constantes/Cores';
import HomeScreen from './Telas/HomeScreen';
import JogosTela from './Telas/JogosTela';
import ProgramasTela from './Telas/ProgramasTela';
import SelecionadosTela from './Telas/SelecionadosTela';
import FiltrosTela from './Telas/FiltrosTela';
import RecomendadosTela from './Telas/RecomendadosTela';
import PecasTela from './Telas/PecasTela';
import {CartProvider, CartContext} from './Constantes/CartContext';

const Stack = createNativeStackNavigator();

function MyStack({navigation}){
  return(
  <CartProvider>
    <Stack.Navigator
      screenOptions={{
        header: (props) => {
          // console.log(props)
          return (
            <SafeAreaView style={styles.cabecalho}> 
              <FontAwesome5 name="bars" size={40} color="black" onPress={() => props.navigation.navigate('Jogos')}/>
              <FontAwesome5 name="search" size={40} color="black"/>
            </SafeAreaView >
          )
        }
      }}
      >
        <Stack.Screen
          name="Jogos"
          component={JogosTela}
        />
        <Stack.Screen
          name="Programas"
          component={ProgramasTela}
        />
        <Stack.Screen
          name="Selecionados"
          component={SelecionadosTela}
        />
        <Stack.Screen
          name="Filtros"
          component={FiltrosTela}
        />
        <Stack.Screen
          name="Recomendados"
          component={RecomendadosTela}
        />
        <Stack.Screen
          name="Pecas"
          component={PecasTela}
        />
    </Stack.Navigator>
  </CartProvider>

  )
}

function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;