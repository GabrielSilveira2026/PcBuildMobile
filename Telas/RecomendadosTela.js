import React, { useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import CartaoPc from '../Componentes/CartaoPc'
import {extraiRequisitosDeUmaLista} from '../Services/httpservices'

const RecomendadosTela = ({route, navigation}) => {
  const precoFiltro = route.params
  const pcRecomendado=[
    {
      "title": "Processador Amd Ryzen 5 5600 3.5Ghz (4.4GHz Turbo) Am4",
      "id": "14541321093222037555",
      "link": "https://www.google.com/shopping/product/14541321093222037555",
      "price_raw": "R$ 999,01",
      "merchant": "Pichau",
      "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4qyvzS6QQ3TP_1bTwRKo9A5D-9PndIS9Jv0fQ1_u3hnIKBkDy7XnJLir1xq-V6O7zd9Zt1jJt0xQ_caF9oaqDzvsoodfUrsjFOIktED-0A3eIOQIyptPE&usqp=CAE",
    },
    {
      "title": "Placa De Vídeo Msi Geforce RTX 2060 6gb Ventus Gp Oc GDDR6 - 912-V375-808",
      "id": "17368229848816949007",
      "link": "https://www.google.com/shopping/product/17368229848816949007",
      "price_raw": "R$ 1.659,98",
      "merchant": "Pichau",
      "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTdPZkMfH1nwiyaaFZcXEPWETDX3Oy6ChbsugPWsLYimCI5EkQ4zCWPHzLov86Wr6tSjP-nimlk9hgxNi5-qdOzWZlLEWjeo72TGVQH7NSfyc9KcM8Th6Y4hQ&usqp=CAE",
    }
  ]
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 22, marginLeft: '5%', marginRight: '5%', marginTop: 25, marginBottom: 10 }}>Recomendamos esses Pcs, agora basta escolher!</Text>

        <CartaoPc pc={{pecas: '',tipo: 'Mínima'}}/>

        <CartaoPc pc={{pecas: pcRecomendado, tipo: 'Recomendada'}}/>


      </View>
      <Rodape telas={{ anterior: 'Filtros'}} />
    </ImageBackground>
);
}

export default RecomendadosTela

const stylesRecomendados = StyleSheet.create({

})