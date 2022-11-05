import React from 'react'
import {FlatList, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Rodape from '../Componentes/Rodape'
import styles, {Cores, imagemFundo} from '../Constantes/Styles'
import Cartao from '../Componentes/Cartao'
import {useCart} from '../Constantes/CartContext'


const SelecionadosTela = ({navigation}) => {
  const selecionados = useCart()
  
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={styles.backgroundImage}>
    <View style={{ height: "90%" }}>
        <Text style={{ color: 'white', fontSize: 50, marginLeft: 'auto', marginRight: 'auto' }}>Selecionados</Text>
        
          
          <FlatList
          data={selecionados?.cart}
          numColumns={2}
          keyExtractor={(item) => item.id}
          extraData={selecionados.cart}
          renderItem={j => (
            <Cartao jogo={j.item} />
            )}
            />
        

      </View>
      <Rodape telas={{ anterior: 'Jogos', proxima: 'Filtros' }}></Rodape>
    </ImageBackground>
);
}

export default SelecionadosTela
