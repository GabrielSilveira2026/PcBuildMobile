import React,{ useState} from 'react';
import {View , Text, StyleSheet, ImageBackground, FlatList,TouchableOpacity,Dimensions, Alert} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import CartaoProduto from '../Componentes/CartaoProduto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from '../Constantes/CartContext'
import {autenticaUsuario,validaToken, favoritaPc} from '../Services/httpservices'

const PecasTela = ({route, navigation}) => {
  const config = route?.params
  const [usuario, setUsuario] = useState()

  const salvaConfiguracao = async() => {
    let usuario
    try {
      usuario = JSON.parse(await AsyncStorage.getItem("@usuario"))
    } catch (error) {
      Alert.alert("Ocorreu um erro ao recuperar sua configuração")
    }

    if(usuario) {
      let statusToken = await validaToken(usuario.tokenjwt)
      if (statusToken.status === 200) {
        try {
          // await favoritaPc(usuario.tokenjwt, usuario.usuario, config)
          navigation.navigate('Favoritos', config)
        }
        catch (error){
          Alert.alert("Erro", "Ocorreu um erro ao Salvar sua configuração no banco")
        }
        //guarda localmente a configuração
        try {
          await AsyncStorage.setItem('@configuracaoSalva', JSON.stringify(config))
        } 
        catch (e) {
          Alert.alert('Erro ao salvar');
        }
      }
      else{
        navigation.navigate('Login', config)
      }
    }
    else{
      Alert.alert("Login não efetuado", "Por favor, faça login para salvar configurações")
      navigation.navigate('Login', config)
    }
  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
    <View style={stylesGlobal.conteudoTela}>
      <Text style={styles.titulo}>Essas são as peças para jogar em uma configuração {config?.tipo}</Text>
      <FlatList
        style={{width: '100%'}}
        data={config?.pecas}
        keyExtractor={item => item?.title}
        renderItem={p => (
          <CartaoProduto produto={p.item}/>
          )}
        />
      </View>

      <View style={styles.rodape}>
        <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Recomendados')}
        >    
            <Text style={{ color: 'black' }}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.botaoProximo}
            onPress={salvaConfiguracao}
        >    
            <Text style={{ color: 'white' }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default PecasTela

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center', 
    fontSize: 23,
    color: 'white', 
    marginBottom: 15
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

