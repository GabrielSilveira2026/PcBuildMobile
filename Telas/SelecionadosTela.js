import React,{useState} from 'react'
import {FlatList,StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Rodape from '../Componentes/Rodape'
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import CartaoJogo from '../Componentes/CartaoJogo'
import {useCart} from '../Constantes/CartContext'


const SelecionadosTela = ({navigation}) => {
  const selecionados = useCart()

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
        <Text style={styles.titulo}>Deseja trocar algum jogo?</Text>
        
        <FlatList
        style={{width: '100%'}}
        data={selecionados.cart}
        numColumns={2}
        keyExtractor={item => item.id_jogo_steam}
        renderItem={j => (
          <CartaoJogo jogo={j.item} />
          )}
        />

      </View>
      <Rodape telas={{ anterior: 'Jogos',proxima: 'Filtros' }}></Rodape>
    </ImageBackground>
);
}

export default SelecionadosTela

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center', 
    fontSize: 25,
    color: 'white', 
    marginBottom: 15
  },
})