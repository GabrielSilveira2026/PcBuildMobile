import React from 'react'
import {SafeAreaView , Button,FlatList, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'
import JogosItem from '../Componentes/CartaoJogos'
import {useCart} from '../Constantes/CartContext'

const image = require('../Imagens/Fundo.png');


const SelecionadosTela = ({navigation}) => {
  const selecionados = useCart()
  
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>Selecionados</Text>

            {/* <Text>{JSON.stringify(selecionados.cart, null, 2)}</Text> */}
            <FlatList
              data={selecionados.cart}
              renderItem={j => (
              <JogosItem jogo={j.item}/>
              )}
            />

        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Jogos')}
          >
          <Text style={{color: 'black'}}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoProximo}
          onPress={() => navigation.navigate('Filtros')}
          >
          <Text style={{color: 'white'}}>Proxima</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
);
}

export default SelecionadosTela
