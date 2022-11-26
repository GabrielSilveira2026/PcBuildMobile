
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import LoginTela from './Telas/LoginTela';
import JogosTela from './Telas/JogosTela';
import ProgramasTela from './Telas/ProgramasTela';
import SelecionadosTela from './Telas/SelecionadosTela';
import FiltrosTela from './Telas/FiltrosTela';
import RecomendadosTela from './Telas/RecomendadosTela';
import FavoritosTela from './Telas/FavoritosTela';
import CadastroTela from './Telas/CadastroTela';
import PecasTela from './Telas/PecasTela';
import {CartProvider} from './Constantes/CartContext';
import Cabecalho from './Componentes/Cabecalho'
import EsqueciSenhaTela from './Telas/EsqueciSenhaTela';
import PerfilTela from './Telas/PerfilTela';

const Stack = createNativeStackNavigator();

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
            name="Cadastro"
            component={CadastroTela}
          />
          <Stack.Screen
            name="Login"
            component={LoginTela}
          />
          <Stack.Screen
            name="EsqueciSenha"
            component={EsqueciSenhaTela}
          />
          <Stack.Screen
            name="Perfil"
            component={PerfilTela}
          />
          <Stack.Screen
            name="Favoritos"
            component={FavoritosTela}
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