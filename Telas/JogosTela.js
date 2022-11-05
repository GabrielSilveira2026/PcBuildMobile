import React, {useState} from 'react';
import styles, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput, FlatList, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Alert } from 'react-native';
import Cartao from '../Componentes/Cartao'
import Rodape from '../Componentes/Rodape'
import {useCart} from '../Constantes/CartContext'
import axios from 'axios';
import lista from '../Dados/jogos.json'
import {parse} from 'himalaya'
import {pesquisa2} from '../Services/httpservices'
import {render} from 'react-dom'
// const image = require('../Imagens/Fundo2.png');

const JogosTela = ({navigation}) => {
  // {
  // const html2 = "<strong>Mínimos:</strong><br><ul class=\"bb_ul\"><li>Requer um processador e sistema operacional de 64 bits<br></li><li><strong>SO:</strong> Windows 10 64-bits<br></li><li><strong>Processador:</strong> Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz<br></li><li><strong>Memória:</strong> 8 GB de RAM<br></li><li><strong>Placa de vídeo:</strong> Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)<br></li><li><strong>DirectX:</strong> Versão 12<br></li><li><strong>Armazenamento:</strong> 100 GB de espaço disponível</li></ul>"
  // const html = "<strong>Mínimos:</strong><br><ul class=\"bb_ul\"><li><strong>SO:</strong> Windows 7, 8, 10<br></li><li><strong>Processador:</strong> Intel i5 3570K / AMD FX-8350<br></li><li><strong>Memória:</strong> 8 GB de RAM<br></li><li><strong>Placa de vídeo:</strong> GTX 770 with 2GB VRAM / Radeon R9 280X 3GB<br></li><li><strong>DirectX:</strong> Versão 11<br></li><li><strong>Armazenamento:</strong> 30 GB de espaço disponível<br></li><li><strong>Outras observações:</strong> Minimum spec screen resolution: 1280x720</li></ul>"
  // const json = parse(html)

  // const dados = json[2].children
  //   //0 SO, 1 cpu, 2 memoria

  // for (let i = 1; i < dados.length; i++) {
  //   const t = dados[i].children[0].children[0].content
  //   const conteudo = dados[i].children[1].content
  //   console.log(t, " ", conteudo)
  // }
  // }

  const selecionados = useCart()

  const [jogo, setJogo] = useState('')
  const capturarJogo = (jogoDigitada) => {setJogo(jogoDigitada)}
  const listaProcurados = []
  const listaPecas = []
  const [listaJogos, setListaJogos] = useState([])

  const pesquisa = () => {
    if (jogo !== "") {
      axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
      .then(response => {
        for(var i = 0; i < response.data.applist.apps.length; i++){
          if(response.data.applist.apps[i].name.toLowerCase().includes(jogo.toLowerCase())){
            // console.log( "Achou na lista " + listaJogos[i].name, listaJogos[i].appid, listaJogos[i].type)
            // pesquisaSteam(response.data.applist.apps[i].appid)
            const jogoPesquisado= response.data.applist.apps[i].appid
            axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado)
            .then(response => {
              const dados = response.data[jogoPesquisado]?.data
              if (dados?.type === "game") {
                // const reqMinHtml = dados.pc_requirements?.minimum
                // const reqMinJson = parse(reqMinHtml)
                // const dadosReqMin = reqMinJson[2].children
                // for (let i = 1; i < dadosReqMin.length; i++) {
                //   const categoria = dadosReqMin[i].children[0].children[0].content
                //   const peca = dadosReqMin[i].children[1].content
                //   switch (categoria) {
                //     case 'Processor:':
                //       listaPecas.push({Processador: peca});
                //   }
                // }
                // console.log("cpu e ram pra god: ", listaPecas)
                const x = {
                  id: dados.steam_appid,
                  nome: dados.name, 
                  imagem: dados.header_image,
                  // requisitosMinimos: dados.pc_requirements.minimum,
                  // requisitosRecomendados: dados.pc_requirements.recommended,
                  preco: dados?.price_overview?.final_formatted,
                  estado: "circle"
                }
                listaProcurados.push(x)
                setListaJogos(listaProcurados)
                console.log("Adicionado no Lista procurado: " + dados.name + " - " + dados.steam_appid + " - " + dados.type)
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
    else {
      Alert.alert("Por favor, digite o nome de um jogo")
    }
  }

  const fazConsulta = async() => {
    if (jogo !== "") {
      const resposta = await pesquisa2(jogo)
      console.log(resposta)
      if (resposta.length > 0) {
        setListaJogos(resposta)
      }
      else {
        Alert.alert("Nenhum jogo encontrado, por favor tente novamente")
      }
    }
    else{
      Alert.alert("Por favor, digite o nome de um jogo")
    }
  
    // const response = await axios.get("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_jogo/")
    
    // const jogos = response.data.items

    // for(var i = 0; i < response.data.items.length; i++){
    //   if(response.data.items[i].nome.toLowerCase().includes(jogo.toLowerCase())){
    //     let dadosJogo = response.data.items[i]
    //     const x = {
    //       id: dadosJogo.id_jogo_steam,
    //       nome: dadosJogo.nome, 
    //       imagem: dadosJogo.imagem,
    //       estado: 'circle'
    //       // requisitosMinimos: dados.pc_requirements.minimum,
    //       // requisitosRecomendados: dados.pc_requirements.recommended,
    //     }
    //     console.log(x.imagem)
    //     listaProcurados.push(x)
    //     setListaJogos(listaProcurados)
    //   }
    // }
    
    // console.log(resposta?.data?.items[0])
    // listaProcurados.push(resposta?.data?.items[0])
    // console.log(listaProcurados)
    // setListaJogos(listaProcurados)
  }

  const imprime =async()=>{
    const urlGetListaDeIdsJogos = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=json"
    const urlGetDetalhesJogo = "https://store.steampowered.com/api/appdetails?appids="
    const urlPostBd = "https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/jogos_tb/"

      let contador = 0
      let listaIdsENomesJogos = await axios.get(urlGetListaDeIdsJogos)
      for(const objetoJogo of listaIdsENomesJogos.data.applist.apps){
          if(contador <= 199){
              console.log("vou chamar os detalhes do jogo, contador: " + contador)
              let detalhesJogo = await axios.get(urlGetDetalhesJogo + objetoJogo.appid)
              let dadosJogo = detalhesJogo?.data[objetoJogo.appid]?.data
              if(dadosJogo?.type === "game"){
                console.log("achei um do tipo game")
                const reqMinHtml = dadosJogo?.pc_requirements?.minimum
                const reqMinJson = parse(reqMinHtml)
                const dadosReqMin = reqMinJson[2].children
                for (let i = 1; i < dadosReqMin.length; i++) {
                  const categoria = dados[i].children[0].children[0].content
                  switch (categoria){
                    case 'Processador':
                      listaPecas.push(dados[i].children[1].content)
                  }
                  
                  // const conteudo = dados[i].children[1].content
                  // console.log(categoria, " ", conteudo)
                }



                  let jogoDTO = {
                    id_jogo_steam: dadosJogo?.steam_appid,
                    nome: dadosJogo?.name,
                    imagem: dadosJogo?.header_image,
                    requisitosMinimos: dadosJogo?.pc_requirements?.minimum,
                    requisitosRecomendados: dadosJogo?.pc_requirements?.recommended,
                    preco: dadosJogo?.price_overview?.final_formatted
                  }
                  console.log(jogoDTO.nome)
                  try{
                    await axios.post(urlPostBd, {nome: 'test2', imagem: 'foi'})
                  }
                  catch(e){
                      // console.log("Falhei no post BD", e)
                  }
                  
              }  
              contador ++
          }
          else{
              const dataAtualMaisSeisMin = new Date().getTime() + 360000
              while(new Date().getTime() <= dataAtualMaisSeisMin);
              contador = 0
          }                      
      }
  
  }

  return (
      <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={styles.backgroundImage}>
        <View style={{ height: "90%", paddingLeft: 10, paddingRight: 10}}>
          <View>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 19, marginLeft: '15%', marginRight: '15%' }}>Selecione os jogos que você deseja jogar!</Text>
            <TextInput
              style={{color: 'white', fontSize: 25, margin: 10, marginBottom: 0, borderBottomWidth: 1, marginBottom: 10, borderColor: 'white'}}
              placeholder="Digite o jogo"
              placeholderTextColor="#cccccc"
              value={jogo}
              onChangeText={capturarJogo}
            />

            <TouchableOpacity
              style={[styles.botaoPadrao, { margin: 7, padding: 7, marginTop: 0 }]}
              onPress={fazConsulta}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Pesquisa</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.botaoPadrao, { margin: 7, padding: 7, marginTop: 0 }]}
              onPress={imprime}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Tenta popular</Text>
            </TouchableOpacity> */}
          </View>
          {
            listaJogos.length === 0?
            <FlatList
            data={lista}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={j => (
              <Cartao jogo={j.item} />
              )}
              />
            :
            <FlatList
            data={listaJogos}
            numColumns={2}
            keyExtractor={item => item.id}
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