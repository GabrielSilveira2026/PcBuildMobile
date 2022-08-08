import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles'

const image = require('../Imagens/Fundo.png');

const RecomendadosTela = ({navigation}) => {
  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 22, marginLeft:'5%', marginRight: '5%', marginTop: 25, marginBottom: 10}}>Recomendamos esses 
Pcs, agora basta escolher!</Text>
          
          <View style={{borderWidth: 5, margin: 5, backgroundColor: 'white', padding: 8}}>
              <TouchableOpacity 
              style={stylesRecomendados.configBarata}
              onPress={() => navigation.navigate('Pecas')}
              >
                <Image source={require('../Imagens/menu.png')} style={{margin: 5,width: 110, height: '100%'}}></Image>
                <View styles={stylesRecomendados.detalhesConfigBarata}>
                  <Text>tipo</Text>
                  <Text>descrição</Text>
                  <Text>icone</Text>
                  <Text>favoritar</Text>
                </View>
              </TouchableOpacity>
          </View>

          <View style={{borderWidth: 5, margin: 5, backgroundColor: 'white', padding: 8}}>
              <TouchableOpacity 
              style={stylesRecomendados.configMediana}
              onPress={() => navigation.navigate('Pecas')}
              >
                <Image source={require('../Imagens/menu.png')} style={{margin: 5,width: 110, height: '100%'}}></Image>
                <View styles={stylesRecomendados.detalhesConfigMediana}>
                  <Text>tipo</Text>
                  <Text>descrição</Text>
                  <Text>icone</Text>
                  <Text>favoritar</Text>
                </View>
              </TouchableOpacity>
          </View>
          
          <View style={{borderWidth: 5, margin: 5, backgroundColor: 'white', padding: 8}}>
              <TouchableOpacity 
              style={stylesRecomendados.configDesempenho}
              onPress={() => navigation.navigate('Pecas')}
              >
                <Image source={require('../Imagens/menu.png')} style={{margin: 5,width: 110, height: '100%'}}></Image>
                <View styles={stylesRecomendados.detalhesConfigDesempenho}>
                  <Text>tipo</Text>
                  <Text>descrição</Text>
                  <Text>icone</Text>
                  <Text>favoritar</Text>
                </View>
              </TouchableOpacity>
          </View>

          

        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Filtros')}
          >
          <Text style={{color: 'black'}}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
);
}

export default RecomendadosTela

const stylesRecomendados = StyleSheet.create({
  configBarata: {
    flexDirection: 'row', 
  },
  
  configMediana: {
    flexDirection: 'row', 
  },
  
  configDesempenho: {
    flexDirection: 'row', 
  },
})