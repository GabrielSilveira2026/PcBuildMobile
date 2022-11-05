
import {View,ImageBackground, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome5} from 'react-native-vector-icons';
import 'react-native-gesture-handler';

import styles from './Constantes/Styles'
import LoginTela from './Telas/LoginTela';
import JogosTela from './Telas/JogosTela';
import ProgramasTela from './Telas/ProgramasTela';
import SelecionadosTela from './Telas/SelecionadosTela';
import FiltrosTela from './Telas/FiltrosTela';
import RecomendadosTela from './Telas/RecomendadosTela';
import PecasTela from './Telas/PecasTela';
import {CartProvider} from './Constantes/CartContext';
import Rodape from './Componentes/Rodape';
import Cabecalho from './Componentes/Cabecalho'
const image = require('./Imagens/Fundo.png');

const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={JogosTela} />
      <Drawer.Screen name="Article" component={SelecionadosTela} />
    </Drawer.Navigator>
  );
}
function MyStack({navigation}){
  return(
    <CartProvider>
      <StatusBar></StatusBar>
    <Stack.Navigator
      screenOptions={{
        header: (props) => {
          // console.log(props)
          return (
            <Cabecalho props={props}/>
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
        <Stack.Screen
          name="Login"
          component={LoginTela}
        />
    </Stack.Navigator>
  </CartProvider>
  )
}

function App() {
  return (
    <NavigationContainer>
      {/* <MyDrawer> */}
        <MyStack/>
      {/* </MyDrawer> */}
    </NavigationContainer>
  );
}

export default App;