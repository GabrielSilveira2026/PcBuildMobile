import React, {useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput,StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Rodape from '../Componentes/Rodape'

const FiltrosTela = ({navigation}) => {
  const [preco, setPreco] = useState('')
  const capturarPreco = (precoDigitado) => {
    setPreco(precoDigitado)
  }
  
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
          <Text style={styles.titulo}>Selecione um valor máximo para a recomendação</Text>
          
          <TextInput
            style={styles.inputFiltro}
            placeholder="Digite um valor máximo"
            placeholderTextColor="#cccccc"
            keyboardType={'number-pad'}
            value={preco}
            onChangeText={capturarPreco}
          />
      </View>
      <Rodape telas={{ anterior: 'Selecionados', proxima: 'Recomendados', parametroProxima: preco}} />
    </ImageBackground>
);
}
