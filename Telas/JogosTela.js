import {useState} from 'react';
import {SafeAreaView, TextInput, FlatList, Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'
import axios from "axios";
import JogosItem from '../Services/JogosItem'

const image = require('../Imagens/Fundo.png');

const JogosTela = ({navigation}) => {
  
  const lista = [
    { 
      imagem: '',
      id: 1,
      nome: "teste",
      preco: "R$150"
    },
    { 
      imagem: '',
      id: 2,
      nome: "teste2",
      preco: "R$250"
    },
    { 
      imagem: '',
      id: 3,
      nome: "teste3",
      preco: "R$350"
    },
    { 
      imagem: '',
      id: 4,
      nome: "teste4",
      preco: "R$450"
    }
  ]

  const selecionados = []
  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitada) => {setJogo(jogoDigitada)}
  const listaProcurados = []
  const [listaJogos, setListaJogos] = useState([])

  const pesquisa = () => {
    axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
    .then(response => {
      for(var i = 0; i < response.data.applist.apps.length; i++){
        if(response.data.applist.apps[i].name.includes(jogo)){
          // console.log( "Achou na lista " + listaJogos[i].name, listaJogos[i].appid, listaJogos[i].type)
          // pesquisaSteam(response.data.applist.apps[i].appid)
          const jogoPesquisado= response.data.applist.apps[i].appid
          axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado)
          .then(response => {
            const dados = response.data[jogoPesquisado].data
            if (dados?.type === "game") {
              const x = {
                id: dados.steam_appid,
                nome: dados.name, 
                image: dados.header_image,
                // requisitosMinimos: dados.pc_requirements.minimum,
                // requisitosRecomendados: dados.pc_requirements.recommended,
                preco: dados?.price_overview?.final_formatted
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
      }
    })
  }

  const imprime = () =>{
    console.log("SELECIONADOS PELO BOTÃO")
    console.log(JSON.stringify(selecionados, 0, 5));
  }

  return (
      <SafeAreaView style={styles.tela}>
        {/* Conteudo da Tela */}
        <View style={styles.conteudo}>
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

          <View>
            <TextInput
              placeholder="Digite o jogo"
              value={jogo}
              onChangeText={capturarJogo}
              />

            <TouchableOpacity 
              style={styles.botaoProximo}
              onPress={pesquisa}
              >
              <Text style={{color: 'white'}}>Pesquisa</Text>
            </TouchableOpacity>


            <TouchableOpacity 
              style={styles.botaoProximo}
              onPress={imprime}
              >
              <Text style={{color: 'white'}}>Imprimir</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={lista}
              renderItem={j => (
                <JogosItem jogo={j.item} />
              )}
            />
          </View>
            
          </ImageBackground>
        </View>

        {/* Rodapé com botões */}
        <View style={styles.rodape}>
          <TouchableOpacity 
            style={styles.botaoProximo}
            onPress={() => navigation.navigate('Selecionados')}
          >
            <Text style={{color: 'white'}}>Proxima</Text>
          </TouchableOpacity>
        </View>
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