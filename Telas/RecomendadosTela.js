import React, { useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import CartaoPc from '../Componentes/CartaoPc'
import {calculaPlacaBackEnd, calculaRam, extraiRequisitosDeUmaLista} from '../Services/httpservices'
import {useCart} from '../Constantes/CartContext'
import axios from 'axios'
const RecomendadosTela = ({route, navigation}) => {
  const precoFiltro = route.params
  const selecionados = useCart()
  const [carrega, setCarrega] = useState(true)
  const [pcMinimo, setPcMinimo] = useState([])
  const [pcRecomendado, setPcRecomendado] = useState([])
  const reqs = extraiRequisitosDeUmaLista(selecionados.cart) // usar .listaRequisitos
  useEffect(()=>{
    async function montaPC(){
      let pc

      console.log(reqs);

      try {
        if (reqs.listaRequisitosMinimos.length) {
          pc = await axios.post("http://144.22.197.132/montaPc", {requisitos:reqs.listaRequisitosMinimos});
          let {placa, ram, rom} = pc.data
          setPcMinimo([placa,ram,rom])
        }
        else{
          setCarrega(false)
        }
      } catch (error) {
        setCarrega(false)
      } 

      try {
        if (reqs.listaRequisitosRecomendados.length) {
          pc = await axios.post("http://144.22.197.132/montaPc", {requisitos:reqs.listaRequisitosRecomendados}); 
          let {placa, ram, rom} = pc.data
          setPcRecomendado([placa,ram,rom])
        }
        else{
          setCarrega(false)
        }
      } catch (error) {
        setCarrega(false)
      } 
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
                pcMinimo && reqs.listaJogosSemRequisitosMinimos?.length && pcRecomendado?.length && reqs.listaJogosSemRequisitosRecomendados?.length?
                <Text style={styles.txtCalculo}>Os seguintes Jogos podem não terem sidos considerados no cálculo pois não possuem requisitos completos: {'\n'+ reqs.listaJogosSemRequisitosRecomendados.map( item => {return '\n'+item})}</Text>
                :
                pcMinimo && reqs.listaJogosSemRequisitosMinimos?.length?
                  <Text style={styles.txtCalculo}>Os seguintes Jogos podem não terem sidos considerados no cálculo de configuração Mínima pois não possuem requisitos completos: {'\n'+ reqs.listaJogosSemRequisitosMinimos.map( item => {return '\n'+item})}</Text>
                :
                pcRecomendado?.length && reqs.listaJogosSemRequisitosRecomendados?.length?
                <Text style={styles.txtCalculo}>Os seguintes Jogos podem não terem sidos considerados no cálculo de configuração Recomendada pois não possuem requisitos completos: {'\n'+ reqs.listaJogosSemRequisitosRecomendados.map( item => {return '\n'+item})}</Text>
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