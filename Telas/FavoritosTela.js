import React , {useState, useEffect, useCallback} from 'react';
import {View , Text, StyleSheet, ImageBackground, FlatList,TouchableOpacity, Dimensions, Alert} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import CartaoProduto from '../Componentes/CartaoProduto'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritosTela = ({navigation}) => {
  const [jogosSalvos, setJogosSalvos] = useState([])
  const [configJson, setConfigJson] = useState([])

  useEffect(()=>{
    async function pegaConfigSalva(){
      try {
        let configSalvaString = await AsyncStorage.getItem("@configuracaoSalva")
        setConfigJson(JSON.parse(configSalvaString))
      } 
      catch (error) {
        console.log(error);
      }
      try {
        let jogosDaConfiguracaoString = await AsyncStorage.getItem("@jogosParaConfiguracaoSalva")
        setJogosSalvos(JSON.parse(jogosDaConfiguracaoString))
      } 
      catch (error) {
        console.log(error);
      }
    }
    pegaConfigSalva()
  },[])

  const removeConfiguracao = async() => {
    let confirmaRemocao
    if (configJson) {
      //  function alerta(){
      //     Alert.alert('Remover Configuração', 'Deseja remover essa configuração do seu Favorito?',[  
      //       {  
      //           text: 'Sim',  
      //           onPress: (()=> {return('Sim')}), 
      //       },  
      //       {
      //         text: 'Não', 
      //         onPress: (()=> {return('Nao')})
      //       },  
      //     ])
      // }
      // confirmaRemocao = await alerta()
      // console.log(confirmaRemocao);
      // if (confirmaRemocao === 'Sim') {
        try {
          await AsyncStorage.setItem('@configuracaoSalva', '')
          setConfigJson()
        } 
        catch (e) {
          console.log('Erro ao excluir');
        }
  
        try {
          await AsyncStorage.setItem('@jogosParaConfiguracaoSalva', '')
        } 
        catch (e) {
          console.log('Erro ao excluir');
        }
      }
      else{
        navigation.navigate('Jogos')
      }
    // }
  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
    <View style={stylesGlobal.conteudoTela}>
      {
        configJson?
        <>
          <FlatList
            ListHeaderComponent={ 
            <>
              <Text style={styles.titulo}>
                Configuração {configJson.tipo} para os jogos :
              </Text>

              {jogosSalvos.map(jogo => (<Text style={{ fontSize: 15, color: 'white', alignItems: 'flex-start' }} key={jogo.id_jogo_steam}>- {jogo.nome} {'\n'}</Text>))}
            </>
            }
            style={{width: '100%'}}
            data={configJson.pecas}
            keyExtractor={item => item?.title}
            renderItem={p => (
              <CartaoProduto produto={p.item}/>
              )}
            />
        </>
        :
        <Text style={styles.titulo}>Você ainda tem nem uma configuração Favoritada :(</Text>
      }
      </View>
      <View style={styles.rodape}>
        <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
        >    
            <Text style={{ color: 'black' }}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.botaoProximo}
            onPress={removeConfiguracao}
        >    
            <Text style={{ color: 'white' }}>{configJson?'Excluir':'Adicionar'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default FavoritosTela

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    color: 'white', 
    marginBottom: 15
  },
  conteudoTela:{
    flex: 1,
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop:5,
  },
  rodape: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    padding: 12,
    height: Dimensions.get('window').height*9/100,
    backgroundColor: Cores.primary,
    borderTopWidth: 2,
  }, 
  botaoVoltar:{
    flexGrow: 1,
    marginRight: 5,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
  },
  botaoProximo:{
    flexGrow: 1,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 7,
  },
})

