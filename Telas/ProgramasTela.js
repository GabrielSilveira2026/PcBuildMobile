import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'

const image = require('../Imagens/Fundo.png');

const ProgramasTela = ({navigation}) => {
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>

        {/* Tab jogos/programas */}
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <SafeAreaView style={stylesP.tab}>
          <TouchableOpacity style={stylesP.botaoJogos} onPress={() => navigation.navigate('Jogos')}>
            <Text style={{ color: 'black', fontSize: 25 }}>Jogos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesP.botaoProgramas} onPress={() => navigation.navigate('Programas')}>
            <Text style={{ color: 'white', fontSize: 25 }}>Programas</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <Text style={{textAlign: 'center', color: 'black', fontSize: 19, marginLeft:'15%', marginRight: '15%'}}>Escolha os Programas que você deseja utilizar!</Text>
        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoProximo}
          onPress={() => navigation.navigate('Selecionados')}
          >
          <Text style={{color: 'white'}}>Proxima</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
);
}

export default ProgramasTela


const stylesP = StyleSheet.create({
  tab:{
    flexDirection: "row",
    marginLeft:'auto', 
    marginRight: 'auto', 
    marginTop: 25, 
    marginBottom: 10,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },

  botaoJogos: {
    backgroundColor: 'white',
    alignItems: "center",
    width: '45%', 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  botaoProgramas: {
    backgroundColor: 'black',
    alignItems: "center",
    width: '45%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }

})