// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles';
import api from '../Services/httpservices';
const image = require('../Imagens/Fundo.png');

const FiltrosTela = ({navigation}) => {

  const [peca, setPeca] = useState();

  useEffect(() => {
    api
      .get("5600g")
      .then((response) => setPeca(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

{
//   const axios = require('axios');

// // set up the request parameters
//   const params = {
//     api_key: "B9E7BDF7D3024533B62B918CED851541",
//     location: "Brazil",
//     search_type: "shopping",
//     q: "5600g"
//   }
  
//   // make the http GET request to Scale SERP
//   axios.get('https://api.scaleserp.com/search', { params })
//     .then(response => {
//       // print the JSON response from Scale SERP
//       return JSON.stringify(response.data.shopping_results[0].title, 0, 2);

//     }).catch(error => {
//       // catch and print the error
//       console.log(error);
//     });
}

  return (
    <SafeAreaView style={styles.tela}>
      <SafeAreaView style={styles.conteudo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>Filtros</Text>
        <Text style={{color: 'white', fontSize: 50, marginLeft:'auto', marginRight: 'auto'}}>titulo: {peca?.shopping_results[0].title}</Text>
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

export default FiltrosTela
