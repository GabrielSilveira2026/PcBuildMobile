import {StyleSheet,TouchableOpacity, Text, ImageBackground, Alert, View, Image,Linking} from 'react-native'
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import React from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const CartaoProdutos = ({precos}) => {
    const preco = precos.price_raw
    const loja = precos.merchant
    const link = precos.link
    const imagem = precos.image
    const titulo = precos.title

    return (
        <View style={styles.cartao}>
            <Image style={styles.imagem} source={{uri: imagem}}/>
            <Text style={styles.titulo}>{titulo.substr(0,50)}...</Text>
            <View style={styles.items}>
                <Text style={styles.loja}>{loja ? loja : ""}</Text>
                <Text style={styles.preco}>{preco ? preco : "Indiponível"}</Text>
                <TouchableOpacity style={styles.botaoComprar} onPress={() => {Linking.openURL(link);}}>
                    <Text style={styles.textoComprar}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </View>
     )
}

export default CartaoProdutos

const styles = StyleSheet.create({
    cartao:{
        backgroundColor: Cores.tertiary,
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth:2,
        marginBottom: 5,
        height:170,
        padding: 7
    },
    imagem:{
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '95%', 
        width: 130, 
        marginRight:10,
        borderRadius: 8,
        borderWidth:2,
        resizeMode: 'contain',
    },
    titulo:{
        marginRight:5,
        fontSize:15,
        width:115,
        fontWeight: 'bold',
    },
    items:{
        justifyContent: 'space-between',
        width: 110,
    },
    loja: {
        justifyContent: 'center',
        textAlign:'center',        
        fontSize: 15, 
        borderRadius: 5,
        backgroundColor: Cores.primary,
        fontWeight: 'bold',
    },
    preco: {
        height: 'auto', 
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        fontWeight: 'bold',
        color: 'green',
        // width: 100
    }, 
    botaoComprar:{
        justifyContent: 'center',
        textAlign:'center',
        height:40,
        backgroundColor: 'black',
        borderRadius: 7,
    },
    textoComprar:{
        color: 'white',
        textAlign:'center',
    }
})