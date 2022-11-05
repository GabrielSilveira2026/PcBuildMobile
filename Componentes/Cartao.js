import {Image, StyleSheet,TouchableOpacity, Text, View, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'
import {Cores} from '../Constantes/Styles'


const Cartao = ({jogo}) => {
    const cart = useCart()
    const {id, nome, imagem, preco} = jogo

    const mudaEstado = () => {
        if (jogo.estado === "circle"){
            jogo.estado = "check-circle"
            cart.addToCart(jogo)
        }
        else{
            jogo.estado = "circle"
            cart.removeToCart(id)
        }
    }
    
  return (
    <TouchableOpacity style={styles.cartao} onPress={mudaEstado}>
        { 
            imagem ? 
                <ImageBackground source={{ uri: imagem }} style={styles.imagem}>
                    <FontAwesome5 style={styles.selecao} name={jogo.estado} size={20} color="#cccccc"/>
                </ImageBackground>
            : 
            <ImageBackground source={{ uri: "https://cdn-icons-png.flaticon.com/512/2140/2140618.png" }} style={styles.imagem}>
                <FontAwesome5 style={styles.selecao} name={jogo.estado} size={20} color="#cccccc"/>
            </ImageBackground>
        }
        { nome ?<Text style={styles.titulo}>{nome}</Text > : <Text style={styles.titulo}>não identificado</Text>}
        {/* { preco ?<Text style={{fontSize: 20}}>Preco: {preco}</Text> : null } */}
    </TouchableOpacity>
  )
}

export default Cartao

const styles = StyleSheet.create({
    cartao:{
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: Cores.tertiary,
        // // paddingBottom: 5,
        width: "48%",
        marginLeft:'auto',
        marginRight:'auto',
        // borderRadius: 8,
        borderWidth:2,
    },
    imagem:{
        height: 100,
        width: "100%",
        borderRadius:15,
        resizeMode:"contain"
    },
    selecao:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Cores.secondary,
        width: 'auto',
        marginLeft: 'auto',
        padding: 4
    },
    titulo:{
        flex:1, 
        fontSize: 15, 
        textAlign: "center", 
        textAlignVertical: "center"
    }
})