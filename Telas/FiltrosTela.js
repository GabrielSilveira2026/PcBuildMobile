import React, {useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert } from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import Rodape from '../Componentes/Rodape'
import axios from 'axios';

import CartaoProdutos from '../Componentes/CartaoProdutos'

import precosLocal from '../Dados/resultados.json'


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
      setPrecos(response.data.shopping_results)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
          <Text style={{ color: 'white', fontSize: 50}}>Filtros</Text>
          {/* <View style={{ marginBottom: 10 }}>
            <TextInput
              style={{color: 'white', fontSize: 25, margin: 10, marginBottom: 0, borderBottomWidth: 1, marginBottom: 10, borderColor: 'white'}}
              placeholder="Digite o produto"
              placeholderTextColor="#cccccc"
              value={produto}
              onChangeText={capturarProduto}
            />

            <TouchableOpacity
              style={[stylesGlobal.botaoProximo, { margin: 7, padding: 7, marginTop: 0 }]}
              onPress={obterPrecos}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Pesquisar</Text>
            </TouchableOpacity>
          </View> */}

          <FlatList
            data={precosLocal.shopping_results}
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