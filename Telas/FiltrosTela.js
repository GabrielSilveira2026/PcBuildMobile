import api from '../Services/httpservices';
import React, { useState, useEffect,  } from 'react';
import {SafeAreaView , TextInput, FlatList, Linking , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles';
import PrecosItem from '../Services/PrecosItem'

const image = require('../Imagens/Fundo.png');

const FiltrosTela = ({navigation}) => {
  const [produto, setProduto] = useState('')
  const capturarProduto = (produtoDigitada) => {
    setProduto(produtoDigitada)
  }

  const [precos, setPrecos] = useState([])

  const params = {
    api_key: "7D464447DADD4803BB5CB37440920B14",
    search_type: "shopping",
    location: "Brazil",
    q: produto
  }

  const obterPrecos = () =>{
    api.get('https://api.scaleserp.com/search', {params})
    .then(response => {
      console.log(response.data.shopping_results)
      return response
    })
    .then(response => {
      // console.log(JSON.stringify(response, 0, 2));
      setPrecos(response.data.shopping_results)
      // console.log(precos);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>Filtros</Text>
          <TextInput
            style={styles.produtoTextInput}
            placeholder="Digite o produto"
            value={produto}
            onChangeText={capturarProduto}
            />
          <Button
            title="Pesquisar"
            onPress={obterPrecos}
          />
          <SafeAreaView style={estilo.area}>
            <FlatList style={estilo.lista}
              data={precos}
              renderItem={p => (
                <PrecosItem precos={p.item}/>
              )}
            />
          </SafeAreaView>

        </ImageBackground>
      </SafeAreaView>

      <SafeAreaView style={styles.rodape}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Selecionados')}
        >
          <Text style={{color: 'black'}}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoProximo}
          onPress={() => navigation.navigate('Recomendados')}
        >
          <Text style={{color: 'white'}}>Proxima</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
);
}

const estilo = StyleSheet.create({
  area: {
    padding: 5
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
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