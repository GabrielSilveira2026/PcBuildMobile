// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{fontSize: 25}}>Primeira Tela</Text>
//       <Button 
//         title="Segunda tela"
//         onPress={() => navigation.navigate('Segunda')}
//       />
//     </View>
//   );
// }

import HomeScreen from './Telas/HomeScreen';
import JogosTela from './Telas/JogosTela';
import ProgramasTela from './Telas/ProgramasTela';
import SelecionadosTela from './Telas/SelecionadosTela';
import FiltrosTela from './Telas/FiltrosTela';
import RecomendadosTela from './Telas/RecomendadosTela';
import PecasTela from './Telas/PecasTela';

function SegundaTela({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 25}}>Segunda Tela :)</Text>
      <Button 
        title="Terceira Tela"
        onPress={() => navigation.navigate('Terceira')}
      />
    </View>
  );
}

function TerceiraTela({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 50}}>Terceira Tela</Text>
      <Button 
        title="Primeira Tela"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('./Imagens/menu.png')}
    />
  );
}

const Stack = createNativeStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator
      screenOptions={{
        initialRouteName: "Jogos",
        headerStyle: {
          backgroundColor: '#DF3F48',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor:'black',
        headerTitle:  () => (
          <Button
            title = "Menu" 
            Textcolor = "black"
            onPress={() => navigation.navigate('Home')}
          />
        ),
        // (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <Button
            title = "Pesquisa"
          />
        ),
        headerLeft: ()=> null
      }}
      >
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
        /> */}
        {/* <Stack.Screen
          name="Segunda"
          component={SegundaTela}
        /> */}
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
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;