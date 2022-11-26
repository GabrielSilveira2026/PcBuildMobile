import {StyleSheet,TouchableOpacity, Text, ImageBackground, Alert, View, Image,Linking, ScrollView} from 'react-native'
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import React from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const CartaoProduto = ({produto}) => {
    const regex = /[.][c][o][m]|[.][b][r]/gm
    const preco = produto?.price_raw
    const loja = produto?.merchant
    const link = produto?.link
    const imagem = produto?.image
    const titulo = produto?.title
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
        case 'Patoloco.com.br':
            logo = 'https://patoloco.com.br/arquivos/marcas/aeced34a9858f67e86b3a49c433477f9287b3e87.jpeg'
            break;
        default: 
    }
    return (
        <TouchableOpacity style={styles.cartao} onPress={() => {link?Linking.openURL(link):null}}>
            <Image style={styles.imagem} source={{uri: imagem}}/>
            <View style={styles.titulo}><Text>{titulo?.substr(0,60)}...</Text></View>
            <View style={styles.items}>
                {
                    logo ?
                    <Image source={{uri: logo}} style={styles.logo}></Image>
                    :
                    <Text style={styles.loja}>{loja ? loja.replace(regex, "") : ""}</Text>
                }
                <Text style={styles.preco}>{preco ? preco.substr(0,12) : "Indisponível"}</Text>
                <TouchableOpacity style={styles.botaoComprar} onPress={() => {link?Linking.openURL(link):null}}>
                    <Text style={styles.textoComprar}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
     )
}

export default CartaoProduto

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
        width: '34%', 
        marginRight:5,
        borderRadius: 8,
        borderWidth:2,
        resizeMode: 'contain',
    },
    titulo:{
        marginRight:5,
        fontSize:15,
        width:'34%',
        fontWeight: 'bold',
    },
    items:{
        justifyContent: 'space-between',
        width: '30%',
    },
    logo:{
        height: '25%', 
        marginTop:10, 
        resizeMode: 'contain'
    },
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
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
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
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    textoComprar:{
        color: 'white',
        textAlign:'center',
    }
})