import {StyleSheet,TouchableOpacity, Text, ImageBackground, Alert} from 'react-native'
import React from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'
import {Cores} from '../Constantes/Styles'


const CartaoJogo = ({jogo}) => {
    const cart = useCart()
    const {id_jogo_steam, nome, imagem, preco} = jogo

    const mudaEstado = () => {
        if (jogo.estado === "circle"){
            if (cart.cart.length < 3) {
                jogo.estado = "check-circle"
                cart.addToCart(jogo)
            }
            else{
                Alert.alert("Você já selecionou 3 jogos","Por favor, remova algum deles para adicionar um outro")
            }
        }
        else{
            jogo.estado = "circle"
            cart.removeToCart(id_jogo_steam)
        }
    }
    
  return (
    <TouchableOpacity style={styles.cartao} onPress={mudaEstado}>
        <ImageBackground source={{ uri: imagem?imagem: 'https://cdn-icons-png.flaticon.com/512/2140/2140618.png'}} style={styles.imagem} imageStyle={styles.imageBackground}>
            <FontAwesome5 style={styles.selecao} name={jogo.estado} size={25} color="#cccccc" />
        </ImageBackground>
        
        <Text style={styles.titulo}>{nome ? nome :  "não identificado"}</Text >
    </TouchableOpacity>
  )
}

export default CartaoJogo

const styles = StyleSheet.create({
    cartao:{
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: Cores.tertiary,
        flexGrow: 1,
        width:'49%',
        marginLeft:2,
        marginRight:2,
        borderRadius: 8,
        borderWidth:2,
    },
    imagem:{
        height: 120,
        width: "100%",
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    imageBackground:{
        borderRadius:7, 
        resizeMode:'cover'
    },
    selecao:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 6,
        backgroundColor: Cores.secondary,
        width: 'auto',
        marginLeft: 'auto',
        padding: 4
    },
    titulo:{
        flex:1,
        fontSize: 15, 
        textAlign: "center", 
        textAlignVertical: "center",
        fontWeight: 'bold',
    }
})