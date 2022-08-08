import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles'
import {Feather} from 'react-native-vector-icons';

const image = require('../Imagens/Fundo.png');

const JogosTela = ({navigation}) => {
  return (
      <SafeAreaView style={styles.tela}>
        {/* Conteudo da Tela */}
        <SafeAreaView style={styles.conteudo}>
          <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          {/* Tab jogos/programas */}
          <SafeAreaView style={stylesJ.tab}>
            <TouchableOpacity style={stylesJ.botaoJogos} onPress={() => navigation.navigate('Jogos')}>
              <Text style={{color: 'white', fontSize: 25}}>Jogos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={stylesJ.botaoProgramas} onPress={() => navigation.navigate('Programas')}>
              <Text style={{color: 'black', fontSize: 25}}>Programas</Text>
            </TouchableOpacity>

          </SafeAreaView>

          <Text style={{textAlign: 'center', color: 'black', fontSize: 19, marginLeft:'15%', marginRight: '15%'}}>Escolha os jogos que você deseja jogar!</Text>

          </ImageBackground>
        </SafeAreaView>

        {/* Rodapé com botões */}
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

export default JogosTela;


const stylesJ = StyleSheet.create({
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
    backgroundColor: 'black',
    alignItems: "center",
    width: '45%', 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  
  botaoProgramas: {
    backgroundColor: 'white',
    alignItems: "center",
    width: '45%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },

  botaoProximo:{
    width: '100%',
  }

})