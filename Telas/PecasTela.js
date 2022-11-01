import * as React from 'react';
import {View , TouchableOpacity, Text, ImageBackground } from 'react-native';
import styles, {Cores} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'

const image = require('../Imagens/Fundo.png');

const PecasTela = ({navigation}) => {
  return (
    <ImageBackground source={image} resizeMode="stretch" style={styles.backgroundImage}>
      <View style={{ height: "90%" }}>
        <Text style={{ color: 'white', fontSize: 50, marginLeft: 'auto', marginRight: 'auto' }}>Peças</Text>
      </View>

      {/* <View style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Recomendados')}
          >
          <Text style={{color: 'black'}}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoProximo}
          >
          <Text style={{color: 'white'}}>Proxima</Text>
        </TouchableOpacity>
      </View> */}

      <Rodape telas={{anterior: 'Recomendados',proxima:'Login'}} />

    </ImageBackground>
  );
}

export default PecasTela
