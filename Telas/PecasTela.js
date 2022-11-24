import * as React from 'react';
import {View , Text, StyleSheet, ImageBackground, FlatList,TouchableOpacity,Dimensions} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import CartaoProduto from '../Componentes/CartaoProduto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from '../Constantes/CartContext'

const PecasTela = ({route, navigation}) => {
  const parametro = route?.params
  const selecionados = useCart()

  const salvaConfiguracao = async() => {
    // Confere se esta logado, se nn estiver redirecionar para tela de login
    if (selecionados.cart.length > 0 && parametro.pecas.length > 0) {
      try {
        await AsyncStorage.setItem('@configuracaoSalva', JSON.stringify(parametro))
      } 
      catch (e) {
        console.log('Erro ao salvar');
      }
      try {
        await AsyncStorage.setItem('@jogosParaConfiguracaoSalva', JSON.stringify(selecionados.cart))

      } 
      catch (e) {
        console.log('Erro ao salvar');
      }
      navigation.navigate('Favoritos')
    }

    navigation.navigate('Login')

  }

  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
    <View style={stylesGlobal.conteudoTela}>
      <Text style={styles.titulo}>Essas são as peças para jogar em uma configuração {parametro?.tipo}</Text>
      <FlatList
        style={{width: '100%'}}
        data={parametro?.pecas}
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

