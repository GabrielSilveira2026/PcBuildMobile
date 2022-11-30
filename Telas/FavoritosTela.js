import React , {useState, useEffect, useCallback} from 'react';
import {View , Text, StyleSheet, ImageBackground, FlatList,TouchableOpacity, Dimensions, Alert} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import CartaoProduto from '../Componentes/CartaoProduto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validaToken} from '../Services/httpservices'

const FavoritosTela = ({route, navigation}) => {
  const [configJson, setConfigJson] = useState()
  const [estadoUsuario, setEstadoUsuario] = useState()

  useEffect(()=>{
    async function validaEstadoUsuario(){
      let usuario
      try {
        usuario = JSON.parse(await AsyncStorage.getItem("@usuario"))
      } catch (error) {
        Alert.alert("Ocorreu um erro ao recuperar sua configuração")
      }
      if(usuario) {
        let statusToken = await validaToken(usuario.tokenjwt)
        if (statusToken.status === 200) {
          setEstadoUsuario('Logado')
          //pega localmente a configuração
          try {
            setConfigJson(route?.params?route?.params:JSON.parse(await AsyncStorage.getItem("@configuracaoSalva")))
          } 
          catch (error) {
            Alert.alert('Erro', 'Ocorreu um problema ao recuperar sua configuração');
          }
          //get no backend pra pegar a config do usuario
        }
        else if(statusToken.status === 404){
          setEstadoUsuario('Não logado')
        }
        else{
            Alert.alert("Ocorreu um erro ao puxar sua configuração")
        }
      }
      else{
        setEstadoUsuario('Não logado')
      }
    }
    
    validaEstadoUsuario()
  },[])

  const removeConfiguracao = async() => {
    if (configJson) {
      Alert.alert('Remover Configuração', 'Deseja remover essa configuração do seu Favorito?',[  
        {  
          text: 'Sim',  
          onPress: (async()=> {
            try {
              await AsyncStorage.setItem('@configuracaoSalva', '')
              setConfigJson()
            } 
            catch (e) {
              Alert.alert('Erro ao excluir');
            }
      
            try {
              await AsyncStorage.setItem('@jogosParaConfiguracaoSalva', '')
            } 
            catch (e) {
              Alert.alert('Erro ao excluir');
            }
          }), 
        },
        {
          text: 'Não'
        },  
      ])
    }
    else{
      navigation.navigate('Jogos')
    }
  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
    <View style={stylesGlobal.conteudoTela}>
      {
        estadoUsuario === 'Logado'?
          configJson?
          <>
            <FlatList
              ListHeaderComponent={ 
              <>
                <Text style={styles.titulo}>
                  Configuração {configJson.tipo} para os jogos :
                </Text>
                {configJson?.jogos?.map(jogo => (<Text style={styles.jogos} key={jogo.id_jogo_steam}>- {jogo.nome} {'\n'}</Text>))}
              </>
              }
              style={{width: '100%'}}
              data={configJson?.pecas}
              keyExtractor={item => item?.title}
              renderItem={p => (
                <CartaoProduto produto={p.item}/>
                )}
              />
          </>
          :
          <Text style={{...styles.titulo, textAlign: 'center',marginTop:'45%'}}>Você ainda tem nem uma configuração Favoritada :(</Text>
        :
        <View style={styles.semLogin}>
          <Text style={{...styles.titulo, textAlign: 'center'}}>Faça o login para salvar configurações</Text>
          <TouchableOpacity style={{...styles.botaoVoltar, padding:10}} onPress={() =>{navigation.navigate("Login")}}>
                <Text>Ir para Login</Text>
          </TouchableOpacity>
        </View>
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
  jogos:{ 
    fontSize: 15, 
    color: 'white', 
    alignItems: 'flex-start' 
  }, 
  conteudoTela:{
    flex: 1,
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop:5,
  },
  semLogin:{
    alignItems: 'center',
    marginTop:'auto',
    marginBottom: 'auto'
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

