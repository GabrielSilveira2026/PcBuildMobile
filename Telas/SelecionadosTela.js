import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';

const image = require('../Imagens/Fundo.png');


const SelecionadosTela = ({navigation}) => {
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={{width: '100%', height: '100%'}}>
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

const styles = StyleSheet.create({
  // imageBackground: {
  //   width: '100%', 
  //   height: '100%',
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  tela:{
    textAlign: "center",
    justifyContent: "center",
  },
  conteudo:{
    textAlign: "center",
    height: '89.9%',
    backgroundColor: Cores.secondary,
  },
  rodape: {
    padding: 8,
    height:80,
    width: '100%',
    backgroundColor: Cores.primary,
    borderWidth: 2,
    borderRadius: 7,
    justifyContent: 'flex-end',
  },
  botaoProximo:{
    alignItems: "center",
    borderRadius: 7,
    padding:15, 
    width: '100%', 
    backgroundColor: 'black',
  }
});
