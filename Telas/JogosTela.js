import React, {useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert } from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import CartaoJogo from '../Componentes/CartaoJogo'
import Rodape from '../Componentes/Rodape'
import axios from 'axios';
import lista from '../Dados/jogos.json'


const JogosTela = ({navigation}) => {

  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitada) => {setJogo(jogoDigitada)}
  const listaProcurados = []
  const [listaJogos, setListaJogos] = useState([])

  const pesquisa = async() => {
    if (jogo !== "") {
      const response = await axios.get("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/jogo_tb/?limit=9999")
      for(var i = 0; i < response.data.items.length; i++){
        if(response.data.items[i].nome.toLowerCase().includes(jogo.toLowerCase())){
          let dadosJogo = response.data.items[i]
          let {id_jogo_steam, nome, imagem, requisitosminimos, requisitosrecomendados, preco} = dadosJogo
          const copiaJogo = {
            id_jogo_steam, 
            nome, 
            imagem, 
            requisitosminimos, 
            requisitosrecomendados, 
            preco,
            estado: 'circle'
          }
          listaProcurados.push(copiaJogo)
        }
      }
      setListaJogos(listaProcurados)
      if (listaProcurados.length === 0) {
        Alert.alert("Nenhum jogo encontrado", "Por favor, tente pesquisar de outra maneira")
        setListaJogos('')
      }
    }
    // else{
    //   Alert.alert("Nenhum jogo Digitado","Por favor, digite o nome de um jogo")
    //   setListaJogos('')
    // }
  }

  return (
    <ImageBackground source={imagemFundo} resizeMode="stretch"  backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>

        <Text style={styles.titulo}>Selecione até 3 jogos que você deseja jogar!</Text>

        <View style={styles.pesquisa}>
          <TextInput
            style={styles.input}
            placeholder="Digite o jogo"
            placeholderTextColor="#cccccc"
            value={jogo}
            onChangeText={capturarJogo}
          />
          <TouchableOpacity
            onPress={pesquisa}
          >
            <FontAwesome5 style={styles.botaoPesquisa} name="search" size={30} color="white"/>
          </TouchableOpacity>

        </View>

        {
          listaJogos.length === 0 ?
            <FlatList
              // horizontal={true}
              data={lista}
              numColumns={2}
              keyExtractor={item => item.id_jogo_steam}
              renderItem={j => (
                <CartaoJogo jogo={j.item} />
              )}
            />
            :
            <FlatList
              // horizontal={true}
              data={listaJogos}
              numColumns={2}
              keyExtractor={item => item.id_jogo_steam}
              renderItem={j => (
                <CartaoJogo jogo={j.item} />
              )}
            />
        }

      </View>
      <Rodape telas={{proxima: 'Selecionados' }} />
    </ImageBackground>
  );
}


export default JogosTela;

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center', 
    fontSize: 20,
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
    padding: 7, 
    marginLeft: 8,
    marginBottom: 10
  }

})