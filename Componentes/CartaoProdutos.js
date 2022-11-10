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
    let logo
    switch (loja) {
        case 'KaBuM!':
            logo = 'https://logodownload.org/wp-content/uploads/2017/11/kabum-logo-2.png'
            break;
        case 'Terabyteshop':
            logo =  'https://img.terabyteshop.com.br/header-logo.png'
            break;
        case 'Amazon.com.br':
            logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'
            break;
        case 'Pichau':
            logo = 'https://www.pichau.com.br/logo-pichau.png'
            break;
        default: ''
    }
    return (
        <View style={styles.cartao}>
            <Image style={styles.imagem} source={{uri: imagem}}/>
            <Text style={styles.titulo}>{titulo.substr(0,60)}...</Text>
            <View style={styles.items}>
                {
                    logo ?
                    <Image source={{uri: logo}} style={styles.logo}></Image>
                    :
                    <Text style={styles.loja}>{loja ? loja : ""}</Text>
                }
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
        justifyContent:'space-between',
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth:2,
        marginBottom: 5,
        height:170,
        padding: 9
    },
    imagem:{
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '100%', 
        width: '33%', 
        marginRight:5,
        borderRadius: 8,
        borderWidth:2,
        resizeMode: 'contain',
    },
    titulo:{
        marginRight:5,
        fontSize:15,
        width:'35%',
        fontWeight: 'bold',
    },
    items:{
        justifyContent: 'space-between',
        width: '30%',
    },
    logo:{
        height: '25%', 
        marginTop:10, 
        resizeMode: 'contain'},
    loja: {
        justifyContent: 'center',
        textAlign:'center',        
        fontSize: 15, 
        borderRadius: 5,
        backgroundColor: Cores.primary,
        fontWeight: 'bold',
        padding:2,
    },
    preco: {
        marginTop:'auto',
        textAlign:'center',
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        fontWeight: 'bold',
        color: 'green',
        height:30,
        paddingTop:3
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