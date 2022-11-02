import React, {useState} from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert } from 'react-native';
import Cartao from '../Componentes/Cartao'
import Rodape from '../Componentes/Rodape'
import {useCart} from '../Constantes/CartContext'
import axios from 'axios';

const image = require('../Imagens/Fundo.png');

const JogosTela = ({navigation}) => {
  // const html = '<strong>Mínimos:</strong><br><ul class=\"bb_ul\"><li>Requer um processador e sistema operacional de 64 bits<br></li><li><strong>SO:</strong> Windows 10 64-bits<br></li><li><strong>Processador:</strong> Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz<br></li><li><strong>Memória:</strong> 8 GB de RAM<br></li><li><strong>Placa de vídeo:</strong> Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)<br></li><li><strong>DirectX:</strong> Versão 12<br></li><li><strong>Armazenamento:</strong> 100 GB de espaço disponível</li></ul>'
  // const json = parse(html)
  // console.log('JSON EM KRL', json)

  const selecionados = useCart()

  const lista = [
    { 
      imagem: "https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg?t=1659711071",
      id: 1,
      nome: "Horizon Zero Dawn™ Complete Edition",
      preco: "R$200"
    },
    { 
      imagem: 'https://cdn.akamai.steamstatic.com/steam/apps/414340/header.jpg?t=1661444431',
      id: 2,
      nome: "Hellblade: Senua's Sacrifice",
      // preco: "R$150"
    },
    { 
      imagem: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg?t=1650554420',
      id: 3,
      nome: "God of War",
      preco: "R$200"
    },
    { 
      imagem: 'https://cdn.akamai.steamstatic.com/steam/apps/1172380/header.jpg?t=1650554420',
      id: 4,
      nome: "STAR WARS Jedi: Fallen Order",
      preco: "R$150"
    }
  ]

  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitada) => {setJogo(jogoDigitada)}
  const listaProcurados = []
  const [listaJogos, setListaJogos] = useState([])

  // const pesquisa = () => {
  //   if (jogo !== "") {
  //     axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
  //     .then(response => {
  //       for(var i = 0; i < response.data.applist.apps.length; i++){
  //         if(response.data.applist.apps[i].name.toLowerCase().includes(jogo.toLowerCase())){
  //           // console.log( "Achou na lista " + listaJogos[i].name, listaJogos[i].appid, listaJogos[i].type)
  //           // pesquisaSteam(response.data.applist.apps[i].appid)
  //           const jogoPesquisado= response.data.applist.apps[i].appid
  //           axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado)
  //           .then(response => {
  //             const dados = response.data[jogoPesquisado]?.data
  //             if (dados?.type === "game") {
  //               const x = {
  //                 id: dados.steam_appid,
  //                 nome: dados.name, 
  //                 imagem: dados.header_image,
  //                 // requisitosMinimos: dados.pc_requirements.minimum,
  //                 // requisitosRecomendados: dados.pc_requirements.recommended,
  //                 preco: dados?.price_overview?.final_formatted,
  //                 estado: "toggle-off"
  //               }
  //               listaProcurados.push(x)
  //               setListaJogos(listaProcurados)
  //               // console.log("Adicionado no Lista procurado: " + dados.name + " - " + dados.steam_appid + " - " + dados.type)
  //               console.log("LISTA PROCURADOS:" , JSON.stringify(listaProcurados, 0, 2));
  //             }
  //           })
  //           .catch(error => {
  //             console.log(error);
  //           });
  //         }
  //       }
  //     })
  //   }
  //   else {
  //     Alert.alert("Por favor, digite o nome de um jogo")
  //   }
  // }

  const fazConsulta = async() => {
    const resposta = await axios.get("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_jogo/")
    console.log(resposta?.data?.items[0])
    listaProcurados.push(resposta?.data?.items[0])
    console.log(listaProcurados)
    setListaJogos(listaProcurados)
  }

  const imprime =()=>{console.log("teste", listaJogos)}
  return (
    <ImageBackground source={image} resizeMode="stretch" style={styles.backgroundImage}>
      <View style={{ height: "90%" }}>
        <View>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 19, marginLeft: '15%', marginRight: '15%' }}>Escolha os jogos que você deseja jogar!</Text>
          <TextInput
            style={{ fontSize: 25, margin: 10, marginBottom: 0, borderBottomWidth: 1, marginBottom: 10 }}
            placeholder="Digite o jogo"
            value={jogo}
            onChangeText={capturarJogo}
          />

          <TouchableOpacity
            style={[styles.botaoProximo, { margin: 7, padding: 7, marginTop: 0 }]}
            onPress={fazConsulta}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Pesquisa</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.botaoProximo, { margin: 7, padding: 7, marginTop: 0 }]}
            onPress={imprime}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Imprime</Text>
          </TouchableOpacity> */}
        </View>

        <FlatList
          data={lista}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={j => (
            <Cartao jogo={j.item} />
          )}
        />
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