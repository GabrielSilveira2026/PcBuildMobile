import * as React from 'react';
import {SafeAreaView , Button,FlatList, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles'
import JogosItem from '../Services/JogosItem'

const image = require('../Imagens/Fundo.png');


const SelecionadosTela = ({navigation}) => {
  
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>Selecionados</Text>

          <View>
            {/* <FlatList
              data={selecionados}
              renderItem={j => (
              <JogosItem jogo={j.item}/>
              )}
            /> */}
          </View>

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
