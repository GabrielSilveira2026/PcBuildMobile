import * as React from 'react';
import {View , Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import CartaoProduto from '../Componentes/CartaoProduto'

const PecasTela = ({route, navigation}) => {
  const parametro = route?.params
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
    <View style={stylesGlobal.conteudoTela}>
      <Text style={styles.titulo}>Essas são as peças para uma configuração {parametro?.tipo}</Text>
      <FlatList
        style={{width: '100%'}}
        data={parametro?.pecas}
        keyExtractor={item => item?.title}
        renderItem={p => (
          <CartaoProduto produto={p.item}/>
          )}
        />
      </View>
      <Rodape telas={{txtProxima: 'Salvar',anterior: 'Recomendados', proxima:'Login', parametroProxima: parametro}} />

    </ImageBackground>
  );
}

export default PecasTela

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center', 
    fontSize: 25,
    color: 'white', 
    marginBottom: 15
  },
})

