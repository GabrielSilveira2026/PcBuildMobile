import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'

const image = require('../Imagens/Fundo.png');

const MenuTela = ({navigation}) => {
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          <Text>TELA PROGRAMAS</Text>
        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoProximo}
          onPress={() => navigation.navigate('Programas')}
          >
          <Text style={{color: 'white'}}>Proxima</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
);
}

export default MenuTela

const styles = StyleSheet.create({})