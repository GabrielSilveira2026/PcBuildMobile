import React, { useState, useEffect,  } from 'react';
import {SafeAreaView, TextInput, FlatList, Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'
import axios from "axios";
import JogosItem from '../Services/JogosItem'
import { createIconSetFromFontello } from 'react-native-vector-icons';

const image = require('../Imagens/Fundo.png');

const JogosTela = ({navigation}) => {
  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitada) => {
    setJogo(jogoDigitada)
  }

  const [listaJogos, setListaJogos] = useState([])
  
  const listaProcurados = []

  const pesquisa = () => {
    axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
    .then(response => {
      for(var i = 0; i < response.data.applist.apps.length; i++){
        if(response.data.applist.apps[i].name.includes(jogo)){
          // console.log( "Achou na lista " + listaJogos[i].name, listaJogos[i].appid, listaJogos[i].type)
          pesquisaSteam(response.data.applist.apps[i])
        }
      }
    })
  }
 
  const pesquisaSteam = (jogoPesquisado) => {
    axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado.appid)
      .then(response => {
        const dados = response.data[jogoPesquisado.appid].data
        if (dados?.type === "game") {
          const x = {
            name: dados.name, 
            image: dados.header_image
          }
          listaProcurados.push(x)
          setListaJogos(listaProcurados)
          // console.log("Adicionado no Lista procurado: " + dados.name + " - " + dados.steam_appid + " - " + dados.type)
          console.log("LISTA PROCURADOS:" , JSON.stringify(listaProcurados, 0, 2));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  const imprime = () =>{
    console.log("IMPRESSO PELO BOTÃO")
    console.log(JSON.stringify(listaJogos));
  }

  return (
      <SafeAreaView style={styles.tela}>
        {/* Conteudo da Tela */}
        <SafeAreaView style={styles.conteudo}>
          <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          {/* Tab jogos/programas */}
          <SafeAreaView style={stylesJ.tab}>
            <TouchableOpacity style={stylesJ.botaoJogos} onPress={() => navigation.navigate('Jogos')}>
              <Text style={{color: 'white', fontSize: 25}}>Jogos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={stylesJ.botaoProgramas} onPress={() => navigation.navigate('Programas')}>
              <Text style={{color: 'black', fontSize: 25}}>Programas</Text>
            </TouchableOpacity>

          </SafeAreaView>

          <Text style={{textAlign: 'center', color: 'black', fontSize: 19, marginLeft:'15%', marginRight: '15%'}}>Escolha os jogos que você deseja jogar!</Text>

          <TextInput
            placeholder="Digite o jogo"
            value={jogo}
            onChangeText={capturarJogo}
          />

          <Button title="teste" onPress={pesquisa}/>

          <Button title="imprime" onPress={imprime}/>

            <FlatList
              data={listaJogos}
              renderItem={j => (
                <JogosItem jogo={j.item}/>
              )}
            />
            
          </ImageBackground>
        </SafeAreaView>

        {/* Rodapé com botões */}
        <SafeAreaView style={styles.rodape}>
          <TouchableOpacity 
            style={styles.botaoProximo}
            onPress={() => navigation.navigate('Selecionados')}
          >
            <Text style={{color: 'white'}}>Proxima</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
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