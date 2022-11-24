import React, { useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import CartaoPc from '../Componentes/CartaoPc'
import {calculaPlacaBackEnd, calculaRam, extraiRequisitosDeUmaLista} from '../Services/httpservices'
import {useCart} from '../Constantes/CartContext'
import {FontAwesome5} from 'react-native-vector-icons';

const RecomendadosTela = ({route, navigation}) => {
  const precoFiltro = route.params
  const selecionados = useCart()
  const [carrega, setCarrega] = useState(true)
  const [pcMinimo, setPcMinimo] = useState([])
  const [pcRecomendado, setPcRecomendado] = useState([])
  const reqs = extraiRequisitosDeUmaLista(selecionados.cart) // usar .listaRequisitos

  /*
    configuracoes[
      {tipo:minimo, pecas[gpu:{}]},
      {tipo:recomendado, pecas[gpu:{}]},
    ]
  */
  useEffect(()=>{
    async function montaPC(){
      // console.log(await calculaPlacaBackEnd(selecionados.cart, 'recomendados'));
      let gpu = await calculaPlacaBackEnd(selecionados.cart, 'minimos')
      gpu?
          setPcMinimo([gpu])
      :
        setCarrega(false)


      gpu = await calculaPlacaBackEnd(selecionados.cart, 'recomendados')

      gpu?
        setPcRecomendado([gpu])
      :
        setCarrega(false)
      
    }
    montaPC()
    return()=>{
      setCarrega() 
      setPcRecomendado() 
      setPcMinimo()
    }
  },[])

  // const pcRecomendado=[
  //   {
  //     "title": "Processador Amd Ryzen 5 5600 3.5Ghz (4.4GHz Turbo) Am4",
  //     "id": "14541321093222037555",
  //     "link": "https://www.google.com/shopping/product/14541321093222037555",
  //     "price_raw": "R$ 999,01",
  //     "merchant": "Pichau",
  //     "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4qyvzS6QQ3TP_1bTwRKo9A5D-9PndIS9Jv0fQ1_u3hnIKBkDy7XnJLir1xq-V6O7zd9Zt1jJt0xQ_caF9oaqDzvsoodfUrsjFOIktED-0A3eIOQIyptPE&usqp=CAE",
  //   },
  //   {
  //     "title": "Placa De Vídeo Msi Geforce RTX 2060 6gb Ventus Gp Oc GDDR6 - 912-V375-808",
  //     "id": "17368229848816949007",
  //     "link": "https://www.google.com/shopping/product/17368229848816949007",
  //     "price_raw": "R$ 1.659,98",
  //     "merchant": "Pichau",
  //     "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTdPZkMfH1nwiyaaFZcXEPWETDX3Oy6ChbsugPWsLYimCI5EkQ4zCWPHzLov86Wr6tSjP-nimlk9hgxNi5-qdOzWZlLEWjeo72TGVQH7NSfyc9KcM8Th6Y4hQ&usqp=CAE",
  //   },
  // ]
  // const pcMinimo=[
  //   {
  //     "title": "Processador Amd Ryzen 3 5600 3.5Ghz (4.4GHz Turbo) Am4",
  //     "id": "14541321093222037555",
  //     "link": "https://www.google.com/shopping/product/14541321093222037555",
  //     "price_raw": "R$ 999,01",
  //     "merchant": "Pichau",
  //     "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4qyvzS6QQ3TP_1bTwRKo9A5D-9PndIS9Jv0fQ1_u3hnIKBkDy7XnJLir1xq-V6O7zd9Zt1jJt0xQ_caF9oaqDzvsoodfUrsjFOIktED-0A3eIOQIyptPE&usqp=CAE",
  //   },
  //   {
  //     "title": "Placa De Vídeo Msi Geforce RTX 1060 6gb Ventus Gp Oc GDDR6 - 912-V375-808",
  //     "id": "17368229848816949007",
  //     "link": "https://www.google.com/shopping/product/17368229848816949007",
  //     "price_raw": "R$ 1.659,98",
  //     "merchant": "Pichau",
  //     "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTdPZkMfH1nwiyaaFZcXEPWETDX3Oy6ChbsugPWsLYimCI5EkQ4zCWPHzLov86Wr6tSjP-nimlk9hgxNi5-qdOzWZlLEWjeo72TGVQH7NSfyc9KcM8Th6Y4hQ&usqp=CAE",
  //   },
  //   {
  //     "title": "Memória Kingston 8gb Ddr4 3200mhz Fury Beast Rgb KF432C16BBA/8",
  //     "id": "9586862228788569367",
  //     "link": "https://www.google.com/shopping/product/9586862228788569367",
  //     "price_raw": "R$ 243,00",
  //     "merchant": "KaBuM!",
  //     "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSaxY0kC6qgpcUGhn2Xdgz_y3ru9aDRundtlux7l_nJwWdlG_0pavvbQMsybotg9pkburOyf9AbgYZEjvOdg-zWb0_ogK3GlZ_CHGrsJeZNQbgj5tDkcyh5Hg&usqp=CAE",
  //     "position": 1,
  //     "has_product_page": true
  //   },
  // ]
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
        <ScrollView style={{width: '100%',paddingLeft:5, paddingRight:5}}>
          <Text style={styles.titulo}>Recomendamos esses Pcs, agora basta escolher!</Text>
          {
            pcMinimo?.length?
            <>
              {
                reqs.listaJogosSemRequisitos.length>0?
                  <Text style={styles.txtCalculo}>Os seguintes Jogos não foram considerados no cálculo pois não possuem requisitos listados: {'\n'+ reqs.listaJogosSemRequisitos.map( item => {return '\n'+item})}</Text>
                :
                null
              }
              {pcMinimo? <CartaoPc pc={{pecas: pcMinimo,tipo: 'Mínima'}}/>: null}
              {pcRecomendado?.length>0? <CartaoPc pc={{pecas: pcRecomendado, tipo: 'Recomendada'}}/> :
              <ActivityIndicator animating={carrega} style={{marginTop:'auto',marginBottom:'auto'}} size={20} color={Cores.primary}/>
              }
              
            </>
            :
            carrega?
              <ActivityIndicator style={{marginTop:'auto',marginBottom:'auto'}} size={60} color={Cores.primary}/>
            :
              <Text style={styles.txtCalculo}>Não foi possível realizar o cálculo pois os jogos selecionados não possuem requisitos listados</Text>
          }
        </ScrollView>
      </View>
      <Rodape telas={{ anterior: 'Filtros'}} />
    </ImageBackground>
);
}

export default RecomendadosTela

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    marginBottom: 10
  },
  carregando: {
    marginTop:'50%', 
    textAlign: 'center',
    color: 'white',
  },
  txtCarregando: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    margin:40
  },
  txtCalculo:{
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    borderWidth: 1,
    borderRadius:6,
    padding:5,
    borderColor: 'red',
  }
})