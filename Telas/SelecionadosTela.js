import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles'

const image = require('../Imagens/Fundo.png');


const SelecionadosTela = ({navigation}) => {
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>Selecionados</Text>
        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
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
