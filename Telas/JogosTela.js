import React, {useState} from 'react';
import styles, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert } from 'react-native';
import Cartao from '../Componentes/Cartao'
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
    }
    else{
      Alert.alert("Por favor, digite o nome de um jogo")
    }


    if (listaProcurados.length === 0) {
      Alert.alert("Nenhum jogo encontrado", "Por favor tente pesquisa de outra maneira")
    }
  }

  return (
      <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={styles.backgroundImage}>
        <View style={styles.conteudoTela}>
          <View>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 19, marginLeft: '15%', marginRight: '15%' }}>Selecione os jogos que você deseja jogar!</Text>
            <TextInput
              style={{color: 'white', fontSize: 25, borderBottomWidth: 1, marginBottom: 10, borderColor: 'white'}}
              placeholder="Digite o jogo"
              placeholderTextColor="#cccccc"
              value={jogo}
              onChangeText={capturarJogo}
            />

            <TouchableOpacity
              style={[styles.botaoPadrao, {padding: 7, marginBottom: 10 }]}
              onPress={pesquisa}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Pesquisa</Text>
            </TouchableOpacity>
          </View>
          {
            listaJogos.length === 0?
            <FlatList
            // horizontal={true}
            data={lista}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={j => (
              <Cartao jogo={j.item} />
            )}
            />
            :
            <FlatList
            // horizontal={true}
            data={listaJogos}
            numColumns={2}
            keyExtractor={item => item.id_jogo_steam}
            renderItem={j => (
              <Cartao jogo={j.item} />
            )}
            />
          }
        </View>
        <Rodape telas={{ proxima: 'Selecionados' }} />
      </ImageBackground>
  );
}


export default JogosTela;


const stylesJ = StyleSheet.create({
  tab:{
    flexDirection: "row",
    marginLeft:'auto', 
    marginRight: 'auto', 
    marginTop: 25, 
    marginBottom: 10,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },

  botaoJogos: {
    backgroundColor: 'black',
    alignItems: "center",
    width: '45%', 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  
  botaoProgramas: {
    backgroundColor: 'white',
    alignItems: "center",
    width: '45%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },

  botaoProximo:{
    width: '100%',
  }

})