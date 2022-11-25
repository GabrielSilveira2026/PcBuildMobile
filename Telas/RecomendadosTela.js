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

  useEffect(()=>{
    async function montaPC(){
      // console.log(await calculaPlacaBackEnd(selecionados.cart, 'recomendados'));
      let gpu = await calculaPlacaBackEnd(selecionados.cart, 'minimos')
      gpu?
          setPcMinimo([
            {
              "title": "Processador Amd Ryzen 5 5600 3.5Ghz (4.4GHz Turbo) Am4",
              "id": "14541321093222037555",
              "link": "https://www.google.com/shopping/product/14541321093222037555",
              "price_raw": "R$ 999,01",
              "merchant": "Pichau",
              "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4qyvzS6QQ3TP_1bTwRKo9A5D-9PndIS9Jv0fQ1_u3hnIKBkDy7XnJLir1xq-V6O7zd9Zt1jJt0xQ_caF9oaqDzvsoodfUrsjFOIktED-0A3eIOQIyptPE&usqp=CAE",
            },
            gpu,
            {
              "title": "Memória Kingston 8gb Ddr4 3200mhz Fury Beast Rgb KF432C16BBA/8",
              "id": "9586862228788569367",
              "link": "https://www.google.com/shopping/product/9586862228788569367",
              "rating": 5,
              "reviews": 59,
              "merchant_count": 10,
              "price_raw": "R$ 209,99",
              "merchant": "KaBuM!",
              "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRd4hI8mxaRZrohEmSNW6FFyL4WU1VOJTXvgHCFC_Z_WyZ_1qTFZ2NhnMaf9fG-00wUUA8PNTcJWZ4pAs2VR0Fq97hcS1R5F0k1-M-Ju589hVIjcRM-AQ-_&usqp=CAE",
              "position": 1,
            }
          ])
      :
        setCarrega(false)


      gpu = await calculaPlacaBackEnd(selecionados.cart, 'recomendados')

      gpu?
        setPcRecomendado([
          {
            "title": "Processador Amd Ryzen 5 5600 3.5Ghz (4.4GHz Turbo) Am4",
            "id": "14541321093222037555",
            "link": "https://www.google.com/shopping/product/14541321093222037555",
            "price_raw": "R$ 999,01",
            "merchant": "Pichau",
            "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4qyvzS6QQ3TP_1bTwRKo9A5D-9PndIS9Jv0fQ1_u3hnIKBkDy7XnJLir1xq-V6O7zd9Zt1jJt0xQ_caF9oaqDzvsoodfUrsjFOIktED-0A3eIOQIyptPE&usqp=CAE",
          },
          gpu
        ])
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
              {
                pcMinimo?
                  <CartaoPc pc={{pecas: pcMinimo,tipo: 'Mínima'}}/>
                  : 
                  null}
              {
                pcRecomendado?.length>0? 
                  <CartaoPc pc={{pecas: pcRecomendado, tipo: 'Recomendada'}}/> 
                  :
                  <ActivityIndicator animating={carrega} style={{marginTop:'50%',marginBottom:'50%'}} size={30} color={Cores.primary}/>
              }
              
            </>
            :
            carrega?
              <>
                <ActivityIndicator style={{marginTop:'auto',marginBottom:'auto'}} size={60} color={Cores.primary}/>
                <Text style={styles.txtCarregando}>Já estamos calculando as peças para seus jogos...</Text>
              </>
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