// In App.js in a new project

import * as React from 'react';
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

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('./Imagens/menu.png')}
    />
  );
}

const Stack = createNativeStackNavigator();

function MyStack({navigation}){
  return(
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
  )
}

function App() {
  return (
    <NavigationContainer>
      {/* <Image source={require("./Imagens/Fundo.png")} style={{width: '100%', height: '100%', position: "absolute"}} /> */}
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;