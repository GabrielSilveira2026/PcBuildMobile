import {Image, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const Cartao = ({jogo}) => {
    const cart = useCart()
    const {id, nome, imagem, preco} = jogo

    const mudaEstado = () => {
        if (jogo.estado === "toggle-off"){
            jogo.estado = 'toggle-on'
            cart.addToCart(jogo)
        }
        else{
            jogo.estado = 'toggle-off'
            cart.removeToCart(id)
        }
    }
    
  return (
    <View style={styles.cartao}>

        <FontAwesome5 style={{marginLeft: "82%"}} name={jogo.estado} size={50} color="black" onPress={mudaEstado}/>
        { 
        imagem ? 
          <Image style={styles.imagem} source={{uri: imagem}}/> 
          : 
          <Image style={styles.imagem} source={{uri: "https://cdn-icons-png.flaticon.com/512/2140/2140618.png"}}/>
        }
        { id ? <Text style={{fontSize: 25}}>ID: {id}</Text> : null }
        { nome ?<Text style={{fontSize: 25}}>Nome: {nome}</Text> : null }
        { preco ?<Text style={{fontSize: 25}}>Preco: {preco}</Text> : null }
    </View>
  )
}

export default Cartao

const styles = StyleSheet.create({
    cartao:{
        marginBottom: 10,
        backgroundColor: "#ff7e75",
        padding: 10,
        width: "85%",
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
        width: "100%",
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})