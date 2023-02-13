import React, {useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert,ActivityIndicator, Keyboard} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import CartaoJogo from '../Componentes/CartaoJogo'
import Rodape from '../Componentes/Rodape'
import lista from '../Dados/jogos.json';
import {useCart} from '../Constantes/CartContext'
import {consultaBanco} from '../Services/httpservices'


const JogosTela = ({navigation}) => {
  const selecionados = useCart()
  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitado) => {setJogo(jogoDigitado)}
  const [listaJogos, setListaJogos] = useState(lista)
  const listaAuxiliar = []

  const pesquisa = async() => {
    Keyboard.dismiss()
    let regex = /[^0-9a-zA-Z]/gm
    if (jogo !== "") {
      setListaJogos()
      for (let offset = 0; offset < 150000; offset+=10000) {
        const response = await consultaBanco(offset)
        for(var i = 0; i < response.data.items.length; i++){
          if(response.data.items[i]?.nome?.replace(regex,"").toLowerCase().includes(jogo.replace(regex,"").toLowerCase())){
            let dadosJogo = response?.data?.items[i]
            let jogoEstaSelecionado = selecionados.cart.find(jogo => jogo.id_jogo_steam === dadosJogo.id_jogo_steam)
            dadosJogo.estado = jogoEstaSelecionado?'check-circle': 'circle'
            listaAuxiliar.push(dadosJogo)
          }
        }
      }
      setListaJogos(listaAuxiliar)
      if (listaAuxiliar.length === 0) {
        setListaJogos(lista)
        Alert.alert("Nenhum jogo encontrado", "Por favor, tente pesquisar de outra maneira")
      }
    }
    else{
      setListaJogos(lista)
    }
  }

  return (
    <ImageBackground source={imagemFundo} resizeMode="stretch"  backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
        
        <FlatList
          keyboardShouldPersistTaps='handled'
          style={{width: '100%'}}
          ListHeaderComponent={
          <>
            <Text style={styles.titulo}>Selecione até { 5 - selecionados.cart.length} jogos que você deseja jogar!</Text>

            <View style={styles.pesquisa}>
              <TextInput
                style={styles.input}
                placeholder="Digite o jogo"
                placeholderTextColor="#cccccc"
                value={jogo}
                onChangeText={capturarJogo}
                onSubmitEditing={pesquisa}
              />
              <TouchableOpacity
                onPress={pesquisa}
              >
                <FontAwesome5 style={styles.botaoPesquisa} name="search" size={30} color="white"/>
              </TouchableOpacity>

            </View>
          </> 
          }
          data={listaJogos}
          ListEmptyComponent={<ActivityIndicator style={{marginTop:80,marginBottom:'auto'}} size={60} color={Cores.primary}/>}
          numColumns={2}
          keyExtractor={item => item.id_jogo_steam}
          renderItem={j => (
            <CartaoJogo jogo={j.item} />
          )}
        />

      </View>
      <Rodape telas={{proxima: 'Selecionados', txtProxima: selecionados.cart.length>0 ? 'Confirmar '+'('+selecionados.cart.length+')':'Confirmar'}}/>
    </ImageBackground>
  );
}


export default JogosTela;

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center', 
    fontSize: 25,
    color: 'white', 
    marginBottom: 15
  },
  pesquisa:{
    flexDirection: 'row',
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 5,
  },
  input: {
    flexGrow:1,
    color: 'white',
    fontSize: 25,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: 'white'
  },
  botaoPesquisa:{
    width: 'auto', 
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 7,
    padding: 10, 
    marginLeft: 5,
    marginBottom: 10
  }

})