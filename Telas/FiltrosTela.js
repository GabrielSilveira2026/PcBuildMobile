import axios from "axios";
import React, { useState, useEffect,  } from 'react';
import {SafeAreaView , TextInput, FlatList, Linking , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Rodape from '../Componentes/Rodape'
import styles, {Cores, imagemFundo} from '../Constantes/Styles'

import CartaoProdutos from '../Componentes/CartaoProdutos'

const image = require('../Imagens/Fundo.png');

const FiltrosTela = ({navigation}) => {
  const [produto, setProduto] = useState('')
  const capturarProduto = (produtoDigitada) => {
    setProduto(produtoDigitada)
  }

  const [precos, setPrecos] = useState([])

  const params = {
    api_key: "B9E7BDF7D3024533B62B918CED851541",
    search_type: "shopping",
    location: "Brazil",
    q: produto
  }

  const obterPrecos = () =>{
    axios.get('https://api.scaleserp.com/search', {params})
    .then(response => {
      console.log(response.data.shopping_results)
      return response
    })
    .then(response => {
      setPrecos(response.data.shopping_results)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={styles.backgroundImage}>
    <View style={{ height: "90%" }}>
        <Text style={{ color: 'white', fontSize: 50, marginLeft: 'auto', marginRight: 'auto' }}>Filtros</Text>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={{ fontSize: 25, margin: 10, marginBottom: 0 }}
            placeholder="Digite o produto"
            value={produto}
            onChangeText={capturarProduto}
          />

          <TouchableOpacity
            style={[styles.botaoProximo, { margin: 7, padding: 7, marginTop: 0 }]}
            onPress={obterPrecos}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Pesquisar</Text>
          </TouchableOpacity>
        </View>

        <FlatList style={estilo.lista}
          data={precos}
          renderItem={p => (
            <CartaoProdutos precos={p.item} />
          )}
        />
      </View>
      <Rodape telas={{ anterior: 'Selecionados', proxima: 'Recomendados' }} />
    </ImageBackground>
);
}

const estilo = StyleSheet.create({
  area: {
    padding: 5
  },
  lista: {
    textAlign: "center"
  }
});

export default FiltrosTela

{/* <Text style={{color: 'white', fontSize: 15, marginLeft:'auto', marginRight: 'auto'}}>titulo: {titulo}</Text>
<Image style={{height: 150, width: 150, marginLeft:'auto', marginRight: 'auto'}}
source={{uri: imagem}}
/>
<Text 
  style={{padding: 5, backgroundColor: 'green', color: 'black', fontSize: 25, marginLeft:'auto', marginRight: 'auto'}}
  onPress={() => { 
    Linking.openURL(link); 
  }}
  > 
   Comprar 
</Text> */}