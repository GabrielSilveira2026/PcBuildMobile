import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import React from 'react'
import Cartao from './Cartao'

const PrecosItem = ({precos}) => {
    const preco = precos.price
    const loja = precos.merchant
    const link = precos.link

  return (
    // <Cartao>
        <View>
            <Text>Loja: {loja}</Text>
            <Text>Link: {link}</Text>
            <Text>Preco: {preco}</Text>
        </View>
    // </Cartao>
  )
}

export default PrecosItem

const styles = StyleSheet.create({
    cartao:{
        marginBottom: 8,
    },
    tela: {
        flexDirection:'row'
    },
    imagem:{
        width: 50,
        height: 50
    },
    primeiraLinha:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 2
    },
    segundaLinha: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: '#DDD'
    },
    valor: {
        marginHorizontal: 2
    }
})