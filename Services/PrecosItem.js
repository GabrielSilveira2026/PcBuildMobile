import { 
    Image,
    StyleSheet, 
    Text, 
    View, 
    Linking 
} from 'react-native'
import React from 'react'
import Cartao from './Cartao'

const PrecosItem = ({precos}) => {
    const preco = precos.price
    const loja = precos.merchant
    const link = precos.link
    const imagem = precos.image

  return (
    // <Cartao>
        <View style={styles.cartao}>
            <Image style={styles.imagem} source={{uri: imagem}}/>

            <Text style={styles.loja}>Loja: {loja}</Text>

            <Text style={styles.link} onPress={() => {Linking.openURL(link);}}> Comprar {preco}</Text>
        </View>
    // </Cartao>
  )
}

export default PrecosItem

const styles = StyleSheet.create({
    cartao:{
        marginBottom: 20,
        backgroundColor: "#ff7e75",
        padding: 10,
        width: 250,
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
        backgroundColor: 'green',
        color: 'black',
        fontSize: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    }, 
    loja: {
        fontSize: 15,
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
})