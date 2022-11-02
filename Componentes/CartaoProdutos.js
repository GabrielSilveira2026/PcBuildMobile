import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
    Linking,
    TouchableOpacity 
} from 'react-native'
import styles from '../Constantes/Styles';
import React from 'react'

const CartaoProdutos = ({precos}) => {
    const preco = precos.price_raw
    const loja = precos.merchant
    const link = precos.link
    const imagem = precos.image

  return (
    // <Cartao>
        <View style={stylesC.cartao}>
            <Image style={stylesC.imagem} source={{uri: imagem}}/>

            <Text style={stylesC.loja}>Loja: {loja}</Text>

            <TouchableOpacity style={[styles.botaoProximo, {padding:4}]} >
                <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}} onPress={() => {Linking.openURL(link);}}> Comprar {'\n'} {preco}</Text>
            </TouchableOpacity>
        </View>
    // </Cartao>
  )
}

export default CartaoProdutos

const stylesC = StyleSheet.create({
    cartao:{
        marginBottom: 20,
        backgroundColor: "#ff7e75",
        padding: 10,
        width: "49%",
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius: 8,
        borderWidth:3
    },
    imagem:{
        borderRadius:8,
        borderWidth: 1,
        borderColor:'black',
        height: 150,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    link: {
        padding: 5,
        backgroundColor: '#ff6404',
        color: 'black',
        fontSize: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
    }, 
    loja: {
        fontSize: 20,
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
})