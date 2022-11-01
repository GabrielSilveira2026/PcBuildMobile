import React from 'react'
import {SafeAreaView , Button, FlatList, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Rodape from '../Componentes/Rodape'
import styles, {Cores} from '../Constantes/Styles'
import Cartao from '../Componentes/Cartao'
import {useCart} from '../Constantes/CartContext'

const image = require('../Imagens/Fundo.png');


const SelecionadosTela = ({navigation}) => {
  const selecionados = useCart()
  
  return (
    <ImageBackground source={image} resizeMode="stretch" style={styles.backgroundImage}>
      <View style={{ height: "90%" }}>
        <Text style={{ color: 'white', fontSize: 50, marginLeft: 'auto', marginRight: 'auto' }}>Selecionados</Text>

        <FlatList
          data={selecionados.cart}
          keyExtractor={(item) => item.id}
          extraData={selecionados.cart}
          renderItem={j => (
            <Cartao jogo={j.item} />
          )}
        />

      </View>
      <Rodape telas={{ anterior: 'Jogos', proxima: 'Filtros' }}></Rodape>
    </ImageBackground>
);
}

export default SelecionadosTela
